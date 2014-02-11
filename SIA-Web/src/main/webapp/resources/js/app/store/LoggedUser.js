Ext.define('App.store.LoggedUser', {
    extend: 'Ext.data.Store',

    requires: [
        'App.model.User'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([
            Ext.apply({
                storeId: 'LoggedUserJsonStore',
                model: 'App.model.User',
                proxy: {
                    type: 'ajax',
                    url: App.config.loggedUserUrl,
                    reader: {
                        type: 'json'
                    }
                },
                autoLoad: true
            }, cfg)
        ]);
    }
});