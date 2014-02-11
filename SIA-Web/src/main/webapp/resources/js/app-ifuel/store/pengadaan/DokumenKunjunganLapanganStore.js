/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 1/31/13
 * Time: 8:42 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.store.pengadaan.DokumenKunjunganLapanganStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.pengadaan.TrDokKunjLap',
    url: Ifuel.config.dokumenKunjunganLapanganUrl,
    remoteSort: true
});