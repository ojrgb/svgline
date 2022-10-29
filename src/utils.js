import interpolate from "color-interpolate";
import entities from 'ents'

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