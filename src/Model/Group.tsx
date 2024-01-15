import { BsGearFill } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import Entity from "./Entity";
import EntityList from "./EntityList";

@Entity.Configure({
    nameSingle: 'Loop',
    namePlural: 'Loops',
    shortName: 'loop',
    formAttributes: [
        
    ],
    icon: BsGearFill,
})
export default class Group<T extends Entity> extends EntityList<T> {
        
    name: Attribute = this.newAttribute({
        _id: 'name',
        name: 'Name',
        type: 'string',
        mandatory: false,
    });

    
    constructor(props: {
        _id?: string,
        type: typeof Entity
    }, parent?: Entity) {
        super({type: props.type},parent);
    }
}