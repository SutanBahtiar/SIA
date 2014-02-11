Ext.define('Ifuel.view.perencanaan.dokPotensiGas.DokPotensiGasGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dokPotensiGasGridPanel',
    forceFit: true,
    title: 'Daftar Rincian Dokumen Potensi Gas',

    initComponent: function () {
        var store = Ext.create('Ifuel.store.perencanaan.DokPotensiGasStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer',
                    title: 'no'
                },
                {
                    text: 'Nomor',
                    sortable: true,
                    dataIndex: 'noDokumen'
                },
                {
                    text: 'Nama Dokumen',
                    sortable: true,
                    dataIndex: 'dokumen'
                },
                {
                    text: 'Keterangan',
                    sortable: true,
                    dataIndex: 'keterangan'
                },
                {
                    text: 'Jenis Dokumen',
                    width: 150,
                    sortable: true,
                    dataIndex: 'tmJenisDokumen',
                    renderer: function (value) {
                        if (!Ext.isEmpty(value)) {
                            return value.jenisDokumen;
                        } else {
                            return "-";
                        }
                    }
                }
            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
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
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Dokumen Potensi Gas {0} - {1} of {2}',
                    emptyMsg: 'No Dokumen otensi Gas to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});