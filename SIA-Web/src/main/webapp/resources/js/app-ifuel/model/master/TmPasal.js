Ext.define('Ifuel.model.master.TmPasal', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'pasal',
            type: 'int'
        },
        {
            name: 'judulIndonesia',
            type: 'string'
        },
        {
            name: 'judulEnglish',
            type: 'string'
        }
    ]
});