/**
 * Created with IntelliJ IDEA.
 * User: Latief
 * Date: 1/31/13
 * Time: 8:42 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.store.pengadaan.DokumenKomStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.pengadaan.TrDokKom',
    url: Ifuel.config.dokKomUrl,
    remoteSort: true
});