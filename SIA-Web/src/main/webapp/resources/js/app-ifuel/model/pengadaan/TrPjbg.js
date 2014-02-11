/**
 * Created with IntelliJ IDEA.
 * User: latif
 * Date: 2/9/13
 * Time: 8:46 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.pengadaan.TrPjbg', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'nomor',
            type: 'string'
        },
        {
            name: 'judul',
            type: 'string'
        },
        {
            name: 'tanggalPersetujuan',
            type: 'date'
        },
        {
            name: 'tanggalMulai',
            type: 'date'
        },
        {
            name: 'tanggalBerakhir',
            type: 'date'
        },
        {
            name: 'jenisGas',
            type: 'string'
        },
        {
            name: 'jenisKontrakPjbg',
            type: 'string'
        },
        {
            name: 'volumeTotal',
            type: 'float'
        },
        {
            name: 'volumeSisa',
            type: 'float'
        },
        {
            name: 'trMou'
        },
        {
            name: 'statusPjbgSet'
        },
        {
            name: 'nomorMou',
            type:'string',
            mapping:'trMou.nomor'
        },
        {
            name: 'namaPemasok',
            type:'string',
            mapping:'trMou.trPotensiGas.tmPemasok.namaPemasok'
        },
        {
            name: 'namaSumberGas',
            type:'string',
            mapping:'trMou.trPotensiGas.tmSumberGas.namaSumberGas'
        },
        {
            name: 'namaPltgm',
            type:'string',
            mapping:'trMou.trPotensiGas.tmPltgm.namaPltgm'
        }
    ]
});