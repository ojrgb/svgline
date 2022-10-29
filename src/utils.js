import interpolate from "color-interpolate";
import entities from 'ents'
import _ from "lodash";

export const modifySize = (value, modifier) => {
    // if(!!!value) {
    //     console.log(`modifySize received an empty value!`)
    //     return '';
    // }
    return `${parseFloat(value.match(/^\d+(\.\d{1,2})?/)?.[0])*modifier}${value.match(/[a-zA-Z]+$/)?.[0]}`
}

export function convertRemToPixels(value) {    
    return parseFloat(value.match(/^\d+(\.\d{1,2})?/)?.[0]) * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function deepenColor(color,delta) {
    let colormap = interpolate([color,'black']);
    return colormap(delta)
}

export function relaxColor(color,delta) {
    let colormap = interpolate([color,'white']);
    return colormap(delta)
}

export function trace(msg) {
    // console.log(msg)
}

export function generateNewEntity(entity) {
    return entities[entity].attributes.map((v,i) => {
        return {[v._id]:undefined}
    }).reduce((a,b) => {return Object.assign({},a,b)})
}

export function getDeep(array,path) {
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

export function setDeep(array,path,value,replace) {
    // array: configurations: [{_id: 't', children: [{_id: 't1',val: 'x'}]}]
    // path: [0,0]
    // value: {_id: 't1', val: 'lol'}
    // replace: true
    if(path.length===1) {
        if(!!!array || array.length === 0 ) {
            trace('Index out of bounds.')
            return undefined
        }
        else {
            return array.map((v,i) => {
                return i===path[0] ? (
                    replace ? value : Object.assign({},v,value)
                ) : v
            })
        }
    }
    else {
        return array.map((v,i) => {
            return i===path[0] ? (
                _.merge(
                    {},
                    v,
                    {
                        children: setDeep(array[path[0]].children,[...path].splice(1),value,replace)
                    }
                )                
            ) : (
                v
            )
        })
    }
}