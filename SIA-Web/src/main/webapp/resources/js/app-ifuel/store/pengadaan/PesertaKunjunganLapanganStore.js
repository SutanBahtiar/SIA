/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 1/31/13
 * Time: 8:27 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.store.pengadaan.PesertaKunjunganLapanganStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.pengadaan.TrPesertaKunjungan',
    url: Ifuel.config.pesertaKunjunganUrl,
    remoteSort: true
});