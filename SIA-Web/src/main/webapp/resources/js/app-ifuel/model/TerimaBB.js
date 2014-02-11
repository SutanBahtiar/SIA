Ext.define('Ifuel.model.TerimaBB', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'lokasi'
        },
        {
            name: 'tahun',
            type: 'int'
        },
        {
            name: 'time',
            type: 'date'
        },
        {
            name: 'vehicleNo',
            type: 'string'
        },
        {
            name: 'tonage',
            type: 'float'
        },
        {
            name: 'bargeLoading',
            type: 'float'
        },
        {
            name: 'loses',
            type: 'float'
        },
        {
            name: 'manualAdjust',
            type: 'float'
        },
        {
            name: 'deskripsi',
            type: 'string'
        }
    ]
});