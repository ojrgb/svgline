import { BsGearFill } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import Entity from "./Entity";

@Entity.Configure({
    nameSingle: 'Element',
    namePlural: 'Elements',
    shortName: 'elem',
    formAttributes: ['_id','name', 'type','source','text', 'stroke', 'x', 'y', 'strokeWidth', 'fill', 'opacity',  'width', 'height', 'r', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'rx', 'ry','dx',
    'dy','rotate','fontFamily','fontSize','letterSpacing','wordSpacing','textDecoration','textLength','transform'],
    icon: BsGearFill,
    inherited: true
})
export default class Element extends Entity {
    name: Attribute = this.newAttribute({
        _id: 'name',
        name: 'Name',
        type: 'string',
        mandatory: true,
    });
    type: Attribute = this.newAttribute({
        _id: 'type',
        name: 'Type',
        type: 'list',
        options: [

                { _id: 'polygon', name: 'Polygon' },
                { _id: 'rect', name: 'Rectangle' },
                { _id: 'line', name: 'Line' },
                { _id: 'circle', name: 'Circle' },
                { _id: 'text', name: 'Text' },
                { _id: 'image', name: 'Image' },

        ],
        mandatory: true,
    });
    source: Attribute = this.newAttribute({
        _id: 'source',
        name: 'Source',
        type: 'asset',
        mandatory: true,
        conditions: props => (['image'].indexOf(props.type)>-1)
    });
    stroke: Attribute = this.newAttribute({
        _id: 'stroke',
        name: 'Stroke',
        type: 'color',
        mandatory: true,
        conditions: props => (['polygon','rect','line','circle','text'].indexOf(props.type)>-1)
    });
    strokeWidth: Attribute = this.newAttribute({
        _id: 'strokeWidth',
        name: 'Stroke Width',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['polygon','rect','line','circle','text'].indexOf(props.type)>-1)
    });
    fill: Attribute = this.newAttribute({
        _id: 'fill',
        name: 'Fill',
        type: 'color',
        mandatory: true,
        conditions: props => (['polygon','rect','circle','text'].indexOf(props.type)>-1)
    });
    opacity: Attribute = this.newAttribute({
        _id: 'opacity',
        name: 'Opacity',
        type: 'calculation',
        mandatory: true,

    });
    x: Attribute = this.newAttribute({
        _id: 'x',
        name: 'X',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['polygon','rect','circle','text'].indexOf(props.type)>-1)
    });
    y: Attribute = this.newAttribute({
        _id: 'y',
        name: 'Y',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['polygon','rect','circle','text'].indexOf(props.type)>-1)
    });
    width: Attribute = this.newAttribute({
        _id: 'width',
        name: 'Width',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['polygon','rect','circle'].indexOf(props.type)>-1)
    });
    height: Attribute = this.newAttribute({
        _id: 'height',
        name: 'Height',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['polygon','rect','circle'].indexOf(props.type)>-1)
    });
    r: Attribute = this.newAttribute({
        _id: 'r',
        name: 'Radius',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['circle'].indexOf(props.type)>-1)
    });
    x1: Attribute = this.newAttribute({
        _id: 'x1',
        name: 'x1',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['line'].indexOf(props.type)>-1)
    });
    y1: Attribute = this.newAttribute({
        _id: 'y1',
        name: 'y1',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['line'].indexOf(props.type)>-1)
    });
    x2: Attribute = this.newAttribute({
        _id: 'x2',
        name: 'x2',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['line'].indexOf(props.type)>-1)
    });
    y2: Attribute = this.newAttribute({
        _id: 'y2',
        name: 'y2',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['line'].indexOf(props.type)>-1)
    });
    cx: Attribute = this.newAttribute({
        _id: 'cx',
        name: 'Circle X',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['circle'].indexOf(props.type)>-1)
    });
    cy: Attribute = this.newAttribute({
        _id: 'cy',
        name: 'Circle Y',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['circle'].indexOf(props.type)>-1)
    });
    rx: Attribute = this.newAttribute({
        _id: 'rx',
        name: 'Round X',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['rect'].indexOf(props.type)>-1)
    });
    ry: Attribute = this.newAttribute({
        _id: 'ry',
        name: 'Round Y',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['rect'].indexOf(props.type)>-1)
    });
    
    // Text Attributes below

    dx: Attribute = this.newAttribute({
        _id: 'dx',
        name: 'Delta X',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['text'].indexOf(props.type)>-1)
    });
    dy: Attribute = this.newAttribute({
        _id: 'cy',
        name: 'Delta Y',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['text'].indexOf(props.type)>-1)
    });
    rotate: Attribute = this.newAttribute({
        _id: 'rotate',
        name: 'Rotate',
        type: 'calculation',
        mandatory: false,
        conditions: props => (['text'].indexOf(props.type)>-1)
    });
    text: Attribute = this.newAttribute({
        _id: 'text',
        name: 'Text',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['text'].indexOf(props.type)>-1)
    });
    fontFamily: Attribute = this.newAttribute({ _id: 'fontFamily', name: 'Font Family', type: 'list', options: [ { _id: 'Arial', name: 'Arial' }, { _id: 'Times New Roman', name: 'Times New Roman' }, { _id: 'Verdana', name: 'Verdana' }, { _id: 'Courier New', name: 'Courier New' }, { _id: 'Helvetica', name: 'Helvetica' } ], mandatory: true, conditions: props => (['text'].indexOf(props.type) > -1) });
    fontSize: Attribute = this.newAttribute({ _id: 'fontSize', name: 'Font Size', type: 'calculation', mandatory: true, conditions: props => (['text'].indexOf(props.type) > -1) });
    letterSpacing: Attribute = this.newAttribute({
        _id: 'letterSpacing',
        name: 'Letter Spacing',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['text'].indexOf(props.type)>-1)
    });
    wordSpacing: Attribute = this.newAttribute({
        _id: 'wordSpacing',
        name: 'Word Spacing',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['text'].indexOf(props.type)>-1)
    });
    textDecoration: Attribute = this.newAttribute({
        _id: 'textDecoration',
        name: 'Text Decoration',
        type: 'list',
        options: [
            { _id: 'none', name: 'None' },
            { _id: 'underline', name: 'Underline' },
            { _id: 'overline', name: 'Overline' },
            { _id: 'line-through', name: 'Line Through' },
            { _id: 'blink', name: 'Blink' }
        ],
        mandatory: true,
        conditions: props => (['text'].indexOf(props.type)>-1)
    });
    transform: Attribute = this.newAttribute({
        _id: 'transform',
        name: 'Transform',
        type: 'calculation',
        mandatory: false,
    });
    textLength: Attribute = this.newAttribute({
        _id: 'textLength',
        name: 'Text Length',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['text'].indexOf(props.type)>-1)
    });

    // Constructor

    constructor(props: {
        _id: string, 
        type?: 'polygon' | 'rect' | 'line' | 'circle' | 'text',
        stroke?: string,
        strokeWidth?: string,
        fill?: string,
        opacity?: string,
        x?: string,
        y?: string,
        width?: string,
        height?: string,
        r?: string,
        x1?: string,
        y1?: string,
        x2?: string,
        y2?: string,
        cx?: string,
        cy?: string,
        rx?: string,
        ry?: string,
        text?: string
    }, parent: Entity) {
        super({_id: props._id},parent);
        this.autoAssignProps(props);
    }

    static getInherited = () => {
        return true;
    }

    calculate: () => void = () => {
        
        super.calculate()
    }
}