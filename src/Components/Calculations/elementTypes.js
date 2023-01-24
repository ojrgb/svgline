const elementTypes = [
    {
        _id: 'singleQuote',
      test: /\'[^']*\'/g,
      group: 'quotes'
    },
    {
        _id: 'doubleQuote',
      test: /\"[^"]*\"?/g,
      group: 'quotes'
    },
    
    {
        _id: 'parenthesesStart',
      test: /[(]/g,
      group: 'parentheses'
    },
    {
        _id: 'parenthesesEnd',
      test: /[)]/g,
      group: 'parentheses'
    },
    
    {
        _id: 'add',
      test: /\+/g,
      group: 'arithmeticOperator'
    },{
        _id: 'subtract',
      test: /\-/g,
      group: 'arithmeticOperator'
    },{
        _id: 'divide',
      test: /\//g,
      group: 'arithmeticOperator'
    },{
        _id: 'multiply',
      test: /\*/g,
      group: 'arithmeticOperator'
    },
  {
    _id: 'or',
    test:/OR/gi,
    group: 'function'
  },
  {
    _id: 'and',
    test:/AND/gi,
    group: 'function'
  },
  {
    _id: 'length',
    test:/LENGTH/gi,
    group: 'function'
  },
  {
    _id: 'variable',
    test: /\$([^+]+)?/,
    group: 'variable'
  },
  {
    _id: 'number',
    test: /\d+(\.\d)?/,
    group: 'number'
  },
  
  {
    _id: 'invalid',
    test: /.+/,
    group: 'invalid'
  }
]

export default elementTypes.map(v => Object.assign({},v,{testParse: v.testParse || v.test}))