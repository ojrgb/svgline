import Entity from "./Entity";
import Flow from "./Flow";
import Group from "./Group";
import Config from "./Interface/Config";
import List from "./List";
import Loop from "./Loop";
import { Wire } from "./ModelDecorators";

export default class EntityList<T extends Entity> extends List<T> {
    

    /**
     * Creates a new group.
     * 
     * @returns A new instance of the Group class.
     */
    newGroup: (props: {_id: string}) => Group<T> = (props: {_id: string}) => {
        const group = new Group<T>({_id: props._id, type: this.type}, this)
        this.addItem(group)
        return group
    }

    /**
     * Creates a new loop.
     * @returns A new instance of Loop.
     */
    newLoop: (props: {_id: string}) => Loop<T> = (props: {_id: string}) => {
        const loop = new Loop<T>({_id: props._id, type: this.type}, this)
        this.addItem(loop)
        return loop
    }

    
    

    /**
     * Represents a list of entities.
     * @param props - The properties for the EntityList component.
     * @param parent - The parent entity of the EntityList.
     */
    constructor(props: {_id?: string, type: typeof Entity}, parent?: Entity) {
        super(props, parent)
    }

   
}