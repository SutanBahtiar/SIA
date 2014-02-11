Ext.define('Ifuel.view.pengadaan.skPanitia.SkPanitiaGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.skPanitiaGridPanel',

    forceFit: true,
    title: 'Daftar Rincian Sk Panitia',
    features: [{
            ftype: 'filters',
            autoReload: true,
            local: true
        }],

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.SkPanitiaStore');
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
                    text: 'Jumlah Panitia',
                    dataIndex: 'jumlahPanitia',
                    filterable: true
                },
                {
                    text: 'Status',
                    dataIndex: 'status',
                    filterable: true
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Sk Panitia {0} - {1} of {2}',
                    emptyMsg: 'No Sk Panitia to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});