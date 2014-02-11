Ext.define('Ifuel.model.SumberGas', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'namaSumberGas',
            type: 'string'
        },
        {
            name: 'jenisGas',
            type: 'string'
        },
        {
            name: 'perkiraanVol',
            type: 'int'
        },
        {
            name: 'latitude',
            type: 'float'
        },
        {
            name: 'longitude',
            type: 'float'
        }

    ]
});