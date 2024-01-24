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
    newGroup: () => Group<T> = () => {
        const group = new Group<T>({_id: "New group", type: this.type}, this)
        this.addItem(group)
        return group
    }

    /**
     * Creates a new loop.
     * @returns A new instance of Loop.
     */
    newLoop: () => Loop<T> = () => {
        const loop = new Loop<T>({_id: "New loop", type: this.type}, this)
        this.addItem(loop)
        return loop
    }

    
    calculate: () => void = () => {
        this.entities.map((entity: Entity) => {
            entity.calculate()
        })
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