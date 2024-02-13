import Entity from "./Entity";
import Flow from "./Flow";
import Group from "./Group";
import Config from "./Interface/Config";
import List from "./List";
import Loop from "./Loop";
import { Wire } from "./ModelDecorators";
import Configuration from "./Configuration";
import Dataset from "./Dataset";
import Calculation from "./Calculation";
import Component from "./Component";
import Layer from "./Layer";
import Utilities from "Model/Utilities";



@Entity.Configure({
    nameSingle: 'List',
    namePlural: 'Lists',
    shortName: 'list',
    formAttributes: []
})

export default class EntityList<T extends Entity> extends List<T> {
    

    /**
     * Creates a new group.
     * 
     * @returns A new instance of the Group class.
     */
    newGroup: (props: {_id: string}) => Group<T> = (props: {_id: string}) => {
        const group = new Group<T>({_id: props._id, EntityType: this.EntityType, entities: []}, this)
        this.addItem(group)
        return group
    }

    /**
     * Creates a new loop.
     * @returns A new instance of Loop.
     */
    newLoop: (props: {_id: string}) => Loop<T> = (props: {_id: string}) => {
        
        const loop = new Loop<T>({_id: props._id, EntityType: this.EntityType, entities: []}, this)
        this.addItem(loop)
        return loop
    }

    
    

    /**
     * Represents a list of entities.
     * @param props - The properties for the EntityList component.
     * @param parent - The parent entity of the EntityList.
     */
    constructor(props: {_id?: string, EntityType: typeof Entity, entities?: any[]}, parent?: Entity) {
        super(props, parent)
        const {EntityType} = props;
        this.EntityType = EntityType
        this.setFlow = parent.setFlow
        this.entities = props.entities || []
    }

    

   
}