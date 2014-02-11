Ext.define('Ifuel.view.pengadaan.specGasPjbg.SpecGasPjbgGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.specGasPjbgGridPanel',
    forceFit: true,
    title: 'Daftar Rincian Spesifikasi Gas Pjbg',
    features: [{
            ftype: 'filters',
            autoReload: true,
            local: true
        }],

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.SpecGasPjbgStore');
        var pluginEditing = Ext.create('Ext.grid.plugin.RowEditing', {clicksToEdit: 1});
        Ext.apply(this, {
            store: store,
            plugins: pluginEditing,
            selType: 'rowmodel',
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Spesifikasi',
                    dataIndex: 'atributSpec',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    },
                    filterable: true
                },
                {
                    text: 'Measurement Unit',
                    dataIndex: 'measurementUnit',
                    editor: {
                        xtype: 'textfield'
                    },
                    filterable: true
                },
                {
                    text: 'Minimum Value',
                    dataIndex: 'minimumValue',
                    editor: {
                        xtype: 'numberfield'
                    },
                    filterable: true
                },
                {
                    text: 'Maximum Value',
                    dataIndex: 'maximumValue',
                    editor: {
                        xtype: 'numberfield'
                    },
                    filterable: true
                }
            ],

            tbar: [
                {
                    xtype: 'button',
                    text: 'New',
                    action: 'new',
                    iconCls: 'fam-page-add'
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    disabled: true,
                    action: 'delete',
                    iconCls: 'fam-page-delete'
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Spesifikasi Gas {0} - {1} of {2}',
                    emptyMsg: 'No Spesifikasi Gas to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});