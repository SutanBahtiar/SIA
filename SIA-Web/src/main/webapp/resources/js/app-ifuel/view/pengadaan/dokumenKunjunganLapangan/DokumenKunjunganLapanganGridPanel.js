Ext.define('Ifuel.view.pengadaan.dokumenKunjunganLapangan.DokumenKunjunganLapanganGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dokumenKunjunganLapanganGridPanel',
    forceFit: true,
    title: 'Dokumen Kunjungan Lapangan',

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.DokumenKunjunganLapanganStore');
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
                    displayMsg: 'Displaying Dokumen Kunjungan {0} - {1} of {2}',
                    emptyMsg: 'No Dokumen Kunjungan to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});