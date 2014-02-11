Ext.define('Ifuel.model.master.TmSimplePasal', {
    extend: 'Ifuel.model.master.TmPasal',

    fields: [
        {
            name: 'riwayatPasalId',
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