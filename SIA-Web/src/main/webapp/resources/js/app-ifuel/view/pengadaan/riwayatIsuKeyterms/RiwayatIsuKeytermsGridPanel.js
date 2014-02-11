Ext.define('Ifuel.view.pengadaan.riwayatIsuKeyterms.RiwayatIsuKeytermsGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.riwayatIsuKeytermsGridPanel',
    forceFit: true,
    title: 'Daftar Riwayat Isu Keyterms',

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.RiwayatIsuKeytermsStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Kesepakatan Pln',
                    dataIndex: 'kesepakatanPln'
                },
                {
                    text: 'Kesepakatan Pemasok',
                    dataIndex: 'kesepakatanPemasok'
                },
                {
                    text: 'Kesepakatan Lainnya',
                    dataIndex: 'kesepakatanLainnya'
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Riwayat Isu Keyterms {0} - {1} of {2}',
                    emptyMsg: 'No Riwayat Isu Keyterms to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});