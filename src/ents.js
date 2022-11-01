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
                type: 'color'
            },
            {
                _id: 'opacity',
                type: 'number',
                defaultValue: 100
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
                type: 'select',
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