/**
 * Created with IntelliJ IDEA.
 * User: Adrian
 * Date: 06/02/13
 * Time: 12:32
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.model.perencanaan.TrRkapUnit', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'unitPltgm',
            type: 'string'
        },
        {
            name: 'namaPemasok',
            type: 'string'
        },
        {
            name: 'volGasYangDibutuhkan',
            type: 'float'
        },
        {
            name: 'volGasYangDiminta',
            type: 'float'
        },
        {
            name: 'volGasYangDikirim',
            type: 'float'
        },
        {
            name: 'cf',
            type: 'float'
        },
        {
            name: 'sfc',
            type: 'float'
        },
        {
            name: 'trRkap'
        },
        {
            name: 'tmPltgm'
        }
    ]
});