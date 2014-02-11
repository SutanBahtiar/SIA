/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/1/13
 * Time: 10:57 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.pengadaan.TrPesertaKom', {
    extend:'Ifuel.model.Base',

    fields:[
        {
            name:'id',
            type: 'int'
        },
        {
            name:'hadir',
            type:'boolean'

        } ,
        {
            name:'keterangan',
            type: 'string'

        },
        {
            name:'tmPerson'
        },
        {
            name:'trKom'
        }
    ]
});