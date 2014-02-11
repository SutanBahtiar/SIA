Ext.define('Ifuel.view.pengadaan.kom.KomGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.komGridPanel',

    forceFit: true,
    title: 'Daftar Rincian Kick-off Meeting',
    features: [{
            ftype: 'filters',
            autoReload: true,
            local: true
        }],

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.KomStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Nomor',
                    dataIndex: 'nomor',
                    filterable: true
                },
                {
                    text: 'Lokasi',
                    dataIndex: 'lokasi',
                    filterable: true
                },
                {
                    text: 'Agenda',
                    dataIndex: 'agenda',
                    filterable: true
                },
//                {
//                    text:'Hasil Pembahasan',
//                    dataIndex:'hasilPembahasan'
//                },
                {
                    text: 'Waktu Pelaksanaan',
                    dataIndex: 'waktuPelaksanaan',
                    renderer: Ext.util.Format.dateRenderer('d F Y H:i'),
                    filterable: true
                },
                {
                    text: 'Nomor Potensi Gas',
                    dataIndex: 'nomorPotensiGas',
                    filterable: true
                },
                {
                    text: 'Pemasok',
                    dataIndex: 'namaPemasok',
                    filterable: true
                },
                {
                    text: 'Sumber Gas',
                    dataIndex: 'namaSumberGas',
                    filterable: true
                },
                {
                    text: 'Pembangkit',
                    dataIndex: 'namaPltgm',
                    filterable: true
                },
                {
                    text: 'Status',
                    dataIndex: 'status',
                    renderer: function (value, metadata, record) {
                        return Ifuel.util.SystemUtil.getLastStatusKom(record.data);
                    }
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Kick-off Meeting {0} - {1} of {2}',
                    emptyMsg: 'No Kick-off Meeting to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});