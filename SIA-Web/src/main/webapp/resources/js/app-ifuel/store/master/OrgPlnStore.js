/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 09/04/13
 * Time: 16:42
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.store.master.OrgPlnStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.master.TmOrgPln',
    url: Ifuel.config.orgPlnUrl,
    pagesize: 100,
    remoteSort: false
})