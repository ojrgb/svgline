import React from 'react'
import Text from 'Components/Text';
import Select from 'Components/Select';
import ColorPicker from 'Components/ColorPicker';
import Calculation from 'Components/Calculation';
import Entity from './Entity';
import {v4} from 'uuid';
import { Wire, autoUpdatePath, updateCalculatedTree } from './ModelDecorators';
import Flow from './Flow';
import _ from 'lodash';
import Loop from './Loop';

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
    path: string[] = []
    autowired: boolean = true;
    objectType: string = 'Attribute'

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
        this.updatePath()
        this.name = props.name;
        this.type = props.type;
        this.mandatory = props.mandatory;
        this.options = props.options;
        this.conditions = props.conditions;
        this.immediate = props.immediate;
        this.value = props.value; // Assign the value property from props
        this.autowired = parent?.autowired || true
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

    public updatePath = () => {
        this.path = this.parent?.path ? [...this.parent.path, this._id] : [this._id];
    }

    
    @Wire
    @autoUpdatePath
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

    /**
     * Handles the change event for the attribute.
     * @param value The new value of the attribute.
     */
    @autoUpdatePath
    onChangeHandler (value: any) {
        // We have to set the value in the parent to trigger the auto updating of the path property in the parent.
        this.parent.set(this._id, value);
        if(this.onChange) {
            this.onChange(value);
        }
        if(this._id === '_id') {
            this.parent.updateAttributePaths();
        }
    }

    public getInput = (props?: any): JSX.Element => {
        const inputTypes = {
                            'identifier': <Text {...props} />,
                            'string': <Text {...props} />,
                            'number': <Text validate="number" {...props} />,
                            'boolean': <Select options={[{_id: 'true', name: 'true'}, {_id: 'false', name: 'false'}]} {...props} />,
                            'color': <ColorPicker {...props} />,
                            'list': <Select options={this.options} {...props} />,
                            'calculation': <Calculation {...props} />
        } 
        const input = React.cloneElement(inputTypes[this.type], {
            onChange: (v: any) => {this.onChangeHandler(v)}
        });
        return input;
    }

    public update() {
        this.parent.update();
    }

    /**
     * Computes the value of the attribute.
     * @returns The computed value of the attribute.
     */
    public compute() {
        let res: any;
        const {calculatedTree} = (this.parent.getRoot() as Flow)
        if(this.type === 'calculation') {
            try {
                // The below line is a hack to get the iterator variables in the scope of the function.
                // TODO: Find a better way to do this.
                // LOL, it wasn't me that wrote this comment, it was Copilot. Even Copilot knows this snippet is crap.
                const functionStatement = `const {Configurations, Calculations, Datasets, Components} = this;
                ${calculatedTree.iterator!==undefined && Object.keys(calculatedTree.iterator).map((iteratorId: string) => {
                    // This part destructures the iterator object and assigns the values to variables with the same name as the keys.
                    // For example, if the iterator object is {iteratorId: 1, iteratorIndex: 0}, this part will generate the following code:
                    // const iteratorId = this.iterator.iteratorId;
                    // const iteratorIndex = this.iterator.iteratorIndex;
                    return `const ${iteratorId} = this.iterator.${iteratorId};`
                }).join('\n')}
                return  ${this.value}`
                const targetFunction = new Function(functionStatement)
                res = targetFunction.call(calculatedTree);
            }
            catch(e) {

            }
        }
        else {
            if(isNaN(Number(this.value))) {
                res = this.value;
            }
            else {
                res = Number(this.value);
            }
        }
        return res;
    }

    /**
     * Calculates the attribute value and updates the calculated tree.
     */
    @updateCalculatedTree
    public calculate() {
        
        return this.compute();
    }

}
    
