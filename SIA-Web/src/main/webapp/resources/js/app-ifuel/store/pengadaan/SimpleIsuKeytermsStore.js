/**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/5/13
 * Time: 6:12 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.store.pengadaan.SimpleIsuKeytermsStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.dto.SimpleIsuKeyterms',
    url: Ifuel.config.isuKeytermsUrl + "/simple/",
    remoteSort: true
});