Ext.define('Ifuel.view.perencanaan.statusPotensiGas.StatusPotensiGasGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.statusPotensiGasGridPanel',
    forceFit: true,
    title: 'Daftar Rincian Status Potensi Gas',
    features: [{
            ftype: 'filters',
            autoReload: true,
            local: true
        }],

    initComponent: function () {
        var store = Ext.create('Ifuel.store.perencanaan.StatusPotensiGasDtoStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer',
                    title: 'no'
                },
                {
                    text: 'No. Potensi Gas',
                    dataIndex: 'nomorPotensiGas',
                    filterable: true
                },
                {
                    text: 'Pemasok',
                    dataIndex: 'namaPemasok',
                    filterable: true
                },
                {
                    text: 'Nama Sumber Gas',
                    dataIndex: 'namaSumberGas',
                    filterable: true
                },
                {
                    text: 'Lokasi Sumber Gas',
                    dataIndex: 'lokasiSumberGas',
                    filterable: true
                },
                {
                    text: 'Pembangkit',
                    dataIndex: 'namaPltgm',
                    filterable: true
                },
                {
                    text: 'Lokasi Pembangkit',
                    dataIndex: 'lokasiPltgm',
                    filterable: true
                },
                {
                    text: 'status',
                    dataIndex: 'namaStatus',
                    filterable: true
                },
                {
                    text: 'status proses',
                    dataIndex: 'tmStatusKronologisChild',
                    renderer: function (value) {
                        if (value && value.tmKronologis) {
                            return value.tmKronologis.namaKronologis + " - " + value.namaStatus;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: ' ',
                    dataIndex: 'containAttachment',
                    width: 25,
                    renderer: function (value) {
                        if (value === true) {
                            return '<div class = "fam-attach">';
                        } else {
                            return '';
                        }
                    }
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Potensi Gas {0} - {1} of {2}',
                    emptyMsg: 'No Potensi Gas to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});