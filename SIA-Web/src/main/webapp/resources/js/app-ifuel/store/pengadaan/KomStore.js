/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/5/13
 * Time: 6:12 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.store.pengadaan.KomStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.pengadaan.TrKom',
    url: Ifuel.config.komUrl,
    remoteSort: true
});