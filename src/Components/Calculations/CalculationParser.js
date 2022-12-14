import elementTypes from "./elementTypes"

function regexpReplace(str, reg, replace) {
    const regexp = new RegExp(reg,'g')
        
        let occurences = str.matchAll(regexp)
        occurences = occurences ? [...occurences] : undefined
        
        // We find all the occurences of, for example +, in the text part
        return str.split(regexp).map((part, parti) => {
            
            // We then split the text part with the regex
            // In the lines below we try to establish whether theres a match
            // for that index. For example
            // "1+1" will yield a text split of [1,1] and a match split
            // of [+]
            return occurences?.[parti] ? [part].concat(replace(occurences[parti])) : [part]
        }).flat().filter(v => {
          return v && 
            (typeof v !== 'string' || v.length>0)
        })
}


const tokenize = (text) => {
    
    const leafs = elementTypes

    let curString = [text]
    leafs.forEach((leaf) => {
      
      // We test each leaf one by one. For example, +
      curString = curString.map((str, stri) => {
        
        // This is where we iterate over each part of the text
        if(typeof str !== 'string') {
          // If the type of the string is an already found match - 
          // for example {content: +, type: operator}
          // then return it without analysing further
          return str
        }
        else {
          // Else we look for the leaf matches in the text part
          return regexpReplace(str,leaf.test, (res) => {
            return  {
                content: res[0],
                group: leaf.group,
                typeId: leaf._id
              }
            }
          )
        }
        
      })
      
      // Flatten this array like a pita
      while(curString.find(v => Array.isArray(v))) { curString = curString.flat()}
      
    })

  return curString


}

const processText = (text,regexp,replace) => {
    let curString = typeof text === 'string' ? [text] : text

    curString = curString.map((part,parti) => {
        return part.regexpReplace(regexp,replace)
    })

    while(curString.find(v => Array.isArray(v))) { curString = curString.flat()}

    return curString
}

const replaceOperator = (array, operator, curI) => {
  let res = [...array]
  for(let i = curI || array.length; i--; i>1 ) {
    let curObj = res[i]
    let prevObj = res[i-1]
    let prevPrevObj = res[i-2]
    if(!!!curObj || !!!prevObj || !!!prevPrevObj) {
      return res
    }
    if(curObj.children) {
      curObj.children = replaceOperator(curObj.children,operator)
      res[i] = curObj
    }
    if(prevObj.typeId===operator) {
      prevObj = Object.assign({},prevObj,
        {
          type: operator,
          children: [prevPrevObj,curObj]
        })
      res = [...res].splice(0,i-2).concat([prevObj]).concat([...res].splice(i+1,res.length))
      i=i-2
    }

  }
  return res
}

const parse = text => {
    // const singleQuote = elementTypes.findById('singleQuote')
    // const doubleQuote = elementTypes.findById('doubleQuote')
    // const parentheses = elementTypes.findById('parentheses')
    // const add = elementTypes.findById('add')
    // const subtract = elementTypes.findById('subtract')
    // const divide = elementTypes.findById('divide')
    // const multiply = elementTypes.findById('multiply')

    let curString = tokenize(text)

    

    curString = curString.map(v => v?.group === 'quotes' ? {type: 'string', value: v.content} : v)

    while (curString.findLastIndex(v => v?.group==='parentheses')>-1) {
        let lastStartParenthesesIndex = curString.findLastIndex(v => v?.typeId==='parenthesesStart')
        let firstEndParenthesesIndex = curString.findIndex(v => v?.typeId==='parenthesesEnd')

        curString = [...curString].splice(0,lastStartParenthesesIndex).concat(
            {
                type:'parentheses',
                children: curString.splice(lastStartParenthesesIndex+1,firstEndParenthesesIndex-lastStartParenthesesIndex-1)
            }
        )
        //.concat([...curString].splice(firstEndParenthesesIndex)+1,curString.length)

    }

    curString = replaceOperator(curString,'multiply')
    curString = replaceOperator(curString,'divide')
    curString = replaceOperator(curString,'add')
    curString = replaceOperator(curString,'subtract')

    

    return curString
    

    
}



export default {
    tokenize,
    parse
}