const calculationFuncs = [{
    _id: 'array',
    name: 'Array',
    description: 'Creates an array of the specified length using the specified map function.',
    arguments: 'length: number, mapFunc?: any',
    returns: 'Array',
    function: (length: number, mapFunc?: any) => {
        if(!mapFunc) {
            mapFunc = (v:any, i: number) => i+1
        }
        if(typeof mapFunc !== 'function') {
            mapFunc = (v:any, i: number) => mapFunc
        }
        return Array.from({length}, mapFunc)
    }
}]

const calculationFuncsMap = calculationFuncs.reduce((acc, func) => {
    return {...acc, [func._id]: func.function}
},{})

export const calculationFuncsCompletions = calculationFuncs.map(func => {
    return {
        label: func._id,
        type: 'function',
        detail: '| ' + func.name,
        info: '💬: ' + func.description + '. Arguments: ' + func.arguments + ', returns: ' + func.returns
    }
})

export function generateExpression(props: {
    calculatedTree: any,
    expression
}): Function {
    const {calculatedTree, expression} = props;
    const functionStatement = `const {Configurations, Calculations, Datasets, Components} = this;
            ${calculatedTree.iterator!==undefined && Object.keys(calculatedTree.iterator).map((iteratorId: string) => {
                // This part destructures the iterator object and assigns the values to variables with the same name as the keys.
                // For example, if the iterator object is {iteratorId: 1, iteratorIndex: 0}, this part will generate the following code:
                // const iteratorId = this.iterator.iteratorId;
                // const iteratorIndex = this.iterator.iteratorIndex;
                return `const ${iteratorId} = this.iterator.${iteratorId};`
            }).join('\n')}
            
            ${
                Object.keys(calculationFuncsMap).map(funcId => {
                    return `const ${funcId} = ${calculationFuncsMap[funcId]};`
                }).join('\n')
            }
            return  ${expression}`
            console.log(functionStatement)
            return new Function(functionStatement)
}