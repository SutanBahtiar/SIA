/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/5/13
 * Time: 1:35 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.store.pengadaan.AgendaKunjunganLapanganStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.pengadaan.TrAgendaKunjungan',
    url: Ifuel.config.agendaKunjunganUrl,
    remoteSort: true
});