Ext.define('Ifuel.store.master.RegionStore', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.master.TmRegion',
    url: Ifuel.config.regionUrl,
    pageSize: 25,
    remoteSort: false
});