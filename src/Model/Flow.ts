import Configuration from "./Configuration";
import Dataset from "./Dataset";
import Calculation from "./Calculation";
import Component from "./Component";
import Layer from "./Layer";
import Entity from "./Entity";
import { BsFlower1 } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import EntityList from "./EntityList";
import _ from "lodash";
import Utilities from "Model/Utilities";

export default class Flow extends Entity {
    
    getRoot = (): Flow => {
        return this;
    }
    configurations: EntityList<Configuration>
    datasets: EntityList<Dataset>
    calculations: EntityList<Calculation>
    components: EntityList<Component>
    layers: EntityList<Layer>
    calculatedTree: any = {}
    
    name: Attribute = this.newAttribute({
        _id: 'name',
        name: 'name',
        type: 'string',
        mandatory: true,
    }); 
    ratio: Attribute = this.newAttribute({
        _id: 'ratio',
        name: 'ratio',
        type: 'list',
        options: [
            {
                _id: '1:1',
                name: '1:1',
            },
            {
                _id: '4:3',
                name: '4:3',
            },
            {
                _id: '16:9',
                name: '16:9',
            },
            {
                _id: '21:9',
                name: '21:9',
            },
            {
                _id: 'custom',
                name: 'custom',
            },
        ],
        mandatory: true,
    });
    
    public instantiateList<T extends Entity>(json: any, EntityType: typeof Entity, parent?: Entity): EntityList<T> {
        let res = undefined;
        if (json !== undefined) {
            res = Utilities.fromJson({json},parent);
        } else {
            res = new EntityList<T>({
                _id: EntityType.namePlural,
                EntityType,
            },parent);
        }
        return res
    }

    // Create a new flow. A flow contains all the configurations, datasets, calculations, components, layers and parameters required to produce a graphic.
    constructor(props: {
        _id?: string,
        configurations?: EntityList<Configuration>,
        datasets?: EntityList<Dataset>,
        calculations?: EntityList<Calculation>,
        components?: EntityList<Component>,
        layers?: EntityList<Layer>,
        setFlow?: (flow: Flow) => void,
        autowired?: boolean,
    }) {
        super(props);

        

        const _flow = this
        function _instantiateList<T extends Entity>(json: any, EntityType: typeof Entity): EntityList<T> {
            return _flow.instantiateList(json, EntityType, _flow)
        }


        

        this.path = undefined;
        this._id.value = props?._id || 'New flow';
        this.setFlow = props.setFlow
        this.configurations = _instantiateList<Configuration>(props.configurations, Configuration);
        this.datasets = _instantiateList<Dataset>(props.datasets, Dataset);
        this.calculations = _instantiateList<Calculation>(props.calculations, Calculation);
        this.components = _instantiateList<Component>(props.components, Component);
        this.layers = _instantiateList<Layer>(props.layers, Layer);
        
      
       
    }

    calculate = (): any => {
        
        this.calculatedTree = {};
        // return this.calculateChildren(['configurations','datasets','calculations','components','layers'])
        const res = this.calculateChildren(['configurations','datasets','calculations','components','layers'])
        return this.calculatedTree;
    }

    mergeCalculatedTree = (path, value): void => {
        this.calculatedTree = _.set(this.calculatedTree,path, value);
    }

    removeFromCalculatedTree = (paths: string[]): void => {
        paths.forEach(path => {
            this.calculatedTree = _.omit(this.calculatedTree,path);
        })
    }

    setIterator = (iteratorId: any, iteratorValue: any): void => {
        this.mergeCalculatedTree(['iterator',iteratorId],iteratorValue)
    }

    removeIterator = (): void => {
        this.removeFromCalculatedTree(['iterator'])
    }
    
}