Ext.define('Ifuel.model.master.TmPipaGas', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'namaPipa',
            type: 'string'
        },
        {
            name: 'panjangPipa',
            type: 'float'
        }
    ]
});