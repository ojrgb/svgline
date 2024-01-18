import { BsGearFill } from "react-icons/bs";
import Attribute from "./Attribute";
import Element from "./Element";
import Entity from "./Entity";
import EntityList from "./EntityList";

@Entity.Configure({
    nameSingle: 'Layer',
    namePlural: 'Layers',
    shortName: 'layer',
    formAttributes: [
        '_id',
        'name',
        
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
    
    elements: EntityList<Element> = new EntityList<Element>({
        _id: 'elements',
        type: Element,
    },this);     

    constructor(props: {
        _id: string, 
        parent?: Entity, 
        
    }) {
        super({
            _id: props._id,
        },props.parent);
        
    }
}