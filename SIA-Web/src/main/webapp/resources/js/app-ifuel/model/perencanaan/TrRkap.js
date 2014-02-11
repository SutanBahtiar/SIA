/**
 * Created with IntelliJ IDEA.
 * User: Adrian
 * Date: 06/02/13
 * Time: 12:10
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.perencanaan.TrRkap', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'tahun',
            type: 'int'
        },
        {
            name: 'trRuptl'
        },
        {
            name: 'deskripsi',
            type: 'string'
        },
        {
            name: 'status',
            type: 'string'
        }
    ]
});