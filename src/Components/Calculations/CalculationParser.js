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
        }).flat()
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
                display: leaf.display,
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

const parse = text => {
    // const singleQuote = elementTypes.findById('singleQuote')
    // const doubleQuote = elementTypes.findById('doubleQuote')
    // const parentheses = elementTypes.findById('parentheses')
    // const add = elementTypes.findById('add')
    // const subtract = elementTypes.findById('subtract')
    // const divide = elementTypes.findById('divide')
    // const multiply = elementTypes.findById('multiply')

    let curString = tokenize(text)

    curString = curString.map(v => v.display === 'quotes' ? {type: 'string', value: v.content} : v)

    while (curString.findLastIndex(v => v.display==='parentheses')>-1) {
        let lastStartParenthesesIndex = curString.findLastIndex(v => v.typeId==='parenthesesStart')
        let firstEndParenthesesIndex = curString.findIndex(v => v.typeId==='parenthesesEnd')

        curString = [...curString].splice(0,lastStartParenthesesIndex).concat(
            {
                type:'parentheses',
                children: curString.splice(lastStartParenthesesIndex+1,firstEndParenthesesIndex-lastStartParenthesesIndex-1)
            }
        ).concat([...curString].splice(firstEndParenthesesIndex)+1,curString.length)

    }

    return curString
    

    
}

console.log(parse("1+1+2+(1+3)"))

export default {
    tokenize,
    parse
}