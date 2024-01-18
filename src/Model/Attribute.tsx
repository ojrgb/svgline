import React from 'react'
import Text from 'Components/Text';
import Select from 'Components/Select';
import ColorPicker from 'Components/ColorPicker';
import Calculation from 'Components/Calculation';
import Entity from './Entity';
import {v4} from 'uuid';
import { Wire } from './ModelDecorators';

export default class Attribute {
    internalId = v4();
    _id: string;
    name: string;
    type: 'identifier' | 'string' | 'list' | 'number' | 'color' | 'boolean' | 'calculation'; 
    mandatory: boolean;
    options?: {
        _id: string,
        name: string,
    }[];
    conditions?: ((arg: any) => boolean) | ((arg: any) => boolean)[]; 
    immediate?: boolean;
    parent: Entity
    onChange?: (value: any) => Entity
    value: any

    constructor(
            props: {
                _id: string,name: string, type: 'identifier' | 'string' | 'list' | 'number' | 'color' | 'boolean' | 'calculation', 
                mandatory: boolean, options?: {
                    _id: string,
                    name: string,
                }[], 
                conditions?: ((arg: any) => boolean) | ((arg: any) => boolean)[], 
                immediate?: boolean, 
                value?: any
            },
            parent: Entity, 
            onChange?: (value: any) => Entity
    ) {
        this.parent = parent;
        this.onChange = onChange;
        this._id = props._id; // Assign the _id property from props
        this.name = props.name;
        this.type = props.type;
        this.mandatory = props.mandatory;
        this.options = props.options;
        this.conditions = props.conditions;
        this.immediate = props.immediate;
        this.value = props.value; // Assign the value property from props
    }

    
    /**
     * Gets the value of the attribute.
     *
     * @returns The value of the attribute.
     */
    public get(): string {
        return this.value;
    }

    // public toJSON = (): any => {
    //     if(this.type === 'elements') {
    //         return this.value.map((element: Element) => element.toJSON());
    //     }
    //     return this.value;
    // }

    
    @Wire
    public set(value: any): void {
        if(this.type === 'number' && isNaN(Number(value))) {
            console.error('Tried to assign a non-number value to a number attribute');
            return
        }
        if(this.type === 'boolean' && typeof value !== 'boolean') {
            console.error('Tried to assign a non-boolean value to a boolean attribute');
            return
        }
        // if(this.type === 'elements' && !Array.isArray(value) && !value.every(element => element instanceof Element)) {
        //     console.error('Tried to assign a non-array value to a elements attribute');
        //     return
        // }
        if(this.type === 'list' && !this.options.some(option => option._id === value)) {
            console.error(`Tried to assign a non-list value to a list attribute. Value: ${value} list: ${JSON.stringify(this.options)}`);
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

    public getInput = (props?: any): JSX.Element => {
        const inputTypes = {
                            'identifier': <Text {...props} />,
                            'string': <Text {...props} />,
                            'number': <Text validate="number" {...props} />,
                            'boolean': <Select options={[{_id: 'true', name: 'true'}, {_id: 'false', name: 'false'}]} {...props} />,
                            'color': <ColorPicker {...props} />,
                            // 'elements': undefined,
                            'list': <Select options={this.options} {...props} />,
                            'calculation': <Calculation {...props} />
        } 
        const input = React.cloneElement(inputTypes[this.type], {
            onChange: (value: any) => {
                this.set(value);
            }
        });
        return input;
    }

    public update() {
        this.parent.update();
    }

    public calculate(expression: any) {
        if(this.type === 'calculation') {
            const newExpression = `${expression}
            ${this.value}`
            try {
                const res = eval(newExpression);
                return res
            }
            catch(e) {
                console.error(e);
                return undefined
            }
        }
        return this.value;
    }

}
    
