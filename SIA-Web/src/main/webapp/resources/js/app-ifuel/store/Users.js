Ext.define('Ifuel.store.Users', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.User',
    url: Ifuel.config.userUrl,
    remoteSort: true

});