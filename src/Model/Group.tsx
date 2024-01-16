import { BsGearFill } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import Entity from "./Entity";
import EntityList from "./EntityList";
import List from "./List";

@Entity.Configure({
    nameSingle: 'Group',
    namePlural: 'Groups',
    shortName: 'group',
    formAttributes: [
        '_id'
    ],
    icon: BsGearFill,
})
export default class Group<T extends Entity> extends List<T> {
        
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
        
        if(props._id) this.set('_id',props._id)
    }
}