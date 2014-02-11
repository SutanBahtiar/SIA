/**
 * Created with IntelliJ IDEA.
 * User: Latief
 * Date: 2/13/13
 * Time: 3:27 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.store.master.PasalStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.master.TmPasal',
    url: Ifuel.config.pasalUrl,
    remoteSort: false
});