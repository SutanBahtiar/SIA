/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 2/12/13
 * Time: 7:44 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.BaseStatus', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'tmStatusKronologis'
        },
        {
            name: 'changeStatusDate',
            type: 'date'
        },
        {
            name: 'changeStatusBy',
            type: 'string'
        },
        {
            name: 'keterangan',
            type: 'string'
        }
    ]
});