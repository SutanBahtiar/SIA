/**
 * @author sutan
 */

Ext.define('App.view.tes.PanelTes', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.panelTes',

    initComponent : function() {
        // this.height = '100%', 
        // this.width = '100%', 
        // this.title = 'Panel Tes', 
        this.frame = true, 
        this.layout = 'border', 
        this.items = [{
            xtype : 'formTes',
            region : 'center'
        }], this.callParent(arguments);
    }
});
