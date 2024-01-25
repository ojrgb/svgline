import _ from "lodash";
import Flow from "./Flow";

/**
 * Decorator that adds a wire functionality to a method.
 * The decorated method will be called with its original arguments,
 * and then the 'update' method of the class instance will be called.
 * @param target - The target object (class instance).
 * @param propertyKey - The name of the decorated method.
 * @param descriptor - The property descriptor of the decorated method.
 * @returns The modified property descriptor.
 */
export const Wire = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
        
        const result = originalMethod.apply(this, args);
        
        this.update();
        return result;
    };
    return descriptor;
}

/**
     * Decorator that automatically updates the path after the decorated method is called.
     * @param target - The target object.
     * @param propertyKey - The name of the decorated method.
     * @param descriptor - The property descriptor.
     * @returns The modified property descriptor.
     */
export const autoUpdatePath = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {     
        const result = originalMethod.apply(this, args);
        this.updatePath();
        return result;
    };
    return descriptor;
}

export const updateCalculatedTree = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {   
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {      
        const res = originalMethod.apply(this, args);
        (this.parent.getRoot() as Flow).calculatedTree = _.set((this.parent.getRoot() as Flow).calculatedTree,this.path, res);
        return res;
    };
    return descriptor;
}

