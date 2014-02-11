/**
 * Created with IntelliJ IDEA.
 * User: Latief
 * Date: 2/6/13
 * Time: 4:51 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.master.TmDocument', {
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
            name:'contentType',
            type:'string'
        }
    ]
});