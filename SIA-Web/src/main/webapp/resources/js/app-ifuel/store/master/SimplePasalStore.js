/**
 * Created with IntelliJ IDEA.
 * User: Latief
 * Date: 2/13/13
 * Time: 3:27 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.store.master.SimplePasalStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.master.TmSimplePasal',
    url: Ifuel.config.pasalUrl + "simple/",
    remoteSort: false
});