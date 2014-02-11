Ext.define('Ifuel.model.master.TmStatusKronologis', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'namaStatus',
            type: 'string'
        },
        {
            name: 'changeable',
            type: 'boolean'
        },
        {
            name: 'parent'
        },
        {
            name: 'children'
        },
        {
            name: 'tmKronologis'
        }
    ]
});