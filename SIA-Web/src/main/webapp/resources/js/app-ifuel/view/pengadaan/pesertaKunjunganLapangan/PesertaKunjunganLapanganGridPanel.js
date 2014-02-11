Ext.define('Ifuel.view.pengadaan.pesertaKunjunganLapangan.PesertaKunjunganLapanganGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pesertaKunjunganLapanganGridPanel',
    forceFit: true,
    title: 'Peserta Kunjungan Lapangan',

    //custom field
    withTbar: true,

    initComponent: function () {
        var me = this;
        var store = Ext.create('Ifuel.store.pengadaan.PesertaKunjunganLapanganStore');

        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Peserta',
                    dataIndex: 'tmPerson',
                    renderer: function (value) {
                        if (!Ext.isEmpty(value)) {
                            return value.nama;
                        } else {
                            return "-";
                        }

                    }
                },
                {
                    text: 'Perusahaan',
                    dataIndex: 'perusahaan'
                },
                {
                    text: 'Jabatan',
                    dataIndex: 'tmPerson',
                    renderer: function (value) {
                        if (!Ext.isEmpty(value)) {
                            return value.jabatan;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'No. Telp',
                    dataIndex: 'tmPerson',
                    renderer: function (value) {
                        if (!Ext.isEmpty(value)) {
                            return value.noTelp;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'e-Mail',
                    dataIndex: 'tmPerson',
                    renderer: function (value) {
                        if (!Ext.isEmpty(value)) {
                            return value.email;
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
                    displayMsg: 'Displaying Peserta Kunjungan {0} - {1} of {2}',
                    emptyMsg: 'No Peserta Kunjungan to display'
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