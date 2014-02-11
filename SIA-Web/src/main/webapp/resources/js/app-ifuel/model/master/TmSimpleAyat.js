Ext.define('Ifuel.model.master.TmSimpleAyat', {
    extend: 'Ifuel.model.master.TmAyat',

    fields: [
        {
            name: 'riwayatAyatId',
            type: 'int'
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