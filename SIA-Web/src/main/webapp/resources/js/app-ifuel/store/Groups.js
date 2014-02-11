Ext.define('Ifuel.store.Groups', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.Group',
    url: Ifuel.config.groupUrl,
    remoteSort: true
});