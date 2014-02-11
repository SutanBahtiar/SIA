/**
 * Created with IntelliJ IDEA.
 * User: Latief
 * Date: 2/13/13
 * Time: 3:27 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.store.master.RiwayatAyatStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.master.TmRiwayatAyat',
    url: Ifuel.config.riwayatAyatUrl,
    remoteSort: false
});