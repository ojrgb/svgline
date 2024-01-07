import Attribute from "./Attribute";
import Entity from "./Entity";

export default class Element extends Entity {
    _id: number;
    parent: Element;
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

    constructor(_id: number, parent?: Element) {
        super(_id,parent);
        
    }
}