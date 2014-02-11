Ext.define('Ifuel.store.MenuTree', {
    extend: 'Ext.data.TreeStore',

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([
            Ext.apply({
                storeId: 'MenuTree',
                proxy: {
                    type: 'ajax',
                    url: Ifuel.config.apiPath + 'user/menu'
                },
                root: {
                    text: 'Root',
                    id: 'root',
                    expanded: true
                },
                autoLoad: true
            }, cfg)
        ]);
    }
});