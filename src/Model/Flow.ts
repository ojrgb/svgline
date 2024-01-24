import Configuration from "./Configuration";
import Dataset from "./Dataset";
import Calculation from "./Calculation";
import Component from "./Component";
import Layer from "./Layer";
import Entity from "./Entity";
import { BsFlower1 } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import EntityList from "./EntityList";

export default class Flow extends Entity {
    
    getRoot = (): Entity => {
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
    autowired: boolean = true;

    
    // Create a new flow. A flow contains all the configurations, datasets, calculations, components, layers and parameters required to produce a graphic.
    constructor(props: {
        _id?: string,
        configurations?: EntityList<Configuration>,
        datasets?: EntityList<Dataset>,
        calculations?: EntityList<Calculation>,
        components?: EntityList<Component>,
        layers?: EntityList<Layer>,
        setFlow?: (flow: Flow) => void,
    }) {
        super({
            _id: props?._id
        });
        this.path = undefined
        this._id.value = props?._id || 'New flow';
        this.setFlow = props.setFlow
        this.configurations = new EntityList<Configuration>({
            _id: "configurations",
            type: Configuration,
        },this);
        this.datasets = new EntityList<Dataset>({
            _id: "datasets",
            type: Dataset,
            },this);
        this.calculations= new EntityList<Calculation>({
            _id: "calculations",
            type: Calculation,
            },this);
        this.components = new EntityList<Component>({
            _id: "components",
            type: Component,
            },this);
        this.layers = new EntityList<Layer>({
            _id: "layers",
            type: Layer,
            },this);
        
        
        
        props?.configurations && (this.configurations = props.configurations);
        props?.datasets && (this.datasets = props.datasets);
        props?.calculations && (this.calculations = props.calculations);
        props?.components && (this.components = props.components);
        props?.layers && (this.layers = props.layers)
       
    }

    calculate = (): { [key: string]: string | number | (string | number)[]; } => {
        
        this.calculatedTree = {};
        // return this.calculateChildren(['configurations','datasets','calculations','components','layers'])
        const res = this.calculateChildren(['configurations'])
        return this.calculatedTree;
    }
    
}