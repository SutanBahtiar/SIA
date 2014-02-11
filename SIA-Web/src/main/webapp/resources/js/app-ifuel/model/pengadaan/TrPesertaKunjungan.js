/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 1/31/13
 * Time: 8:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.pengadaan.TrPesertaKunjungan', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'hadir',
            type: 'boolean'
        },
        {
            name: 'keterangan',
            type: 'string'
        },
        {
            name: 'tmPerson'
        } ,
        {
            name: 'trKunjunganLapangan'
        }
    ]
});