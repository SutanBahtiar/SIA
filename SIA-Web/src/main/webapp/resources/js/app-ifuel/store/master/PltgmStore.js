/**
 * Created with IntelliJ IDEA.
 * User: BayuFrioGS
 * Date: 08/05/13
 * Time: 15:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.store.master.PltgmStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.master.TmPltgm',
    url: Ifuel.config.pltgmUrl,
    pageSize: 25,
    remoteSort: false
});