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
        console.log('Running function: ', propertyKey);
        const result = originalMethod.apply(this, args);
        console.log('Executing update.')
        this.update();
        return result;
    };
    return descriptor;
}