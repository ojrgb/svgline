import { BsGearFill } from "react-icons/bs";
import Attribute from "./Attribute";
import Element from "./Element";
import Entity from "./Entity";
import EntityList from "./EntityList";
import { updateCalculatedTree } from "./ModelDecorators";

@Entity.Configure({
    nameSingle: 'Layer',
    namePlural: 'Layers',
    shortName: 'layer',
    formAttributes: [
        '_id',
        'name',
        'fill'
    ],
    icon: BsGearFill,
})
export default class Layer extends Entity {
    name: Attribute = this.newAttribute({
        _id: 'name',
        name: 'Name',
        type: 'string',
        mandatory: false,
    });

    fill: Attribute = this.newAttribute({
        _id: 'fill',
        name: 'Fill',
        type: 'color',
        mandatory: false,
    });
    
    elements: EntityList<Element>;   

    public instantiateList<T extends Entity>(json: any, EntityType: typeof Entity, parent?: Entity): EntityList<T> {
        
        if (json !== undefined) {
            
            return EntityList.fromJson<EntityList<T>>({json, EntityType},parent);
        } else {
            return new EntityList<T>({
                _id: EntityType.namePlural,
                EntityType: EntityType,
            },parent);
        }
    }

    constructor(props: {
        _id: string,
        elements: any[],
    }, parent: Entity) {
        
        super({
            _id: props._id,
        },parent);
        this.autoAssignProps(props);
        this.elements = this.instantiateList<Element>(props.elements, Element, this);
    }

    

    public compute: () => any = () => {
        const res = Object.assign(
            {},
            super.compute(),
            {
                elements: this.elements.compute()
            }
        )
        return res
        
    }

    public calculate: () => void = () => {
        this.getRoot().mergeCalculatedTree(this.path,this.compute())
    }
}