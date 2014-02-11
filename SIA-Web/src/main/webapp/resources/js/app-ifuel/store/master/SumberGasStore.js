/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 11/04/13
 * Time: 9:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.store.master.SumberGasStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.master.TmSumberGas',
    url: Ifuel.config.sumberGasUrl,
    pagesize: 100,
    remoteSort: false
})