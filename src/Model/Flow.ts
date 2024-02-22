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
import { re } from "mathjs";

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

    /**
     * Calculates the tree based on the specified children.
     * @returns The calculated tree.
     */
    calculate = (): any => {
        
        this.calculatedTree = {};
        // return this.calculateChildren(['configurations','datasets','calculations','components','layers'])
        const res = this.calculateChildren(['configurations','datasets','calculations','components','layers'])
        return this.calculatedTree;
    }

    /**
     * Merges the calculated tree with the given path and value.
     * @param path - The path to merge the value into.
     * @param value - The value to merge into the calculated tree.
     */
    mergeCalculatedTree = (path, value): void => {
        this.calculatedTree = _.set(this.calculatedTree,path, value);
    }

    /**
     * Removes the specified paths from the calculated tree.
     * @param paths - An array of paths to be removed.
     */
    removeFromCalculatedTree = (paths: string[]): void => {
        paths.forEach(path => {
            this.calculatedTree = _.omit(this.calculatedTree,path);
        })
    }

    /**
     * Sets the iterator value for the specified iterator ID.
     * 
     * @param iteratorId - The ID of the iterator.
     * @param iteratorValue - The value to set for the iterator.
     */
    setIterator = (iteratorId: any, iteratorValue: any): void => {
        this.mergeCalculatedTree(['iterator',iteratorId],iteratorValue)
    }

    /**
     * Removes the iterator from the calculated tree.
     */
    removeIterator = (): void => {
        this.removeFromCalculatedTree(['iterator'])
    }

    /**
     * Retrieves the data for autocomplete functionality.
     * @returns {any} The autocomplete data.
     */
    getForAutocomplete = (): any => {
        const calculatedTree = this.calculate()
        let formatEntity = (entity) => {
            const _res = {
                _proto: {
                    _id: entity._id?.value,
                    name: entity.name?.value,
                    type: entity.constructor?.name,
                    path: entity.path,
                    entities: entity.entities?.map(formatEntity).reduce((acc,entity) => {return {...acc,...{[entity._proto._id]: entity}}},{}),
                    elements: entity.elements?.entities?.map(formatEntity).reduce((acc,entity) => {return {...acc,...{[entity._proto._id]: entity}}},{}),
                    value: ['EntityList','Group','Loop'].includes(entity.constructor?.name) ? undefined : _.get(calculatedTree,entity.path),
                    description: entity.description?.value,
                },
            }
            // Bring up the .entities and .elements to the parent level
            const res = {..._res, ...((_res._proto.entities && Object.keys(_res._proto.entities)?.length>0) ? _res._proto.entities : {}),...((_res._proto.elements && Object.keys(_res._proto.elements)?.length>0) ? _res._proto.elements : {})}
            return res
        }
        let res = {};
        ['configurations','datasets','calculations','components','layers'].forEach(entityType => {
            const currentEntity = this[entityType]
            res[currentEntity._id.value] = formatEntity(this[entityType])
        })
        return res;
    }
    
}