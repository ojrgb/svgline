import Entity from "./Entity"

export default class Group extends Entity{
    _id: string;
    parent: Entity;
    name?: string;
    children?: Entity[] = [];
    constructor(_id: string, parent?: Entity, name?: string, children?: Entity[]) {
        super(_id, parent)
        this.name = name;
        this.children = children || [];
    }
    public getChildById(_id: string): Entity {
        return this.getFromSetById('children', _id);
    }

    public addChild(child: Entity): void {
        child.setParent(this);
        this.addToSet('children', child);
    }

    public removeChild(_id: string): void {
        this.removeFromSet('children', _id);
    }
    public updateChild(_id: string, child: Entity): void {
        this.updateSet('children', _id, child);
    }
}