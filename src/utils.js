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

export const applyQuickStyles = (props) => {
    return `
        ${props.w && `width: ${theme.scale.width[props.w]};`}
        ${props.h && `height: ${theme.scale.height[props.h]};`}
        ${props.p && `padding: ${theme.scale.space[props.p]};`}
        ${props.px && `padding-left: ${theme.scale.space[props.p]};
                    padding-right: ${theme.scale.space[props.p]};`}
        ${props.py && `padding-top: ${theme.scale.space[props.p]};
                    padding-bottom: ${theme.scale.space[props.p]};`}
        ${props.pt && `padding-top: ${theme.scale.space[props.p]};`}
        ${props.pb && `padding-bottom: ${theme.scale.space[props.p]};`}
        ${props.pl && `padding-left: ${theme.scale.space[props.p]};`}
        ${props.pr && `padding-right: ${theme.scale.space[props.p]};`}
        ${props.m && `margin: ${theme.scale.space[props.p]};`}
        ${props.mx && `margin-left: ${theme.scale.space[props.p]};
                    margin-right: ${theme.scale.space[props.p]};`}
        ${props.my && `margin-top: ${theme.scale.space[props.p]};
                    margin-bottom: ${theme.scale.space[props.p]};`}
        ${props.mt && `margin-top: ${theme.scale.space[props.p]};`}
        ${props.mb && `margin-bottom: ${theme.scale.space[props.p]};`}
        ${props.ml && `margin-left: ${theme.scale.space[props.p]};`}
        ${props.mr && `margin-right: ${theme.scale.space[props.p]};`}
    `
}