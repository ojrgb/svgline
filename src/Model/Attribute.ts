export default class Attribute {
    _id: string;
    name: string;
    type: 'identifier' | 'string' | 'list' | 'number' | 'color'; // Change the type to a union of valid enumerator values
    mandatory: boolean;
    options?: {
        _id: string,
        name: string,
    }[];
    conditions?: ((arg: any) => boolean) | ((arg: any) => boolean)[]; 
    immediate?: boolean;
    value: any; // Add a new property called value

    constructor(props: {_id: string, name: string, type: 'identifier' | 'string' | 'list' | 'number' | 'color', mandatory: boolean, options?: {
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
}
    
