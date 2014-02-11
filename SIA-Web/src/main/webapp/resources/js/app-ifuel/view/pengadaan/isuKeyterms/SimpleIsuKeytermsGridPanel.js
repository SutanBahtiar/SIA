Ext.define('Ifuel.view.pengadaan.isuKeyterms.SimpleIsuKeytermsGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.simpleIsuKeytermsGridPanel',
    forceFit: true,
    title: 'Daftar Rincian Isu Keyterms',

    //custom field
    withTbar: true,
    features: [{
            ftype: 'filters',
            autoReload: true,
            local: true
        }],

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.SimpleIsuKeytermsStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Isu',
                    dataIndex: 'isu',
                    filterable: true
                },
                {
                    text: 'Kesepakatan Pln',
                    dataIndex: 'kesepakatanPln',
                    filterable: true
                },
                {
                    text: 'Kesepakatan Pemasok',
                    dataIndex: 'kesepakatanPemasok',
                    filterable: true
                },
                {
                    text: 'Kesepakatan Lainnya',
                    dataIndex: 'kesepakatanLainnya',
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
                    displayMsg: 'Displaying Isu Keyterms {0} - {1} of {2}',
                    emptyMsg: 'No Isu Keyterms to display'
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