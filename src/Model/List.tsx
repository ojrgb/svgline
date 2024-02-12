import Attribute from "./Attribute";
import Entity from "./Entity";
import Flow from "./Flow";
import Group from "./Group";
import Config from "./Interface/Config";
import Loop from "./Loop";
import { Wire } from "./ModelDecorators";
import Utilities from "./Utilities";

export default class List<T extends Entity> extends Entity {
    /**
     * Represents a list of entities.
     * @template T The type of entities in the list.
     */
    entities: (T | Group<T> | Loop<T>)[] = []
    /**
     * Represents the type of the entity.
     * @template T - The type of the entity.
     */
    EntityType: typeof Entity;

    
    /**
     * Represents a list of entities.
     * @param props - The properties for the List component.
     * @param parent - The parent entity of the List.
     */
    constructor(props: {
        _id?: string, 
        EntityType: typeof Entity,
        entities?: (T | Group<T> | Loop<T>)[]
    }, parent?: Entity) {
        super(props, parent)
        this.EntityType = props.EntityType
        // this.type = props.type
        // this.setFlow = parent.setFlow
        this.entities = props.entities ? props.entities : []
    }

    /**
     * Removes an item from the entity list.
     * @param item - The item to be removed.
     * @returns The removed entity.
     */
    @Wire
    removeItem(item: T | Group<T> | Loop<T>): Entity {
        this.entities = this.entities.filter(e => e !== item)

        return undefined
    }

    /**
     * Duplicates an item in the entity list.
     * @param item - The item to duplicate.
     * @param index - The optional index at which to insert the duplicated item.
     * @returns The duplicated item.
     */
    duplicateItem(item: T | Group<T> | Loop<T>, index?: number): Entity {
        const newItem = item.clone()
        this.addItem(newItem as T, index);

        return newItem as Entity;
    }

    /**
     * Moves an item in the entity list up or down.
     * @param item - The item to move.
     * @param direction - The direction to move the item ('up' or 'down').
     * @returns The moved item.
     */
    @Wire
    moveItem(item: T | Group<T> | Loop<T>, direction: 'up' | 'down'): Entity {
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
            this.duplicateItem(item as T | Group<T> | Loop<T>, itemIndex)
        }

        return item as Entity;
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
    addItem(item: T | Group<T> | Loop<T>, index?: number): Entity {
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

        item.setParent(this)
      
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
        const target = new (this.EntityType as any)(props, this) as T
        this.addItem(target, index)
        return target
    }

    

    /**
     * Retrieves an array of entities.
     * 
     * @returns {any[]} The array of entities.
     */
    public get(attributeId?: string): any[] | any {
        return super.get(attributeId) 
    }

    public getEntities(): (T | Group<T> | Loop<T>)[] {
        return this.entities
    }

    /**
     * Retrieves an entity from the entity list based on its ID.
     * @param id - The ID of the entity to retrieve.
     * @returns The entity with the specified ID, or undefined if not found.
     */
    public getEntityById(id: string): T | Group<T> | Loop<T> {
        return this.entities.find(e => e._id.get() === id)
    }

    /**
     * Returns the type of the entity list.
     * @returns {Function} The constructor function of the type.
     */
    getType = (): Function => {
        return this.EntityType;
    }

    public clone(): List<T> {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }

    calculate: () => void = () => {
        this.entities.map((entity: Entity) => {
            entity.calculate()
        })
    }

    compute: () => any = () => {
        return this.entities.map((entity: Entity) => {
            return entity.compute()
        })
    }

}