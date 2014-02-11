Ext.define('Ifuel.view.pengadaan.mou.MouGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mouGridPanel',
    forceFit: true,
    title: 'Daftar Rincian MoU',

    //custom field
    withTbar: true,
    features: [{
            ftype: 'filters',
            autoReload: true,
            local: true
        }],

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.MouStore');
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
                    text: 'Judul',
                    dataIndex: 'judulIndonesia',
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
                    dataIndex: 'statusMouSet',
                    renderer: function (value, metadata, record) {
                        return Ifuel.util.SystemUtil.getLastStatusMou(record.data);
                    }
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying MoU {0} - {1} of {2}',
                    emptyMsg: 'No MoU to display'
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