/**
 * Created with IntelliJ IDEA.
 * User: latif
 * Date: 2/6/13
 * Time: 12:07 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.pengadaan.TrHargaGasPjbg', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'hargaGas',
            type: 'float'
        },
        {
            name: 'periodeAwal',
            type: 'date'
        },
        {
            name: 'periodeAkhir',
            type: 'date'
        },
        {
            name: 'trPjbg'
        }
    ]
});