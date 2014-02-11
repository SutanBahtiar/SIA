Ext.define('Ifuel.store.ActivityLogs', {
    extend: 'Ifuel.store.BaseStore',
    model: 'Ifuel.model.ActivityLog',
    url: Ifuel.config.userActivityUrl + "-1/log/",
    remoteSort: false
});