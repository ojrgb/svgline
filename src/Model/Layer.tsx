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

    constructor(props: {
        _id: string
    }, parent: Entity) {
        super({
            _id: props._id,
        },parent);
        this.elements = new EntityList<Element>({
            _id: 'elements',
            type: Element,
        },this);  
    }

    

    public compute: () => any = () => {
        console.log('computing layer')
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