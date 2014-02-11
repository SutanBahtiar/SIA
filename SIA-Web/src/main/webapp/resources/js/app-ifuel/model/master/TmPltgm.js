Ext.define('Ifuel.model.master.TmPltgm', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'namaPltgm',
            type: 'string'
        },
        {
            name: 'jenisPltgm',
            type: 'string'
        },
        {
            name: 'kapasitasProd',
            type: 'int'
        },
        {
            name: 'cod',
            type: 'boolean'
        },
        {
            name: 'tanggalCod',
            type: 'date'
        },
        {
            name: 'namaLokasi',
            type: 'string'
        },
        {
            name: 'namaGm',
            type: 'string'
        },
        {
            name: 'periodeAkhirGm',
            type: 'date'
        },
        {
            name: 'namaMbprod',
            type: 'string'
        },
        {
            name: 'periodeAkhirMbprod',
            type: 'date'
        } ,
        {
            name: 'namaDmkit',
            type: 'string'
        },
        {
            name: 'periodeAkhirDmkit',
            type: 'date'
        },
        {
            name: 'alamatPltgm',
            type: 'string'
        },
        {
            name: 'kotaPltgm',
            type: 'string'
        },
        {
            name: 'provinsiPltgm',
            type: 'string'
        },
        {
            name: 'kodePosPltgm',
            type: 'string'
        },
        {
            name: 'tmRegion'

        } ,
        {
            name: 'latitude',
            type: 'string'
        },
        {
            name: 'longitude',
            type: 'string'
        }

    ]
});