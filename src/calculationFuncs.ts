const funcs = {
	'+' : (a,b) => (a+b)
}

function formatCalc(calculation) {

    if(Array.isArray(calculation)===true) {
        return calculation.map((single,singlei) => (formatCalc(single)))
    }

    const {type, children, text} = calculation
	// calculation is an array of the following format:
    // [
    //     {
    //         type: operator / BlockList, etc
    //         children: ? if it has any children
    //         text: if it is an ultimate child
    //     }
    // ]
    if(text!==undefined) {
        if(isNaN(text)) {
            return text
        }
        else {
            return parseFloat(text) // 1
        }
    }

    const nodeTypes = {
        block: () => {
            const res = formatCalc(children)
            return res.length===1 ? res[0] : res // FIX THIS!!!!!
        },
        operator: () => {
            const targetOp = formatCalc(children)
            const opFunc = funcs[targetOp]
            if(opFunc!==undefined) {
                return opFunc
            }
            else {
                console.error('Unable to find function type for operator:',targetOp,'Object:',calculation)
            }
            return 
        }
    }

    if(!!!nodeTypes[type]) {
        
    }

    return nodeTypes[type]()

    
}

function executeCalc (_calculation) {
    if(Array.isArray(_calculation)) {
        const calcFuncs = _calculation.filter(single => (typeof single === 'function'))
        if(calcFuncs !== undefined && calcFuncs.length>0) {
            const currFunc = calcFuncs[0]
            if(currFunc.length===2) {
                const product = currFunc(_calculation[0],_calculation[2])
                
                
                return executeCalc([product].concat(_calculation.splice(3)))
            }
            else {
                console.error('Single parameter functions not yet implemented!')
            }
        }
        else {
            return Array.isArray(_calculation) ? _calculation.join('') : _calculation
        }
    }
}

function _executeCalc (calculation) {
    const _calculation = formatCalc(calculation)
    
    return executeCalc(_calculation)
}
