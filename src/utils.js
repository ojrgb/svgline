import interpolate from "color-interpolate";

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

export function trace(msg) {
    console.log(msg)
}