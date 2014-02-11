Ext.define('Ifuel.model.ActivityLog', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'userAction',
            type: 'string'
        },
        {
            name: 'createdAt',
            type: 'date'
        }
    ]
});