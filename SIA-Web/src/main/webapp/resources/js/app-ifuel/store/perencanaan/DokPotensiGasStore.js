/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 2/6/13
 * Time: 8:48 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.store.perencanaan.DokPotensiGasStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.perencanaan.TrDokPotensiGas',
    url: Ifuel.config.dokPotensiGasUrl,
    remoteSort: false
});