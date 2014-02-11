/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 2/7/13
 * Time: 4:54 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.store.master.StatusKronologisStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.master.TmStatusKronologis',
    url: Ifuel.config.statusKronologisUrl,
    remoteSort: false
});