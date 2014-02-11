Ext.define('Ifuel.model.master.TmRiwayatPasal', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'tmPasal'
        },
        {
            name: 'textIndonesia',
            type: 'string'
        },
        {
            name: 'textEnglish',
            type: 'string'
        }
    ]
});