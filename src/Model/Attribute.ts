import Element from "./Element";

export default class Attribute {
    _id: string;
    name: string;
    type: 'string' | 'list' | 'number' | 'color' | 'boolean' | 'elements'; // Change the type to a union of valid enumerator values
    mandatory: boolean;
    options?: {
        _id: string,
        name: string,
    }[];
    conditions?: ((arg: any) => boolean) | ((arg: any) => boolean)[]; 
    immediate?: boolean;
    value: any | any[] | Element[]; // Add a new property called value

    constructor(props: {_id: string, name: string, type: 'string' | 'list' | 'number' | 'color' | 'boolean' | 'elements', mandatory: boolean, options?: {
        _id: string,
        name: string,
    }[], conditions?: ((arg: any) => boolean) | ((arg: any) => boolean)[], immediate?: boolean, value?: any}) {
        this._id = props._id; // Assign the _id property from props
        this.name = props.name;
        this.type = props.type;
        this.mandatory = props.mandatory;
        this.options = props.options;
        this.conditions = props.conditions;
        this.immediate = props.immediate;
        this.value = props.value; // Assign the value property from props
    }

    // The default get 
    public get = (): string => {
        return this.value;
    }

    public toJSON = (): any => {
        if(this.type === 'elements') {
            return this.value.map((element: Element) => element.toJSON());
        }
        return this.value;
    }

    // The default set
    public set = (value: any): void => {
        if(this.type === 'number' && isNaN(Number(value))) {
            console.error('Tried to assign a non-number value to a number attribute');
            return
        }
        if(this.type === 'boolean' && typeof value !== 'boolean') {
            console.error('Tried to assign a non-boolean value to a boolean attribute');
            return
        }
        if(this.type === 'elements' && !Array.isArray(value) && !value.every(element => element instanceof Element)) {
            console.error('Tried to assign a non-array value to a elements attribute');
            return
        }
        if(this.type === 'list' && !this.options.some(option => option._id === value)) {
            console.error('Tried to assign a non-list value to a list attribute');
            return
        }
        if(this.type === 'color' && !value.match(/^#[0-9A-F]{6}$/i)) {
            console.error('Tried to assign a non-color value to a color attribute');
            return
        }

        this.value = value;
    }

    public isValid = (props: any): boolean => {
        if(this.mandatory && !this.value) {
            return false;
        }
        if(this.conditions) {
            if(Array.isArray(this.conditions)) {
                return this.conditions.every(condition => condition(props));
            }
            return this.conditions(props);
        }
        return true;
    }
}
    
