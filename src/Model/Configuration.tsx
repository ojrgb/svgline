import { BsGearFill } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import Entity from "./Entity";
import { updateCalculatedTree } from "./ModelDecorators";

@Entity.Configure({
    nameSingle: 'Configuration',
    namePlural: 'Configurations',
    shortName: 'config',
    formAttributes: [
        '_id',
        'name',
        'type',
        'defaultValue',
        'sampleValue',
    ],
    icon: BsGearFill,
})
export default class Configuration extends Entity {
        
    name: Attribute = this.newAttribute({
        _id: 'name',
        name: 'Name',
        type: 'string',
        mandatory: false,
    });
    type: Attribute = this.newAttribute({
        _id: 'type',
        name: 'Type',
        type: 'list',
        options: [
            {
                _id: 'string',
                name: 'String',
            },
            {
                _id: 'number',
                name: 'Number',
            },
            {
                _id: 'boolean',
                name: 'Boolean',
            },
            {
                _id: 'color',
                name: 'Color',
            },
            {
                _id: 'calculation',
                name: 'Calculation',
            },
        ],
        mandatory: false,
    });
    defaultValue: Attribute = this.newAttribute({
        _id: 'defaultValue',
        name: 'Default Value',
        type: 'string',
        mandatory: false,
    });
    sampleValue: Attribute = this.newAttribute({
        _id: 'sampleValue',
        name: 'Sample Value',
        type: 'string',
        mandatory: false,
    });
    

    constructor(props: {
        _id?: string,
        name: string,
        type: string,
        defaultValue: string,
        sampleValue: string,
    }, parent?: Entity) {
        super({
            _id: props._id,
        }, parent);
        this.autoAssignProps(props);
        
    }

    @updateCalculatedTree
    public calculate(): void {
        return this.sampleValue.compute() || this.defaultValue.compute()
    }
}