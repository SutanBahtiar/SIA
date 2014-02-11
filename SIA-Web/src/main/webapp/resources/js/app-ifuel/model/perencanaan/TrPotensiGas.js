/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 1/16/13
 * Time: 3:28 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.perencanaan.TrPotensiGas', {
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
            name: 'lokasiSumberGas',
            type: 'string'
        },
        {
            name: 'jenisGas',
            type: 'string'
        },
        {
            name: 'perkiraanVolGas',
            type: 'float'
        },
        {
            name: 'persentaseDistGas',
            type: 'float'
        },
        {
            name: 'statusOps',
            type: 'boolean'
        },
        {
            name: 'alamatSumberGas',
            type: 'string'
        },
        {
            name: 'statusPotensiGas',
            type: 'string'
        },
        {
            name: 'tglAkhirKunjungan',
            type: 'date'
        },
        {
            name: 'statusKunjungan',
            type: 'string'
        },
        {
            name: 'tglAkhirDokumen',
            type: 'date'
        },
        {
            name: 'dokTerakhir',
            type: 'string'
        },
        {
            name: 'tglAkhirSk',
            type: 'date'
        },
        {
            name: 'statusSk',
            type: 'string'
        },
        {
            name: 'tglAkhirKom',
            type: 'date'
        },
        {
            name: 'statusKom',
            type: 'string'
        },
        {
            name: 'tglAkhirMou',
            type: 'date'
        },
        {
            name: 'statusMou',
            type: 'string'
        },
        {
            name: 'tglAkhirKthoa',
            type: 'date'
        },
        {
            name: 'statusKthoa',
            type: 'string'
        },
        {
            name: 'tglAkhirhoa',
            type: 'date'
        },
        {
            name: 'statushoa',
            type: 'string'
        },
        {
            name: 'tglAkhirktpjbg',
            type: 'date'
        },
        {
            name: 'statusKtpjbg',
            type: 'string'
        },
        {
            name: 'tglAkhirPjbg',
            type: 'date'
        },
        {
            name: 'statusPjbg',
            type: 'string'
        },
        {
            name: 'tglGasin',
            type: 'date'
        },
        {
            name: 'tmPemasok'

        },
        {
            name: 'tmPltgm'
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
            name: 'tmSumberGas'

        },
        {
            name: 'tmStatusKronologis'

        }

    ]
});