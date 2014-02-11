/**
 * Created with IntelliJ IDEA.
 * User: Adrian
 * Date: 06/02/13
 * Time: 12:50
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.perencanaan.TrRuptl', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'namaRuptl',
            type: 'string'
        },
        {
            name: 'tahunAwal',
            type: 'int'
        },
        {
            name: 'rencanaVolPasokan',
            type: 'float'
        },
        {
            name: 'tahunAkhir',
            type: 'int'
        },
        {
            name: 'status',
            type: 'string'
        }
    ]
});