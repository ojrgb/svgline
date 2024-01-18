import React from 'react'
import _ from "lodash";
import Attribute from "./Attribute";
import { v4 } from "uuid";
import { IconType } from "react-icons";
import Config from "./Interface/Config";
import { config } from "mathjs";
import { flowStore } from 'Context/flowStore';
import { Wire } from './ModelDecorators';


export default class Entity {
    setFlow: (flow: any) => void;    
    update: () => void = () => {
        if(this.setFlow) { this.setFlow(this.getRoot());}
        if(this.parent && this.parent.setFlow) {
            this.parent.setFlow(this.getRoot());
        }
        else {
            this.parent.update()
        }
        // console.log(this)
    };
    getType: () => any;
    /**
     * Indicates whether the entity is autowired. If true, the flow state in the context will be updated when the entity is updated.
     */
    autowired: boolean;



    /**
     * Gets the value indicating whether the entity is inherited.
     * @returns {boolean} The value indicating whether the entity is inherited.
     */
    static getInherited: () => boolean = () => {
        return false;
    }

    // Declare newAttribute function so we can use it. All of this class' attributes will be created after this function.    
    
    /**
     * Creates a new attribute for the entity.
     * @param props - The properties of the attribute.
     * @returns The newly created attribute.
     */
    public newAttribute = (props: {
                _id: string,name: string, type: 'identifier' | 'string' | 'list' | 'number' | 'color' | 'boolean'  | 'calculation', 
                mandatory: boolean, options?: {
                    _id: string,
                    name: string,
                }[], 
                conditions?: ((arg: any) => boolean) | ((arg: any) => boolean)[], 
                immediate?: boolean, 
                value?: any
            }
        ): Attribute => {
        return new Attribute(props,this,undefined);
    }

    /**
     * Creates a new instance of an entity.
     * @template T - The type of entity to create.
     * @param props - The properties of the entity.
     * @param EntityClass - The class of the entity.
     * @returns The newly created entity.
     */
    public newEntity = <T extends Entity>(props: {
        _id: string
    }, EntityClass: new (props,parent) => T): T => {
        return new EntityClass(props,this);
    }

    /**
     * The internal identifier for the entity.
     */
    internalId = v4();
    
    /**
     * The unique identifier for the entity.
     */
    _id: Attribute = this.newAttribute({
        _id: '_id',
        name: 'identifier',
        type: 'identifier',
        mandatory: true,
    
    });

    /**
     * The parent entity of this entity.
     */
    parent: Entity;

    /**
     * The name of the entity.
     */
    static nameSingle: string;
    /**
     * The plural name of the entity.
     */
    static namePlural: string;
    /**
     * The short name of the entity.
     */
    static shortName: string;
    /**
     * The icon type for the entity.
     */
    static icon: IconType;
    /**
     * The list of form attributes for the Entity class.
     */
    static formAttributes: string[] = [];

    /** Returns the topmost entity, which should be the Flow object. */
    getRoot: () => Entity = () => {
        if(this.parent) {
            return this.parent.getRoot();
        }
        else {
            return this;
        }
    }

    // Add all the functions that will be used to control this Entity in the parent array

    /**
     * Removes the item from its parent.
     */
    removeItemInParent: () => void
    /**
     * Duplicates the item within its parent.
     */
    duplicateItemInParent: () => void
    /**
     * Moves the item within its parent in the specified direction.
     * @param direction The direction to move the item in. Can be 'up' or 'down'.
     */
    moveItemInParent: (direction: 'up' | 'down') => void
    /**
     * Adds a new item in the parent entity.
     * @param direction The direction in which to add the new item. Can be 'up' or 'down'.
     */
    newItemInParent: (direction: 'up' | 'down') => void



    /** Creates a new Entity. */
    constructor(props?: {_id?: string}, parent?: Entity) {
        // console.log(`Creating a new entity with props: ${JSON.stringify(props)} and parent: ${parent}`)
        this.autowired = true
        if(props?._id) {
            this._id.value = props._id;
        }

        if(parent) {
            this.parent = parent;
        }

    }
    
    /**
     * A Decorator that configures the entity with the provided configuration.
     * @param config The configuration object.
     * @returns A decorator function that applies the configuration to the target.
     */
    static Configure(config: Config) {
        return (target: any) => {
            target.nameSingle = config.nameSingle;
            target.namePlural = config.namePlural;
            target.shortName = config.shortName;
            target.formAttributes = config.formAttributes;
            target.icon = config.icon;
            target.inherited = config.inherited;
        }    
    }
    
    

    /**
     * Gets the parent entity of this entity.
     * @returns The parent entity.
     */
    public getParent(): Entity {
        return this.parent;
    }

    
    /**
     * Sets the parent entity of this entity.
     * 
     * @param parent The parent entity to set.
     */
    @Wire
    public setParent(parent: Entity): void {
        this.parent = parent;
    }


    /**
     * Adds a child entity to the specified set.
     * 
     * @param set - The name of the set to add the child to.
     * @param child - The child entity to add to the set.
     */
    public addToSet(set: string, child: Entity): void {
        if(!this[set]) {
            console.error(`set ${set} does not exist`);
        }
        this[set].push(child);
    }    

    /**
     * Removes an entity from a set.
     * @param set - The name of the set.
     * @param _id - The ID of the entity to remove.
     */
    public removeFromSet(set: string, _id: string): void {
        if(!this[set]) {
            console.error(`set ${set} does not exist`);
        }
        this[set] = this[set].filter((child: Entity) => child.get('_id') !== _id);
    }

    /**
     * Updates the specified set of entities with the provided target entity.
     * If the set does not exist, an error message is logged.
     * @param set - The name of the set to update.
     * @param _id - The ID of the entity to update.
     * @param target - The entity containing the updated values.
     */
    public updateSet(set: string, _id: string, target: Entity): void {
        if(!this[set]) {
            console.error(`set ${set} does not exist`);
        }
        this[set] = this[set].map((child: Entity) => {
            if(child.get('_id') === _id) {
                return _.merge({},child,target);
            }
            return child;
        });
    }

    /**
     * Retrieves an entity from a set by its ID.
     * @param set - The name of the set to search in.
     * @param _id - The ID of the entity to retrieve.
     * @returns The entity with the specified ID, or undefined if not found.
     */
    public getFromSetById(set: string, _id: string): Entity {
        if(!this[set]) {
            console.error(`set ${set} does not exist`);
        }
        return this[set].find((child: Entity) => child.get('_id') === _id);
    }

    /**
     * Returns the index of an entity in the specified set based on its ID.
     * @param set - The name of the set.
     * @param _id - The ID of the entity.
     * @returns The index of the entity in the set, or -1 if not found.
     */
    public getIndexFromSetById(set: string, _id: string): number {
        if(!this[set]) {
            console.error(`set ${set} does not exist`);
        }
        return this[set].findIndex((child: Entity) => child.get('_id') === _id);
    }

    /**
     * Duplicates an entity in a set by its ID.
     * @param set - The name of the set.
     * @param _id - The ID of the entity to duplicate.
     */
    public duplicateInSetById(set: string, _id: string): void {
        if(!this[set]) {
            console.error(`set ${set} does not exist`);
        }
        let target = Object.assign({},this.getFromSetById(set, _id));
        target.set('_id',target.get('_id') + '_copy');
        let targetIndex = this.getIndexFromSetById(set, _id);
        let newSet: Entity[] = [...this[set]]
        newSet.splice(targetIndex, 0, target);
        this[set] = newSet;

    }
    
    public toJSON(attribute?: string): any {
        // if(!attribute) {
        //     return this;
        // }
        // if(!this[attribute]) {
        //     console.error(`attribute ${attribute} does not exist`);
        // }
        // if(this[attribute] instanceof Attribute) {
        //     const attr: Attribute = this[attribute];
        //     return attr.get();
        // }
        // return this[attribute];
    }

    
    /**
     * Sets the value of the specified attribute.
     * 
     * @param attribute - The name of the attribute.
     * @param value - The value to set.
     */
    @Wire
    public set(attribute: string, value: any): void {
        if(!this[attribute]) {
            console.error(`attribute ${attribute} `);
        }
        if(this[attribute] instanceof Attribute) {
            const attr: Attribute = this[attribute];
            attr.set(value);
            this[attribute] = attr;
            return;
        }
        this[attribute] = value;
    }

    
    /**
     * Retrieves the value of an attribute or the entire object.
     * 
     * @param attribute - The name of the attribute to retrieve. If not specified, returns the whole object.
     * @returns The value of the specified attribute or the entire object.
     */
    public get(attribute?: string): any {
        // If an attribute was specified, return that attribute
        if(attribute) {
            if(!this[attribute]) {
                console.error(`attribute ${attribute} does not exist`);
            }
            if(this[attribute] instanceof Attribute) {
                const attr: Attribute = this[attribute];
                return attr.get();
            }
            return this[attribute];
        }
        // If no attribute was specified, return the whole object
        let result: any = {};
        for(let key in this) {
            if(key==='parent') {
                continue;
            }
            let target: any = this[key]
            if(target instanceof Entity) {
                result[key] = target.get();
                continue;
            }
            if(Array.isArray(target)) {
                result[key] = target.map((element: Entity) => element.get());
                continue;
            }
            if(target instanceof Attribute) {
                result[key] = target.get();
                continue;
            }
        }
        return result;
    }

    public keys(): string[] {
        return Object.keys(this);
    }

    public clone(): Entity {
        console.log('This is me',this)
        console.log('This is the clone',Object.assign(Object.create(Object.getPrototypeOf(this)), this))
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }

    public onChange = (caller: Entity): Entity => {
        if(this.parent) {
            return this.parent.onChange(this);
        }
        return this;
    }

    public getAttributes(): Attribute[] {
        let result: Attribute[] = [];
        for(let key in this) {
            if(this[key] instanceof Attribute) {
                result.push(this[key] as Attribute);
            }
        }
        return result;
    }

    public calculate(): {[key: string]: string | number | (string | number)[]}[] {
        const attributes = this.getAttributes();
        let res = [];
        for(let attr of attributes) {
            if(attr.type === 'calculation') {
                res.push({[attr._id]: attr.calculate("")});
            }
        }
        return res;
    }

    /**
     * Gets the value indicating whether the entity is inherited.
     * @returns {boolean} The value indicating whether the entity is inherited.
     */
    
}