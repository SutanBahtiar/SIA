/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 2/6/13
 * Time: 11:59 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.pengendalian.TrCommissioning', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'noComm',
            type: 'string'
        },
        {
            name: 'iterasiComm',
            type: 'int'
        },
        {
            name: 'tglAwalComm',
            type: 'date'
        },
        {
            name: 'tglAkhirComm',
            type: 'date'
        },
        {
            name: 'volumeTotalComm',
            type: 'float'
        },
        {
            name: 'statusComm',
            type: 'string'
        },
        {
            name: 'tglStatusComm',
            type: 'date'
        },
        {
            name: 'trPjbg'
        }
    ]
});