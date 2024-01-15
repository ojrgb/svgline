import { BsGearFill } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import Entity from "./Entity";

@Entity.Configure({
    nameSingle: 'Dataset',
    namePlural: 'Datasets',
    shortName: 'data',
    formAttributes: [
        'name',
    ],
    icon: BsGearFill,
})
export default class Dataset extends Entity {
    name: Attribute = this.newAttribute({
        _id: 'name',
        name: 'Name',
        type: 'string',
        mandatory: false,
    });

    constructor(props: {
        _id?: string
    }, parent?: Entity) {
        super({},parent);
    }
}