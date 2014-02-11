Ext.define('Ifuel.view.Dashboard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dashboard',
    title: "Dashboard",
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    requires: [
        'Ext.chart.*'
    ],

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 0.1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            id: 'marquee-panel',
                            xtype: 'panel',
                            frame: true,
                            flex: 1,
                            margin: '3 3 1 3',
                            padding: '3 3 3 3',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        Ext.create("Ifuel.view.dashboard.TerimaBB", {
                            flex: 1
                        })
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});