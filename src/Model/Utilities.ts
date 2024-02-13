import Entity from "Model/Entity";
import EntityList from "Model/EntityList";
import Group from "Model/Group";
import Loop from "Model/Loop";
import Configuration from "Model/Configuration";
import Flow from "Model/Flow";
import Layer from "Model/Layer";
import Element from "Model/Element";
import Dataset from "Model/Dataset";
import Component from "Model/Component";
import Calculation from "Model/Calculation";

export default class Utilities {
    static fromJson(props: {json: any}, parent?: Entity): Entity{
        let {json} = props;
        let res: Entity | undefined = undefined;
        // Null check
        if(!json) {
            console.error('json is undefined',props);
            return undefined;
        }
        const constructors = {
            Configuration,
            Calculation,
            Flow,
            Layer,
            Element,
            Dataset,
            Component,
            Group,
            Loop,
            EntityList
        }
        if(json.entities) {
            json.entities = json.entities.map((entity: any) => {
                return Utilities.fromJson({json: entity},parent)
            })
        }
        if(json.elements){
            let elementEntities = json.elements.entities
            if(!elementEntities) {
                // console.error('json.elements.entities is undefined',json.elements);
                elementEntities = []
            }

            let entities = elementEntities.map((element: any) => {
                return Utilities.fromJson({json: element},parent)
            })

            json.elements = new EntityList({_id: 'Elements', EntityType: Element, entities},parent)
        }
        
        const Constructor = constructors[json.objectType]
        json.EntityType = Constructor
        if (!Constructor) {
            console.error(`Entity type ${json.objectType} does not exist or is not constructable`, json);
            return undefined;
        }

        if(['Group','Loop','EntityList'].includes(json.objectType)) {
            if(['Group','Loop'].includes(json.objectType)) {
                return new Constructor(json,parent)
            }
            else {
                return new EntityList(json,parent)
            }
        }
        // Return 
        res = new Constructor(json,parent);
        return res;
    }

    
} 