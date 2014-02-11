/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 2/6/13
 * Time: 1:25 PM
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
            name: 'noAmandemen',
            type: 'string'
        },
        {
            name: 'tglKronologi',
            type: 'date'
        },
        {
            name: 'jenisKronologi',
            type: 'string'
        },
        {
            name: 'risalahKronologi',
            type: 'string'
        },
        {
            name: 'dokLampiran',
            type: 'string'
        },
        {
            name: 'pembahasanIsuKt',
            type: 'string'
        },
        {
            name:'trPjbg'
        }
    ]
});
