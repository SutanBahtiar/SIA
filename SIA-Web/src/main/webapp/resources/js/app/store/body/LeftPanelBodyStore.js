/**
 * @author sutan
 */

Ext.define('App.store.body.LeftPanelBodyStore', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true
    },
    proxy: {
        type: 'ajax',
//        url: 'js/data/tree-menu.json'
        url: App.config.menuTree
    }

});
