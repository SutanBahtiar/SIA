/**
 * @author sutan
 */

Ext.define('App.view.body.HeaderPanelBody', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.headerPanel',
    initComponent: function() {
        this.bodyStyle = {
            background: '#008000',
            //padding: '15px'
        },
                this.layout = 'border',
                this.html = '<p>Extjs!</p>',
                this.items = [{
                xtype: 'button',
                width: 100,
                margin: '3 3 3 0',
                region: 'east',
                scale: 'large',
                iconAlign: 'top',
                iconCls: 'icon-user',
                text: 'Logged as <br/> <b>' + App.util.SecurityHelper.getNama() + '</b>',
                arrowAlign: 'bottom',
                menu: {
                    items: [
                        {
                            text: 'Change Password',
                            iconCls: 'fam-keyboard',
                            handler: function() {
                            }
                        },
                        {
                            text: 'Logout',
                            iconCls: 'fam-door-out',
                            handler: function() {
                                window.location = App.config.logoutUrl;
                            }
                        }
                    ]
                }
            }],
        this.callParent(arguments);
    }
});
