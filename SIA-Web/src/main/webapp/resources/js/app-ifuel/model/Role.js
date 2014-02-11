Ext.define('Ifuel.model.Role', {
    extend: 'Ifuel.model.Base',

    fields: [

        {
            name: 'authority',
            type: 'string'
        }
    ],
    validations: [
        {type: 'presence', field: 'authority'}
    ]
});