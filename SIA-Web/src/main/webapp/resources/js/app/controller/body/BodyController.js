/**
 * @author sutan
 */

Ext.define('App.controller.body.BodyController', {
    extend: 'Ext.app.Controller',
    stores: ['body.LeftPanelBodyStore'],
    views: ['body.LeftPanelBody', 'body.CenterPanelBody', 'body.HeaderPanelBody'],
    refs: [{
            ref: 'centerPanel',
            selector: 'centerPanel'
        }],
    init: function() {
        this.control({
            'viewport > leftPanel dataview': {
                render: this.onPanelRendered,
                itemclick: this.onItemClick
            }
        });
    },
    onPanelRendered: function() {
        console.log('The panel was rendered');
    },
    onItemClick: function(leftPanel, record) {
        this.getCenterPanel().addItems(record);
    }
});
