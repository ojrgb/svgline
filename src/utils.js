import interpolate from "color-interpolate";
import entities from 'ents'
import _ from "lodash";
import theme from "theme";

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
    return colormap(delta || 0)
}

export function relaxColor(color,delta) {
    let colormap = interpolate([color,'white']);
    return colormap(delta || 0)
}

export function trace(msg) {
    // console.log(msg)
}

export function generateNewEntity(entity, object) {
     
    return Object.assign(
            {},
            //Default values below
            entities[entity].attributes.map((v,i) => {
                return {[v._id]: v.defaultValue || undefined}
            }).reduce((a,b) => {return Object.assign({},a,b)}),
            // ID below
            object
        )
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

export function getNested(object, path) {
    if(path.length===1) {
        if(!!!object || !!!object[path[0]]) {
            console.log(`Property ${path[0]} doesn't exist in object:`)
            console.log(object)
        } 
        else {return object[path[0]]}
    }
    else {
        return getNested(object[path[0]],[...path.splice(1)])
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

export const generateDeep = (arr) => {
    if(arr.length===1) {
        return arr[0]
    }
    else {
        return Object.assign({},{
            [arr[0]] : generateDeep([...arr].splice(1))
        })
    }
}



export const applyQuickStyles = (props) => {
    const spaces = {
        p: 'padding',
        px: ['padding-left','padding-right'],
        py: ['padding-top','padding-bottom'],
        pt: 'padding-top',
        pb: 'padding-bottom',
        pl: 'padding-left',
        pr: 'padding-right',
        m: 'margin',
        mx: ['margin-left','margin-right'],
        my: ['margin-top','margin-bottom'],
        mt: 'margin-top',
        mb: 'margin-bottom',
        ml: 'margin-left',
        mr: 'margin-right',
    }

    const spacesCalc = Object.keys(spaces).map((v,i) => {
        const space = spaces[v]
        return Array.isArray(space) ? s => space.map((v1,i1) => {
                return `${v1}: ${theme.scale.space[s]}`
            })
         : s => `${space}: ${theme.scale.space[s]}`
    }).reduce((a,b) => {return Object.assign({},a,b)})


    const mapping = Object.assign({},{
        w: w => `width: ${theme.scale.width[w]}`,
        h: h => `height: ${theme.scale.height[h]}`,
    },spacesCalc)

    return Object.keys(props).map((v,i) => {
        const propVal = props[v]
        return mapping[v] ? `${mapping[v](propVal)};
        ` : undefined
    }).filter(Boolean)
    
}