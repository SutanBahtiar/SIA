Ext.define('Ifuel.view.pengadaan.agendaKunjunganLapangan.AgendaKunjunganLapanganGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.agendaKunjunganLapanganGridPanel',
    forceFit: true,
    title: 'Agenda Kunjungan Lapangan',

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.AgendaKunjunganLapanganStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Tanggal',
                    dataIndex: 'waktuAwalKunjungan',
                    renderer: Ext.util.Format.dateRenderer('d F Y')
                } ,
                {
                    text: 'Jam',
                    dataIndex: 'waktuAwalKunjungan',
                    renderer: function (val, metadata, record) {
                        return Ext.Date.format(record.data.waktuAwalKunjungan, "H:i") + " - " + Ext.Date.format(record.data.waktuAkhirKunjungan, "H:i");
                    }
                },
                {
                    text: 'Kegiatan',
                    dataIndex: 'kegiatan'
                },
                {
                    text: 'Lokasi',
                    dataIndex: 'lokasiKunjungan'
                },
                {
                    text: 'Peserta',
                    dataIndex: 'pesertaKunjungan'
                },
                {
                    text: 'Keterangan',
                    dataIndex: 'keterangan'
                },
                {
                    text: 'Tambah ke Summary?',
                    dataIndex: 'tambahSummary'
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
                    displayMsg: 'Displaying Agenda Kunjungan {0} - {1} of {2}',
                    emptyMsg: 'No Agenda Kunjungan to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});