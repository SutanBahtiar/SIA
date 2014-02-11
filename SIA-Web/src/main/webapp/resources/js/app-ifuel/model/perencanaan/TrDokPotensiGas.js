/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 1/31/13
 * Time: 10:27 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.perencanaan.TrDokPotensiGas', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'noDokumen',
            type: 'string'
        },
        {
            name: 'keterangan',
            type: 'string'
        },
        {
            name: 'dokumen',
            type: 'string'
        },
        {
            name: 'uploadDate',
            type: 'date'
        },
        {
            name: 'uploadBy',
            type: 'string'
        },
        {
            name: 'jenisFile',
            type: 'string'
        },
        {
            name: 'trPotensiGas'
        },
        {
            name: 'tmJenisDokumen'
        }
    ]
});