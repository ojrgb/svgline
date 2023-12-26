export function evaluate(props) {
  const {expression, p} = props
  let res;
  console.log('expression',expression)
  console.log('expression',p)
  try {
    const prepare = Object.keys(p).map((v, i) => {
      return `const ${v} = ${
        JSON.stringify(
          p[v].map((v1,i1) => {
            return {[v1.name]: parseFloat(v1.value || v1.sampleValue || v1.defaultValue)}
          }).reduce((a,b) => {
            return Object.assign({},a,b)
          },{})
        )
      };`;
    }).join('\n');
    const targetFormula = prepare + '\n' + expression;
    console.log('targetFormula',targetFormula)
    res = eval(targetFormula);
    return res;
  }
  catch(err) {
    console.log(err);
    return undefined;
  }
}