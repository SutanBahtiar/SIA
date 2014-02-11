Ext.define('Ifuel.view.pengadaan.personilPanitia.PersonilPanitiaGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.personilPanitiaGridPanel',
    forceFit: true,
    title: 'Daftar Rincian Personil Panitia',

    //custom field
    withTbar: true,

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.PersonilPanitiaStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Nama',
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
                    text: 'NIP',
                    dataIndex: 'tmPerson',
                    renderer: function (value) {
                        if (!Ext.isEmpty(value)) {
                            return value.nipPerson;
                        } else {
                            return "-";
                        }
                    }
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
                    text: 'Tugas',
                    dataIndex: 'tugas'
                },
                {
                    text: 'Telp',
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
                    text: 'Email',
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
                    displayMsg: 'Displaying Personil Panitia {0} - {1} of {2}',
                    emptyMsg: 'No Personil Panitia to display'
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