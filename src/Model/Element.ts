import Attribute from "./Attribute";
import Entity from "./Entity";

export default class Element extends Entity {
    type: Attribute = new Attribute({
        _id: 'type',
        name: 'Type',
        type: 'list',
        options: [
            {
                _id: 'number',
                name: 'Number'
            },
            {
                _id: 'color',
                name: 'Color'
            }
        ],
        mandatory: true,
    });
    stroke: Attribute = new Attribute({
        _id: 'stroke',
        name: 'Stroke',
        type: 'color',
        mandatory: true,
        conditions: props => (['polygon','rect','line','circle'].indexOf(props.type)>-1)
    });
    strokeWidth: Attribute = new Attribute({
        _id: 'strokeWidth',
        name: 'Stroke Width',
        type: 'number',
        mandatory: true,
        conditions: props => (['polygon','rect','line','circle'].indexOf(props.type)>-1)
    });
    fill: Attribute = new Attribute({
        _id: 'fill',
        name: 'Fill',
        type: 'color',
        mandatory: true,
        conditions: props => (['polygon','rect','circle'].indexOf(props.type)>-1)
    });
    opacity: Attribute = new Attribute({
        _id: 'opacity',
        name: 'Opacity',
        type: 'number',
        mandatory: true,

    });
    x: Attribute = new Attribute({
        _id: 'x',
        name: 'X',
        type: 'number',
        mandatory: true,
        conditions: props => (['polygon','rect','circle'].indexOf(props.type)>-1)
    });
    y: Attribute = new Attribute({
        _id: 'y',
        name: 'Y',
        type: 'number',
        mandatory: true,
        conditions: props => (['polygon','rect','circle'].indexOf(props.type)>-1)
    });
    width: Attribute = new Attribute({
        _id: 'width',
        name: 'Width',
        type: 'number',
        mandatory: true,
        conditions: props => (['polygon','rect','circle'].indexOf(props.type)>-1)
    });
    height: Attribute = new Attribute({
        _id: 'height',
        name: 'Height',
        type: 'number',
        mandatory: true,
        conditions: props => (['polygon','rect','circle'].indexOf(props.type)>-1)
    });
    radius: Attribute = new Attribute({
        _id: 'radius',
        name: 'Radius',
        type: 'number',
        mandatory: true,
        conditions: props => (['circle'].indexOf(props.type)>-1)
    });
    x1: Attribute = new Attribute({
        _id: 'x1',
        name: 'x1',
        type: 'number',
        mandatory: true,
        conditions: props => (['line'].indexOf(props.type)>-1)
    });
    y1: Attribute = new Attribute({
        _id: 'y1',
        name: 'y1',
        type: 'number',
        mandatory: true,
        conditions: props => (['line'].indexOf(props.type)>-1)
    });
    x2: Attribute = new Attribute({
        _id: 'x2',
        name: 'x2',
        type: 'number',
        mandatory: true,
        conditions: props => (['line'].indexOf(props.type)>-1)
    });
    y2: Attribute = new Attribute({
        _id: 'y2',
        name: 'y2',
        type: 'number',
        mandatory: true,
        conditions: props => (['line'].indexOf(props.type)>-1)
    });
    cx: Attribute = new Attribute({
        _id: 'cx',
        name: 'Circle X',
        type: 'number',
        mandatory: true,
        conditions: props => (['circle'].indexOf(props.type)>-1)
    });
    cy: Attribute = new Attribute({
        _id: 'cy',
        name: 'Circle Y',
        type: 'number',
        mandatory: true,
        conditions: props => (['circle'].indexOf(props.type)>-1)
    });
    rx: Attribute = new Attribute({
        _id: 'rx',
        name: 'Round X',
        type: 'number',
        mandatory: true,
        conditions: props => (['rect'].indexOf(props.type)>-1)
    });
    ry: Attribute = new Attribute({
        _id: 'ry',
        name: 'Round Y',
        type: 'number',
        mandatory: true,
        conditions: props => (['rect'].indexOf(props.type)>-1)
    });
    text: Attribute = new Attribute({
        _id: 'text',
        name: 'Text',
        type: 'string',
        mandatory: true,
        conditions: props => (['text'].indexOf(props.type)>-1)
    });

    constructor(props: {
        _id: string, 
        parent?: Element, 
        type: 'polygon' | 'rect' | 'line' | 'circle' | 'text',
        stroke?: string,
        strokeWidth?: string,
        fill?: string,
        opacity?: string,
        x?: string,
        y?: string,
        width?: string,
        height?: string,
        radius?: string,
        x1?: string,
        y1?: string,
        x2?: string,
        y2?: string,
        cx?: string,
        cy?: string,
        rx?: string,
        ry?: string,
        text?: string
    }) {
        super(props._id,props.parent);
        this.type.value = props.type;
        this.stroke.value = props.stroke;
        this.strokeWidth.value = props.strokeWidth;
        this.fill.value = props.fill;
        this.opacity.value = props.opacity;
        this.x.value = props.x;
        this.y.value = props.y;
        this.width.value = props.width;
        this.height.value = props.height;
        this.radius.value = props.radius;
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
}