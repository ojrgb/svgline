export default {
    configurations: {
        _id: 'configuration',
        nameSingle: 'Configuration',
        namePlural: 'Configurations',
        attributes: [
            {
                _id: '_id',
                name: 'Identifier',
                type: 'identifier',
                mandatory: true,
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
                ],
                mandatory: true,
            },
            {
                _id: 'defaultValue',
                name: 'Default Value',
                type: 'string',
                mandatory: true,
            },
            {
                _id: 'sampleValue',
                name: 'Sample Value',
                type: 'string',
                mandatory: true,
            },
        ]
    },
    datasets: {
        _id: 'dataset',
        nameSingle: 'Dataset',
        namePlural: 'Datasets',
        attributes: [
            {
                _id: '_id',
                type: 'identifier',
                mandatory: true,
            }, 
            {
                _id: 'name',
                type: 'string',
                mandatory: true,
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
                type: 'identifier',
                mandatory: true,
            }, 
            {
                _id: 'formula',
                type: 'calculation',
                
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
                type: 'identifier',
                mandatory: true,
            }, 
            {
                _id: 'name',
                type: 'string',
                mandatory: true,
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
                defaultValue: [],
                visible: false,
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
                type: 'identifier',
                mandatory: true,
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
                ],
                mandatory: true,
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
                type: 'calculation',
                condition: props => props.type==='line',
            },
            {
                _id: 'y1',
                name: 'y1',
                type: 'calculation',
                condition: props => props.type==='line',
            },
            {
                _id: 'x2',
                name: 'x2',
                type: 'calculation',
                condition: props => props.type==='line',
            },
            {
                _id: 'y2',
                name: 'y2',
                type: 'calculation',
                condition: props => props.type==='line',
            },
            {
                _id: 'cx',
                name: 'Circle X',
                type: 'calculation',
                condition: props => props.type==='circle',
            },
            {
                _id: 'cy',
                name: 'Circle Y',
                type: 'calculation',
                condition: props => props.type==='circle',
            },
            {
                _id: 'r',
                name: 'Radius',
                type: 'calculation',
                condition: props => props.type==='circle',
            },
            
            {
                _id: 'x',
                name: 'x',
                type: 'calculation',
                condition: props => props.type==='rect',
            },
            {
                _id: 'y',
                name: 'y',
                type: 'calculation',
                condition: props => props.type==='rect',
            },
            {
                _id: 'rx',
                name: 'Round X',
                type: 'calculation',
                condition: props => props.type==='rect',
            },
            {
                _id: 'ry',
                name: 'Round Y',
                type: 'calculation',
                condition: props => props.type==='rect',
            },
            {
                _id: 'width',
                name: 'Width',
                type: 'calculation',
                condition: props => props.type==='rect',
            },
            {
                _id: 'height',
                name: 'Height',
                type: 'calculation',
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
                type: 'identifier',
                mandatory: true,
            }, 
            {
                _id: 'name',
                type: 'string',
                mandatory: true,
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
                mandatory: true,
            }
        ]
    }
}