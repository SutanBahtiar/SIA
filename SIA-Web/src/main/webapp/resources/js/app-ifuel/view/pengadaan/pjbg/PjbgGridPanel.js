Ext.define('Ifuel.view.pengadaan.pjbg.PjbgGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pjbgGridPanel',
    forceFit: true,
    title: 'Daftar Rincian PJBG',
    features: [{
            ftype: 'filters',
            autoReload: true,
            local: true
        }],

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.PjbgStore');
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
                    text: 'MoU',
                    dataIndex: 'nomorMou',
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
                    text: 'Tanggal Persetujuan',
                    dataIndex: 'tanggalPersetujuan',
                    renderer: Ext.util.Format.dateRenderer('d F Y'),
                    filterable: true
                },
                {
                    text: 'Status',
                    dataIndex: 'statusPjbgSet',
                    renderer: function (value, metadata, record) {
                        return Ifuel.util.SystemUtil.getLastStatusPjbg(record.data);
                    }
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying PJBG {0} - {1} of {2}',
                    emptyMsg: 'No PJBG to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});