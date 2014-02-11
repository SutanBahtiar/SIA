Ext.define('Ifuel.view.master.riwayatAyat.RiwayatAyatGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.riwayatAyatGridPanel',
    forceFit: true,
    title: 'Riwayat Ayat',

    //custom field
    withTbar: true,

    initComponent: function () {
        var store = Ext.create('Ifuel.store.master.RiwayatAyatStore');

        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Text Indonesia',
                    dataIndex: 'textIndonesia'
                },
                {
                    text: 'Text English',
                    dataIndex: 'textEnglish'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'createdAt',
                    text: 'Created At',
                    format: 'd F Y H:i'
                },
                {
                    dataIndex: 'createdBy',
                    text: 'Created By'
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Riwayat Ayat {0} - {1} of {2}',
                    emptyMsg: 'No Riwayat Ayat to display'
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