Ext.define('Ifuel.view.pengadaan.dokumenKom.DokumenKomGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dokumenKomGridPanel',
    forceFit: true,
    title: 'Dokumen Kick-off Meeting',

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.DokumenKomStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'No. Dokumen',
                    dataIndex: 'nomor'
                },
                {
                    text: 'Nama',
                    dataIndex: 'nama'
                },
                {
                    text: 'Deskripsi',
                    dataIndex: 'keterangan'
                },
                {
                    text: 'Content Type',
                    dataIndex: 'contentType'
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
                    displayMsg: 'Displaying Dokumen Kick-off Meeting {0} - {1} of {2}',
                    emptyMsg: 'No Dokumen Kick-off Meeting to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});