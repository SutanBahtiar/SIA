/**
 * Created with IntelliJ IDEA.
 * User: Adrian
 * Date: 06/02/13
 * Time: 12:56
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.perencanaan.TrRuptlPemasok', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'tahunPeriode',
            type: 'int'
        },
        {
            name: 'pembangkit',
            type: 'float'
        },
        {
            name: 'pemasok',
            type: 'float'
        },
        {
            name: 'perkPasokan',
            type: 'float'
        },
        {
            name: 'trRuptl'
        },
        {
            name: 'tmPemasok'
        },
        {
            name: 'tmPltgm'
        }
    ]
});