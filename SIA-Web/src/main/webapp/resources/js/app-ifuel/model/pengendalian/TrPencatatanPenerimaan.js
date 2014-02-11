/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 2/9/13
 * Time: 8:44 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.pengendalian.TrPencatatanPenerimaan', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'noNominasi',
            type: 'string'
        },
        {
            name: 'tglPenerimaan',
            type: 'date'
        },
        {
            name: 'jmlVolume',
            type: 'float'
        },
        {
            name: 'trPjbg'
        }
    ]


});