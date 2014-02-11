/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 2/9/13
 * Time: 8:23 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.pengendalian.TrKronologiAmandemen', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'volNominasi',
            type: 'float'
        },
        {
            name: 'periodeNominasi',
            type: 'date'
        },
        {
            name: 'tipeNominasi',
            type: 'string'
        },
        {
            name: 'trPjbg'
        },
        {
            name: 'parent'
        },
        {
            name: 'children'
        }
    ]


});
