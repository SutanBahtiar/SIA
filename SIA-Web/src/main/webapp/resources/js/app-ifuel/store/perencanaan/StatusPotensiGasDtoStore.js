/**
 * Created with IntelliJ IDEA.
 * User: rezafit
 * Date: 2/12/13
 * Time: 6:54 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.store.perencanaan.StatusPotensiGasDtoStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.perencanaan.TrStatusPotensiGasDto',
    url: Ifuel.config.statusPotensiGasLastStatusDtoUrl,
    remoteSort: false
});