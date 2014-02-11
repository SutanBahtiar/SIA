Ext.define('Ifuel.model.master.TmJalurPipa', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'noUrutPointer',
            type: 'int'
        },
        {
            name: 'latitude',
            type: 'string'
        },
        {
            name: 'longitude',
            type: 'string'
        },
        {
            name: 'tmPipaGas'
        }
    ]
});