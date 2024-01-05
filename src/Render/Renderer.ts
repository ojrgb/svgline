import { render } from "@testing-library/react";
import e from "express";

function evaluate(props: any) {
    // This function expects an expression and props. The expression is a string that can contain variables. 
    // The props contain the variables and their values that are used in the expression.
    // Example: expression: 'a + b', props: {a: [{_id: '1', value: '2'}], b: [{_id: '2', value: '3'}]}
    const {expression, p} = props
    if(expression === undefined || p === undefined) return undefined
    let res: any;
    
    try {
      // Start by preparing the entire expression, so that it can be evaluated by eval()
      const prepare = Object.keys(p).map((v, i) => {
        return `const ${v} = ${
          JSON.stringify(
            p[v].map((v1,i1) => {
              return {[v1._id]: parseFloat(v1.value || v1.sampleValue || v1.defaultValue)}
              // return parseFloat(v1.value || v1.sampleValue || v1.defaultValue);
            }).reduce((a,b) => Object.assign(a,b),{})
          )
        };`;
      }).join('\n');
      const targetFormula = prepare + '\n' + expression + ';';
    
      res = eval(targetFormula);
      return res;
    }
    catch(err) {
     
      return undefined;
    }
  }
  
  

function renderCalculation(calculation: any, p: any) {
  // Receives a calculation object as well as the package, returns the calculation result
    return  evaluate({expression: calculation?.value, p})
}

function renderRecursive(object: any, p: any) {
  let res = undefined;
  if(typeof object === 'string' || typeof object === 'number' || typeof object === 'boolean') {
    res = object
  }
  else if(typeof object === 'object') {
    if(object.type === 'calculation') {
      res = Object.assign({},object,{value: renderCalculation(object,p)})
    }
    else if(object.type === 'string' || object.type === 'identifier' || object.type === 'color') {
      res = object.value
    }
    else if(object.type === 'number') {
      res = parseFloat(object.value)
    }
    else if (Array.isArray(object)) {
      
      res = object.map((v,i) => {
        return renderRecursive(v,p)
      })
    }
    else if(object) {
      let newObj = {}; 
        Object.keys(object).map((v,i) => {
          newObj[v] = renderRecursive(object[v],p)
        })
      res = newObj
        
    }
    else {
      
      
    }
  }
  if(res === undefined) {
    
  }
  return res
}

function renderPackage(p: any) {
    let res = Object.assign({},p);
    
    let targets = ['calculations','layers']
    targets.map((target) => {
        res[target] = renderRecursive(res[target],res)
        
    })
  
    return res

}

function renderElement(element: any) {
  let newElement: any
  if(typeof element === 'string' || typeof element === 'number' || typeof element === 'boolean') {
    newElement = element
  }
  else if(typeof element === 'object') {
    if(element.type === 'calculation') {
      return element.value
    }
    else {
      newElement = {}
      Object.keys(element).map((v,i) => {
        newElement[v] = renderElement(element[v])
      })
    }
  }

  return newElement
}

export default {
    evaluate,
    renderCalculation,
    renderRecursive,
    renderPackage,
    renderElement
}