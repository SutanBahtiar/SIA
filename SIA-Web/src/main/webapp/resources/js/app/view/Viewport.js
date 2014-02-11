Ext.define('App.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    layout: {
        type: 'border',
        padding: '3 3 3 3'
    },
    requires: [],
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                    xtype: 'leftPanel',
                    region: 'west',
                    split: true,
                    collapsible: true
                }, {
                    xtype: 'centerPanel',
                    region: 'center'
                }, , {
                    xtype: 'headerPanel',
                    region: 'north',
                    height: 100
                }]
        });
        me.callParent(arguments);
    }

});