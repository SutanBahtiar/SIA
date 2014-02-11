Ext.define('Ifuel.view.pengadaan.kunjunganLapangan.KunjunganLapanganGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kunjunganLapanganGridPanel',
    forceFit: true,
    title: 'Daftar Rincian Kunjungan Lapangan',
    features: [{
            ftype: 'filters',
            autoReload: true,
            local: true
        }],


    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.KunjunganLapanganStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Potensi Gas',
                    dataIndex: 'trPotensiGas',
                    renderer: function (value, metadata, record) {
                        if (!Ext.isEmpty(value)) {
                            return 'KJ-' + value.id + '-' + record.data.iterasiKunjungan;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Pembangkit',
                    dataIndex: 'namaPltgm',
                    filterable: true
                },
                {
                    text: 'Sumber Gas',
                    dataIndex: 'namaSumberGas',
                    filterable: true
                },
                {
                    text: 'Pemasok',
                    dataIndex: 'namaPemasok',
                    filterable: true
                },
                {
                    text: 'Status',
                    dataIndex: 'statusKunjunganSet',
                    renderer: function (value, metadata, record) {
                        return Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(record.data);
                    }
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Kunjungan Lapangan {0} - {1} of {2}',
                    emptyMsg: 'No Kunjungan Lapangan to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});