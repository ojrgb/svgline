export const modifySize = (value, modifier) => {
    return `${parseFloat(value.match(/^\d+(\.\d{1,2})?/)?.[0])*modifier}${value.match(/[a-zA-Z]+$/)?.[0]}`
}

export function convertRemToPixels(value) {    
    return parseFloat(value.match(/^\d+(\.\d{1,2})?/)?.[0]) * parseFloat(getComputedStyle(document.documentElement).fontSize);
}