const { trace } = require("utils")

const getDeep = (array,path) => {
    if(path.length===1) {
        if(!!!array || array.length===0) {
            trace('Index out of bounds.')
            return undefined
        }
        else {return array[path[0]]}
    }
    else {
        return getDeep(array[path[0]].children,[...path].splice(1))
    }
}

Array.prototype.getDeep = (path) => {
    if(!!!path || path.length===0) {
        trace('Empty path provided.')
        return undefined
    }
    else {
        return getDeep([...this],path)
    }
}