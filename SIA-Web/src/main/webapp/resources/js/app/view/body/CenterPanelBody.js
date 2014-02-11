/**
 * @author sutan
 */

Ext.define('App.view.body.CenterPanelBody', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.centerPanel',
    initComponent: function() {
        this.callParent(arguments);
    },
    addItems: function(record) {
        var nodeText = record.data.text;
        var nodeLeaf = record.data.leaf;
        var nodeForm = record.data.hrefTarget;
        //var nodeId = record.getId();
        var tabBar = this.getTabBar();

        //console.log("record : " + record);
        //console.log("nodeText : " + nodeText);
        //console.log("nodeLeaf : " + nodeLeaf);
        //console.log("nodeForm : " + nodeForm);
        //console.log("nodeId : " + nodeId);
        //console.log("tabBar : " + tabBar);
        

        for (var i = 0; i < tabBar.items.length; i++) {
            if (tabBar.items.get(i).getText() === nodeText) {
                var tabIndex = i;
            }
        }

        if (nodeLeaf) {

            if (Ext.isEmpty(tabIndex)) {
                this.add({
                    title: nodeText,
                    bodyPadding: 5,
                    closable: true,
                    // html : record.data.text
                    layout: 'border',
                    bodyStyle: {
                        background: '#ffffff'
                    },
                    items: {
                        xtype: 'panel',
                        region: 'center',
                        frame: true,
                        header: false,
                        layout: 'border',
                        items: [{
                                region: 'center',
                                // xtype : 'formTes'
                                xtype: nodeForm
                            }]
                    }
                });

                tabIndex = this.items.length - 1;
            }

        }

        this.setActiveTab(tabIndex);
    }
});
