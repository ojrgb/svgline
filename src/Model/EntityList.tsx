import Entity from "./Entity";
import Flow from "./Flow";
import Config from "./Interface/Config";
import { Wire } from "./ModelDecorators";

export default class EntityList<T extends Entity> extends Entity {
    /**
     * Represents a list of entities.
     * @template T The type of entities in the list.
     */
    entities: T[] = []
    /**
     * Represents the type of the entity.
     * @template T - The type of the entity.
     */
    type: typeof Entity;
 
    /**
     * Represents a list of entities.
     * @param props - The properties for the EntityList component.
     * @param parent - The parent entity of the EntityList.
     */
    constructor(props: {_id?: string, type: typeof Entity}, parent?: Entity) {
        super(props, parent)
        this.type = props.type
        this.setFlow = parent.setFlow
    }

    /**
     * Removes an item from the entity list.
     * @param item - The item to be removed.
     * @returns The removed entity.
     */
    @Wire
    removeItem(item: T): Entity {
        this.entities = this.entities.filter(e => e !== item)

        return undefined
    }

    /**
     * Duplicates an item in the entity list.
     * @param item - The item to duplicate.
     * @param index - The optional index at which to insert the duplicated item.
     * @returns The duplicated item.
     */
    duplicateItem(item: T, index?: number): Entity {
        const newItem = {...item}
        this.addItem(newItem, index)

        return newItem
    }

    /**
     * Moves an item in the entity list up or down.
     * @param item - The item to move.
     * @param direction - The direction to move the item ('up' or 'down').
     * @returns The moved item.
     */
    @Wire
    moveItem(item: T, direction: 'up' | 'down'): Entity {
        const itemIndex = this.entities.findIndex(e => e === item);
        if (direction === 'up' && itemIndex > 0) {
            const itemAbove = this.entities[itemIndex - 1];
            this.entities[itemIndex - 1] = item;
            this.entities[itemIndex] = itemAbove;
        } else if (direction === 'down' && itemIndex < this.entities.length - 1) {
            const itemBelow = this.entities[itemIndex + 1];
            this.entities[itemIndex + 1] = item;
            this.entities[itemIndex] = itemBelow;
        }

        return item;
    }
     

  
    /**
     * Removes an item from the entity list based on its internal ID.
     * @param internalId The internal ID of the item to be removed.
     * @returns The removed entity, or undefined if no entity was found with the specified internal ID.
     */
    @Wire
    removeItemByInternalId(internalId: string): Entity {
        this.entities = this.entities.filter(e => e.internalId !== internalId)

        return undefined
    }

    /**
     * Duplicate an item in the entity list by its internal ID.
     * 
     * @param internalId - The internal ID of the item to duplicate.
     * @returns The duplicated item.
     */
    duplicateItemByInternalId(internalId: string): Entity {
        const itemIndex = this.entities.findIndex(e => e.internalId === internalId)
        const item = {...this.entities[itemIndex]}
        if (item) {
            this.duplicateItem(item, itemIndex)
        }

        return item
    }
       
    /**
     * Moves an item in the entity list by its internal ID.
     * @param internalId - The internal ID of the item to be moved.
     * @param direction - The direction in which to move the item ('up' or 'down').
     * @returns The moved entity.
     */
    @Wire
    moveItemByInternalId(internalId: string, direction: 'up' | 'down'): Entity {
        const itemIndex = this.entities.findIndex(e => e.internalId === internalId);
        const item = this.entities[itemIndex];
        if (item) {
            if (direction === 'up' && itemIndex > 0) {
                const itemAbove = this.entities[itemIndex - 1];
                this.entities[itemIndex - 1] = item;
                this.entities[itemIndex] = itemAbove;
            } else if (direction === 'down' && itemIndex < this.entities.length - 1) {
                const itemBelow = this.entities[itemIndex + 1];
                this.entities[itemIndex + 1] = item;
                this.entities[itemIndex] = itemBelow;
            }
        }

        return item;
    }

    /**
     * Adds an item to the entity list.
     * @param item - The item to be added.
     * @param index - The optional index at which to insert the item.
     * @returns The added item.
     */
    @Wire
    addItem(item: T, index?: number): Entity {
        item.moveItemInParent = (direction): Entity => {
            return this.moveItem(item, direction)
        }

        item.removeItemInParent = (): Entity => {
            return this.removeItem(item)
        }

        item.duplicateItemInParent = (): Entity => {
            return this.duplicateItem(item)
        }

        item.newItemInParent = (direction: 'up' | 'down'): Entity => {
            if(direction === 'up') {
                return this.newItem(undefined, this.entities.indexOf(item) + 1)
            }
            if(direction === 'down') {
                return this.newItem(undefined, this.entities.indexOf(item) - 1)
            }
        }

        item.parent = this
      
        if (index) {
            this.entities.splice(index, 0, item)
        } else {
            this.entities.push(item)
        }

        return item
    }

    
    /**
     * Creates a new item and adds it to the entity list.
     * @param props Optional properties for the new item.
     * @param index Optional index at which to insert the new item.
     * @returns The newly created item.
     */
    newItem(props?: {_id: string}, index?: number): Entity {
        const target = new (this.type as any)(props, this) as T
        this.addItem(target, index)
        return target
    }

    

    /**
     * Retrieves an array of entities.
     * 
     * @returns {any[]} The array of entities.
     */
    public get(): any[] {
        return this.entities.map(e => e.get())
    }

    /**
     * Returns the type of the entity list.
     * @returns {Function} The constructor function of the type.
     */
    getType = (): Function => {
        return this.type;
    }

    public clone(): EntityList<T> {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }



}