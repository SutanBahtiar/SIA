/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 2/9/13
 * Time: 11:11 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.pengendalian.TrVolCommissioning', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'tglCommissioning',
            type: 'date'
        },
        {
            name: 'volRencana',
            type: 'float'
        },
        {
            name: 'volRealisasi',
            type: 'float'
        },
        {
            name: 'trCommissioning'
        }
    ]


});