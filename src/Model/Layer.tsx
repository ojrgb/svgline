import { BsGearFill } from "react-icons/bs";
import Attribute from "./Attribute";
import Element from "./Element";
import Entity from "./Entity";
import EntityList from "./EntityList";
import { updateCalculatedTree } from "./ModelDecorators";
import Utilities from "Model/Utilities";

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
        type: ['color','calculation'],
        mandatory: false,
    });
    
    elements: EntityList<Element>;   

    

    constructor(props: {
        _id: string,
        elements: EntityList<Element>,
    }, parent: Entity) {
        
        super({
            _id: props._id,
        },parent);
        this.autoAssignProps(props);
        this.elements = props.elements || new EntityList<Element>({
            _id: 'Elements',
            EntityType: Element,
        },parent);
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