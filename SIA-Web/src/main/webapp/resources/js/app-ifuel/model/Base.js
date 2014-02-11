Ext.define('Ifuel.model.Base', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'createdBy',
            type: 'string'
        },
        {
            name: 'changedBy',
            type: 'string'
        },
        {
            name: 'createdAt',
            type: 'date'
        },
        {
            name: 'changedAt',
            type: 'date'
        },
        {
            name: 'entity',
            type: 'string'
        }

    ]
});