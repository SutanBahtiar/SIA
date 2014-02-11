/**
 * Created with IntelliJ IDEA.
 * User: Adrian
 * Date: 06/02/13
 * Time: 13:29
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.perencanaan.TrStatusPotensiGasDto', {
    extend: 'Ifuel.model.BaseStatus',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'trPotensiGas'
        },
        {
            name: 'tmStatusKronologisChild'
        },
        {
            name: 'nomorPotensiGas',
            type:'string',
            mapping:'trPotensiGas.id'
        },
        {
            name: 'namaPemasok',
            type:'string',
            mapping:'trPotensiGas.tmPemasok.namaPemasok'
        },
        {
            name: 'namaSumberGas',
            type:'string',
            mapping:'trPotensiGas.tmSumberGas.namaSumberGas'
        },
        {
            name: 'lokasiSumberGas',
            type:'string',
            mapping:'trPotensiGas.tmSumberGas.lokasi'
        },
        {
            name: 'namaPltgm',
            type:'string',
            mapping:'trPotensiGas.tmPltgm.namaPltgm'
        },
        {
            name: 'lokasiPltgm',
            type:'string',
            mapping:'trPotensiGas.tmPltgm.namaLokasi'
        },
        {
            name: 'namaStatus',
            type:'string',
            mapping:'tmStatusKronologis.namaStatus'
        },
        {
            name: 'containAttachment',
            type:'boolean'
        }
    ]
});