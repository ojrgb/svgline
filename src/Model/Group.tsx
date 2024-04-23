import { BsGearFill } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import Entity from "./Entity";
import EntityList from "./EntityList";
import List from "./List";
import Utilities from "./Utilities";
import Loop from "./Loop";

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
        EntityType: typeof Entity,
        entities: T[]
    }, parent?: Entity) {
        super(props,parent);
        this.updatePath()
    }

    getInherited = (): boolean => {
        return this.EntityType.getInherited()
    }

   

    
}