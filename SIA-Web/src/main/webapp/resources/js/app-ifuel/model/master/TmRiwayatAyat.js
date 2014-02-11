Ext.define('Ifuel.model.master.TmRiwayatAyat', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'tmAyat'
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