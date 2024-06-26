Ext.define('Ifuel.model.Group', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'nama',
            type: 'string'
        },
        {
            name: 'deskripsi',
            type: 'string'
        } ,
        {
            name: 'enabled',
            type: 'boolean',
            defaultValue: true
        } ,
        {
            name: 'roles'
        }
    ],
    validations: [
        {type: 'presence', field: 'nama'}
    ]
});