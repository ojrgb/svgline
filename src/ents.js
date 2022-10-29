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
                _id: 'name',
                type: 'string'
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
        ]
    }
}