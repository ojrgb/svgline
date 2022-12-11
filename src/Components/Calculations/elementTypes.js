const elementTypes = [
    {
        _id: 'singleQuote',
      test: /\'[^']*\'/g,
      display: 'quotes'
    },
    {
        _id: 'doubleQuote',
      test: /\"[^"]*\"?/g,
      display: 'quotes'
    },
    {
        _id: 'parenthesesStart',
      test: /[(]/g,
      display: 'parentheses'
    },
    {
        _id: 'parenthesesEnd',
      test: /[)]/g,
      display: 'parentheses'
    },
    {
        _id: 'add',
      test: /\+/g,
      display: 'arithmeticOperator'
    },{
        _id: 'subtract',
      test: /\-/g,
      display: 'arithmeticOperator'
    },{
        _id: 'divide',
      test: /\//g,
      display: 'arithmeticOperator'
    },{
        _id: 'multiply',
      test: /\*/g,
      display: 'arithmeticOperator'
    }]

export default elementTypes.map(v => Object.assign({},v,{testParse: v.testParse || v.test}))