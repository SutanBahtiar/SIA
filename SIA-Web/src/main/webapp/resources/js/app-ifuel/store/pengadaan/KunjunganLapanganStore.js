Ext.define('Ifuel.store.pengadaan.KunjunganLapanganStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.pengadaan.TrKunjunganLapangan',
    url: Ifuel.config.kunjunganLapanganUrl,
    remoteSort: true
});