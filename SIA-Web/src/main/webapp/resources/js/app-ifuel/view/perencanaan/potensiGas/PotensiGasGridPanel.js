Ext.define('Ifuel.view.perencanaan.potensiGas.PotensiGasGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.potensiGasGridPanel',
    forceFit: true,
    title: 'Daftar Rincian Potensi Gas',

    //custom field
    withTbar: true,

    initComponent: function () {
        var store = Ext.create('Ifuel.store.perencanaan.PotensiGasStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer',
                    title: 'no'
                },
                {
                    text: 'No. Potensi Gas',
                    dataIndex: 'id'
                },
                {
                    text: 'Pemasok',
                    dataIndex: 'tmPemasok',
                    renderer: function (value) {
                        if (!Ext.isEmpty(value)) {
                            return value.namaPemasok;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Nama Sumber Gas',
                    dataIndex: 'tmSumberGas',
                    renderer: function (value) {
                        if (!Ext.isEmpty(value)) {
                            return value.namaSumberGas;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Lokasi Sumber Gas',
                    dataIndex: 'tmPltgm',
                    renderer: function (value) {
                        if (!Ext.isEmpty(value)) {
                            return value.namaLokasi;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Pembangkit',
                    dataIndex: 'tmPltgm',
                    renderer: function (value) {
                        if (!Ext.isEmpty(value)) {
                            return value.namaPltgm;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Lokasi Pembangkit',
                    dataIndex: 'tmPltgm',
                    renderer: function (value) {
                        if (!Ext.isEmpty(value)) {
                            return value.namaLokasi;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'status',
                    dataIndex: 'tmStatusKronologis',
                    renderer: function (value) {
                        if (!Ext.isEmpty(value)) {
                            return value.tmKronologis.namaKronologis + ' - ' + value.namaStatus;
                        } else {
                            return "-";
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

        if (this.withTbar == true) {
            Ext.apply(this, {
                tbar: [
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
            });
        }
        this.callParent(arguments);
    }

});