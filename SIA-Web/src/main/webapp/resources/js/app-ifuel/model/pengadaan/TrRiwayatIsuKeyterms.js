/**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/6/13
 * Time: 3:54 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.pengadaan.TrRiwayatIsuKeyterms', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'kesepakatanPln',
            type: 'string'
        },
        {
            name: 'kesepakatanPemasok',
            type: 'string'
        },
        {
            name: 'kesepakatanLainnya',
            type: 'string'
        },
        {
            name: 'trIsuKeyterms'
        }
    ]
});