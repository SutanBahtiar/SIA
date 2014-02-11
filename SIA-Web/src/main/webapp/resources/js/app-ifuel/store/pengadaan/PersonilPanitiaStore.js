/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/1/13
 * Time: 10:45 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.store.pengadaan.PersonilPanitiaStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.pengadaan.TrPersonilPanitia',
    url: Ifuel.config.personilPanitiaUrl,
    remoteSort: true
});