/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 2/9/13
 * Time: 10:37 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.pengendalian.TrSpecGasComm', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'atributSpec',
            type: 'string'
        },
        {
            name: 'specGasRencana',
            type: 'string'
        },
        {
            name: 'specGasRealisasi',
            type: 'string'
        },
        {
            name: 'trCommissioning'
        }
    ]


});