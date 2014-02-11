Ext.define('Ifuel.view.pengadaan.keyterms.KeytermsGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.keytermsGridPanel',
    forceFit: true,
    title: 'Daftar Rincian Keyterms',
    features: [{
            ftype: 'filters',
            autoReload: true,
            local: true
        }],

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.KeytermsStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Nomor',
                    dataIndex: 'id',
                    renderer: function (value) {
                        return "KT-" + value;
                    },
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
                    dataIndex: 'statusKeytermsSet',
                    renderer: function (value, metadata, record) {
                        return Ifuel.util.SystemUtil.getLastStatusKeyterms(record.data);
                    }
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Keyterms {0} - {1} of {2}',
                    emptyMsg: 'No Keyterms to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});