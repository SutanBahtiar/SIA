/**
 * @author sutan
 */

Ext.define('App.view.body.LeftPanelBody', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.leftPanel',
    title: 'TreeMenu',
    initComponent: function() {
        this.width = '15%',
                this.margins = '0 1 0 0',
                this.rootVisible = false,
                this.store = 'body.LeftPanelBodyStore',
                this.callParent(arguments);
    }
});
