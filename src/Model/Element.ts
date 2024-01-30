import { BsGearFill } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import Entity from "./Entity";

@Entity.Configure({
    nameSingle: 'Element',
    namePlural: 'Elements',
    shortName: 'elem',
    formAttributes: ['_id','name', 'type', 'stroke', 'strokeWidth', 'fill', 'opacity', 'x', 'y', 'width', 'height', 'r', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'rx', 'ry', 'text'],
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
                { _id: 'text', name: 'Text' }

        ],
        mandatory: true,
    });
    stroke: Attribute = this.newAttribute({
        _id: 'stroke',
        name: 'Stroke',
        type: 'color',
        mandatory: true,
        conditions: props => (['polygon','rect','line','circle'].indexOf(props.type)>-1)
    });
    strokeWidth: Attribute = this.newAttribute({
        _id: 'strokeWidth',
        name: 'Stroke Width',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['polygon','rect','line','circle'].indexOf(props.type)>-1)
    });
    fill: Attribute = this.newAttribute({
        _id: 'fill',
        name: 'Fill',
        type: 'color',
        mandatory: true,
        conditions: props => (['polygon','rect','circle'].indexOf(props.type)>-1)
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
        conditions: props => (['polygon','rect','circle'].indexOf(props.type)>-1)
    });
    y: Attribute = this.newAttribute({
        _id: 'y',
        name: 'Y',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['polygon','rect','circle'].indexOf(props.type)>-1)
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
    text: Attribute = this.newAttribute({
        _id: 'text',
        name: 'Text',
        type: 'calculation',
        mandatory: true,
        conditions: props => (['text'].indexOf(props.type)>-1)
    });

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
        this.type.value = props.type;
        this.stroke.value = props.stroke;
        this.strokeWidth.value = props.strokeWidth;
        this.fill.value = props.fill;
        this.opacity.value = props.opacity;
        this.x.value = props.x;
        this.y.value = props.y;
        this.width.value = props.width;
        this.height.value = props.height;
        this.r.value = props.r;
        this.x1.value = props.x1;
        this.y1.value = props.y1;
        this.x2.value = props.x2;
        this.y2.value = props.y2;
        this.cx.value = props.cx;
        this.cy.value = props.cy;
        this.rx.value = props.rx;
        this.ry.value = props.ry;
        this.text.value = props.text;
    }

    static getInherited = () => {
        return true;
    }

    calculate: () => void = () => {
        
        super.calculate()
    }
}