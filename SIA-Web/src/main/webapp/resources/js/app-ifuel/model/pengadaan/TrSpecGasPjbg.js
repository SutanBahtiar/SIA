/**
 * Created with IntelliJ IDEA.
 * User: latif
 * Date: 2/9/13
 * Time: 10:39 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.pengadaan.TrSpecGasPjbg', {
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
            name: 'measurementUnit',
            type: 'string'
        },
        {
            name: 'minimumValue',
            type: 'float'
        },
        {
            name: 'maximumValue',
            type: 'float'
        },
        {
            name: 'trPjbg'
        }
    ]
});