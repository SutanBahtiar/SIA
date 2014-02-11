/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/5/13
 * Time: 4:47 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.pengadaan.TrSkPanitia', {
    extend:'Ifuel.model.Base',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'nomor',
            type:'string'
        },
        {
            name:'status',
            type:'string'
        },
        {
            name:'dokumen',
            type:'string'
        },
        {
            name:'uploadDate',
            type:'date'
        },
        {
            name:'uploadBy',
            type:'string'
        },
        {
            name:'contentType',
            type:'string'
        },
        {
            name:'trPotensiGas'
        },
        {
            name:'personilPanitiaSet'
        },
        {
            name:'nomorPotensiGas',
            type:'string',
            mapping:'trPotensiGas.id'
        },
        {
            name:'namaPemasok',
            type:'string',
            mapping:'trPotensiGas.tmPemasok.namaPemasok'
        },
        {
            name:'namaSumberGas',
            type:'string',
            mapping:'trPotensiGas.tmSumberGas.namaSumberGas'
        },
        {
            name:'namaPltgm',
            type:'string',
            mapping:'trPotensiGas.tmPltgm.namaPltgm'
        },
        {
            name:'jumlahPanitia',
            type:'string',
            mapping:'personilPanitiaSet.length'
        }
    ]
});