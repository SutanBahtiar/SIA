Ext.define('Ifuel.model.pengadaan.TrSimplePasalPjbg', {
    extend: 'Ifuel.model.master.TmSimplePasal',

    fields: [
        {
            name: 'pasalPjbgId',
            type: 'int'
        },
        {
            name: 'trPjbg'
        },
        {
            name: 'trIsuKeyterms'
        }
    ]
});