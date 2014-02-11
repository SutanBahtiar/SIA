/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/6/13
 * Time: 4:51 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.pengadaan.TrDokKunjLap', {
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
            name:'nama',
            type:'string'
        },
        {
            name:'keterangan',
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
            name:'trKunjunganLapangan'
        },
        {
            name:'contentType',
            type:'string'
        }
    ]
});