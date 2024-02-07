import { BsGearFill } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import Entity from "./Entity";
import { updateCalculatedTree } from "./ModelDecorators";

@Entity.Configure({
    nameSingle: 'Calculation',
    namePlural: 'Calculations',
    shortName: 'calc',
    formAttributes: [
        '_id',
        'formula'
    ],
    icon: BsGearFill,
})
export default class Calculation extends Entity {

    formula: Attribute = this.newAttribute({
        _id: 'formula',
        name: 'Formula',
        type: 'calculation',
        mandatory: true,
    });

    constructor(props: {
        _id: string, 
      formula: string
    },parent: Entity) {
        super(props,parent);
        this.autoAssignProps(props);
    }

    compute () {
        return this.formula.compute()
    }

    @updateCalculatedTree
    calculate () {
        return this.compute()
    }
}