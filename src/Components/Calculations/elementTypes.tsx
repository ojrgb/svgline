const elementTypes: any = [
  {
    _id: 'dynamic',
    test: /\{([^}]+)?\}/g,
    group: 'dynamic'
  },
  {
    _id: 'dynamicActive',
    test: /\{([^}]+)?/g,
    group: 'dynamic'
  },
  
    {
        _id: 'singleQuote',
      test: /\'[^']*\'/g,
      group: 'quotes'
    },
    {
        _id: 'doubleQuote',
      test: /\".+\"/g,
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
    _id: 'number',
    // test: /\d+(\.\d)?/g,
    test: /\d+/g,
    group: 'number'
  },
  
  {
    _id: 'invalid',
    test: /.+/g,
    group: 'invalid'
  }
]

export default elementTypes.map(v => Object.assign({},v,{testParse: v.testParse || v.test}))