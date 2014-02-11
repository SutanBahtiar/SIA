Ext.define('Ifuel.store.LoggedUser', {
    extend: 'Ext.data.Store',

    requires: [
        'Ifuel.model.User'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([
            Ext.apply({
                storeId: 'LoggedUserJsonStore',
                model: 'Ifuel.model.User',
                proxy: {
                    type: 'ajax',
                    url: Ifuel.config.loggedUserUrl,
                    reader: {
                        type: 'json'
                    }
                },
                autoLoad: true
            }, cfg)
        ]);
    }
});