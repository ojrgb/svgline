import { BsGearFill } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import Entity from "./Entity";

@Entity.Configure({
    nameSingle: 'Calculation',
    namePlural: 'Calculations',
    shortName: 'calc',
    formAttributes: [
        'formula'
    ],
    icon: BsGearFill,
})
export default class Calculation extends Entity {
    name: Attribute = this.newAttribute({
        _id: 'name',
        name: 'name',
        type: 'string',
        mandatory: true,
    });

    formula: Attribute = this.newAttribute({
        _id: 'formula',
        name: 'Formula',
        type: 'calculation',
        mandatory: true,
    });

    constructor(props: {
        _id: string, 
        parent?: Entity, 
        
    }) {
        super({_id: props._id},props.parent);
        
    }
}