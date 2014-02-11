Ext.define('Ifuel.store.UserActivities', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.UserActivity',
    url: Ifuel.config.userActivityUrl,
    remoteSort: true
});