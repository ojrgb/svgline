import _ from "lodash";
import Attribute from "./Attribute";

export default class Entity {
    _id: string;
    parent: Entity;
    constructor(_id: string, parent?: Entity) {
        this._id = _id;
        
        this.parent = parent;
    }
    

    public getParent(): Entity {
        return this.parent;
    }

    public addToSet(set: string, child: Entity): void {
        if(!this[set]) {
            console.error(`set ${set} does not exist`);
        }
        this[set].push(child);
    }    

    public removeFromSet(set: string, _id: string): void {
        if(!this[set]) {
            console.error(`set ${set} does not exist`);
        }
        this[set] = this[set].filter((child: Entity) => child._id !== _id);
    }

    public updateSet(set: string, _id: string, target: Entity): void {
        if(!this[set]) {
            console.error(`set ${set} does not exist`);
        }
        this[set] = this[set].map((child: Entity) => {
            if(child._id === _id) {
                return _.merge({},child,target);
            }
            return child;
        });
    }

    public getFromSetById(set: string, _id: string): Entity {
        if(!this[set]) {
            console.error(`set ${set} does not exist`);
        }
        return this[set].find((child: Entity) => child._id === _id);
    }

    public getIndexFromSetById(set: string, _id: string): number {
        if(!this[set]) {
            console.error(`set ${set} does not exist`);
        }
        return this[set].findIndex((child: Entity) => child._id === _id);
    }

    public duplicateInSetById(set: string, _id: string): void {
        if(!this[set]) {
            console.error(`set ${set} does not exist`);
        }
        let target = Object.assign({},this.getFromSetById(set, _id));
        target._id = target._id + '_copy';
        let targetIndex = this.getIndexFromSetById(set, _id);
        let newSet: Entity[] = [...this[set]]
        newSet.splice(targetIndex, 0, target);
        this[set] = newSet;

    }

    
}