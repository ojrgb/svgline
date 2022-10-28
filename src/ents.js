export default {
    configurations: {
        _id: 'configuration',
        nameSingle: 'Configuration',
        namePlural: 'Configurations',
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
    }
}