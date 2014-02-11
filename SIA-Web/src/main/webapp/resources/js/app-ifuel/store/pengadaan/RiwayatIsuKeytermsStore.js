/**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/5/13
 * Time: 6:12 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.store.pengadaan.RiwayatIsuKeytermsStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.pengadaan.TrRiwayatIsuKeyterms',
    url: Ifuel.config.riwayatIsuKeytermsUrl,
    remoteSort: true
});