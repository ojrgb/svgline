import { BsGearFill } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import Entity from "./Entity";
import EntityList from "./EntityList";
import Group from "./Group";

@Entity.Configure({
    nameSingle: 'Loop',
    namePlural: 'Loops',
    shortName: 'loop',
    formAttributes: [
        '_id',
        'loopStatement',
        'iteratorId',
        'iteratorIndex',      
    ],
    icon: BsGearFill,
})
export default class Loop<T extends Entity> extends Group<T> {
        
    loopStatement: Attribute = this.newAttribute({
        _id: 'loopStatement',
        name: 'Loop Statement',
        type: 'calculation',
        mandatory: true,
    });

    iteratorId: Attribute = this.newAttribute({
        _id: 'iteratorId',
        name: 'Iterator Id',
        type: 'string',
        mandatory: true,
    });

    iteratorIndex: Attribute = this.newAttribute({
        _id: 'iteratorIndex',
        name: 'Iterator Index',
        type: 'string',
        mandatory: true,
    });

    





    constructor(props: {
        _id?: string,
        type: typeof Entity
    }, parent?: Entity) {
        super(props,parent);
    }
}