export default {
    configurations: {
        _id: 'configuration',
        nameSingle: 'Configuration',
        namePlural: 'Configurations',
        attributes: [
            {
                _id: '_id',
                name: 'Identifier',
                type: 'identifier'
            }, 
            {
                _id: 'name',
                name: 'Name',
                type: 'string'
            },
            {
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
                ]
            }
        ]
    },
    datasets: {
        _id: 'dataset',
        nameSingle: 'Dataset',
        namePlural: 'Datasets',
        attributes: [
            {
                _id: '_id',
                type: 'identifier'
            }, 
            {
                _id: 'name',
                type: 'string'
            },
        ]
    },
    calculations: {
        _id: 'calculation',
        nameSingle: 'Calculation',
        namePlural: 'Calculations',
        attributes: [
            {
                _id: '_id',
                type: 'identifier'
            }, 
            {
                _id: 'formula',
                type: 'calculation'
            },
        ]
    },
    components: {
        _id: 'component',
        nameSingle: 'Component',
        namePlural: 'Components',
        attributes: [
            {
                _id: '_id',
                type: 'identifier'
            }, 
            {
                _id: 'name',
                type: 'string'
            },
        ]
    },
    layers: {
        _id: 'layer',
        nameSingle: 'Layer',
        namePlural: 'Layers',
        attributes: [
            {
                _id: '_id',
                type: 'identifier'
            }, 
            {
                _id: 'name',
                type: 'string'
            },
            {
                _id: 'backgroundColor',
                type: 'color',
                immediate: true,
            },
            {
                _id: 'opacity',
                type: 'number',
                defaultValue: 100
            },
            {
                _id: 'elements',
                type: 'array',
                defaultValue: []
            }
        ]
    },
    elements: {
        _id: 'element',
        nameSingle: 'Element',
        namePlural: 'Elements',
        attributes: [
            {
                _id: '_id',
                type: 'identifier'
            }, 
            {
                _id: 'name',
                type: 'string'
            },
            {
                _id: 'type',
                type: 'list',
                immediate: true,
                options: [
                    {
                        _id: 'line',
                        name: 'Line',
                    },
                    {
                        _id: 'circle',
                        name: 'Circle',
                    },
                    {
                        _id: 'rect',
                        name: 'Rectangle',
                    },
                    {
                        _id: 'polygon',
                        name: 'Polygon',
                    },
                ]
            },
            {
                _id: 'stroke',
                name: 'Stroke',
                type: 'color',
                immediate: true,
                condition: props => (['polygon','rect','line','circle'].indexOf(props.type)>-1),
            },
            {
                _id: 'strokeWidth',
                name: 'Stroke width',
                type: 'string',
                condition: props => (['polygon','rect','line','circle'].indexOf(props.type)>-1),
            },
            {
                _id: 'fill',
                name: 'Fill',
                type: 'color',
                condition: props => (['polygon','rect','circle'].indexOf(props.type)>-1),
            },
            {
                _id: 'x1',
                name: 'x1',
                type: 'string',
                condition: props => props.type==='line',
            },
            {
                _id: 'y1',
                name: 'y1',
                type: 'string',
                condition: props => props.type==='line',
            },
            {
                _id: 'x2',
                name: 'x2',
                type: 'string',
                condition: props => props.type==='line',
            },
            {
                _id: 'y2',
                name: 'y2',
                type: 'string',
                condition: props => props.type==='line',
            },
            {
                _id: 'cx',
                name: 'Circle X',
                type: 'string',
                condition: props => props.type==='circle',
            },
            {
                _id: 'cy',
                name: 'Circle Y',
                type: 'string',
                condition: props => props.type==='circle',
            },
            {
                _id: 'r',
                name: 'Radius',
                type: 'string',
                condition: props => props.type==='circle',
            },
            
            {
                _id: 'x',
                name: 'x',
                type: 'string',
                condition: props => props.type==='rect',
            },
            {
                _id: 'y',
                name: 'y',
                type: 'string',
                condition: props => props.type==='rect',
            },
            {
                _id: 'rx',
                name: 'Round X',
                type: 'string',
                condition: props => props.type==='rect',
            },
            {
                _id: 'ry',
                name: 'Round Y',
                type: 'string',
                condition: props => props.type==='rect',
            },
            {
                _id: 'width',
                name: 'Width',
                type: 'string',
                condition: props => props.type==='rect',
            },
            {
                _id: 'height',
                name: 'Height',
                type: 'string',
                condition: props => props.type==='rect',
            },
        ]
    },
    parameters: {
        _id: 'parameter',
        nameSingle: 'Parameter',
        namePlural: 'Parameters',
        attributes: [
            {
                _id: '_id',
                type: 'identifier'
            }, 
            {
                _id: 'name',
                type: 'string'
            },
            {
                _id: 'ratio',
                type: 'list',
                options: [{
                    _id:'1-1',
                    name: '1:1'
                },{
                    _id:'4-3',
                    name: '4:3'
                }],
                
            }
        ]
    }
}