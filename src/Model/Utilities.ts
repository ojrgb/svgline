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
import List from "./List";
import _ from "lodash";

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
        
        
        const Constructor = constructors[json.objectType]
        json.EntityType = Constructor
        if (!Constructor) {
            console.error(`Entity type ${json.objectType} does not exist or is not constructable`, json);
            return undefined;
        }

        // Copy the JSON and omit entities and elements. We'll add those later
        let _json = _.omit(json,['entities','elements']) as typeof json

        if(['Group','Loop','EntityList'].includes(_json.objectType)) {
            if(['Group','Loop'].includes(_json.objectType)) {
                res = new Constructor(_json,parent)
            }
            else {
                res = new EntityList(_json,parent)
            }
        }
        else {
            res = new Constructor(_json,parent);
        }
        // Return 
        

        if(res instanceof List && json.entities) {
            res.entities = json.entities.map((entity: any) => {
                return Utilities.fromJson({json: entity},res)
            })
        }
        if(res instanceof Layer && json.elements){
            
            let elementEntities = json.elements.entities
            if(!elementEntities) {
                console.error('json.elements.entities is undefined',json);
                elementEntities = []
            }

            let entities = elementEntities.map((element: any) => {
                return Utilities.fromJson({json: element},parent)
            })

            res.elements = new EntityList({_id: 'Elements', EntityType: Element, entities},res)
        }

        return res;
    }

    
} 