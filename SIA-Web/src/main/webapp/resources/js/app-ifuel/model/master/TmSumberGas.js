Ext.define('Ifuel.model.master.TmSumberGas', {
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
            name: 'perkiraanVol',
            type: 'float'
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
            name: 'lokasi',
            type: 'string'
        },
        {
            name: 'jenisGas',
            type: 'string'
        }
    ]
});