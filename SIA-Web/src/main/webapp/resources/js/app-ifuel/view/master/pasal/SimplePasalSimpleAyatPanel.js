Ext.define('Ifuel.view.master.pasal.SimplePasalSimpleAyatPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.simplePasalSimpleAyatPanel',
    title: 'Data Pasal',

    autoScroll: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    //custom field
    withTbar: true,

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            items: [
                Ext.create('Ifuel.view.master.pasal.SimplePasalGridPanel',
                    {
                        flex: 1,
                        withTbar:me.withTbar,
                        listeners: {
                            selectionchange: me.pasalGridSelectionChange
                        }
                    }
                ),
                Ext.create('Ifuel.view.master.ayat.SimpleAyatGridPanel', {
                    withTbar:me.withTbar,
                    flex: 1
                })
            ],
            listeners:{
                activate:me.panelActivate
            }
        });

        this.callParent(arguments);
    },

    panelActivate:function(panel){
        var selecteds = panel.down("simplePasalGridPanel").getSelectionModel().getSelection();
        if(selecteds[0]){
            panel.reloadAyatGrid(selecteds[0].data.id);
        }else{
            panel.reloadAyatGrid(null);
        }
    },

    pasalGridSelectionChange: function (model, selected) {
        var me = this.up("simplePasalSimpleAyatPanel");
        if (selected[0]) {
            me.reloadAyatGrid(selected[0].data.id);
        }else{
            me.reloadAyatGrid(null);
        }
    },

    reloadAyatGrid: function (pasalId) {
        var grid = this.down("simpleAyatGridPanel");
        var store = grid.getStore();
        if (pasalId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.ayatUrl + 'simple/byPasal/' + pasalId + "?page.sort=ayat&page.sort.dir=asc",
                reader: {
                    type: 'json',
                    root: 'content',
                    totalProperty: 'totalElements'
                }
            };
            store.setProxy(proxy);
            store.loadPage(1);
            grid.down('pagingtoolbar').enable();
        } else {
            grid.down('pagingtoolbar').disable();
            store.loadRawData([]);
        }
    }

})