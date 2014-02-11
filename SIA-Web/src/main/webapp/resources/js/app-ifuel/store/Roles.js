Ext.define('Ifuel.store.Roles', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.Role',
    url: Ifuel.config.roleUrl,
    remoteSort: true
});