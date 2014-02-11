/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 25/03/13
 * Time: 11:55
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.store.master.PemasokStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.master.TmPemasok',
    url: Ifuel.config.pemasokUrl,
    pagesize: 100,
    remoteSort: false
})