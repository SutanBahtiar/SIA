/**
 * Created with IntelliJ IDEA.
 * User: Adrian
 * Date: 06/02/13
 * Time: 13:08
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.perencanaan.TrRuptlPeriode', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'region',
            type: 'string'
        },
        {
            name: 'tahunPeriode',
            type: 'int'
        },
        {
            name: 'kebutuhanListrik',
            type: 'float'
        },
        {
            name: 'trRuptl'
        },
        {
            name: 'tmRegion'
        }
    ]
});