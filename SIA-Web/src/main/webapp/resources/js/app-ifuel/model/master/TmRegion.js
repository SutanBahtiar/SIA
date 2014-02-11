/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 1/16/13
 * Time: 10:24 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.master.TmRegion', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'wilayah',
            type: 'string'
        },
        {
            name: 'region',
            type: 'string'
        }
    ]
});