/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 2/13/13
 * Time: 3:27 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.store.master.JenisDokumenStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.master.TmJenisDokumen',
    url: Ifuel.config.jenisDokumenUrl,
    remoteSort: false
});