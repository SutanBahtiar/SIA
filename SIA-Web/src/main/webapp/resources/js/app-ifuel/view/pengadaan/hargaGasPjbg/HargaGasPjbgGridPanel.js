Ext.define('Ifuel.view.pengadaan.hargaGasPjbg.HargaGasPjbgGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.hargaGasPjbgGridPanel',
    forceFit: true,
    title: 'Daftar Rincian Harga Gas Pjbg',

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.HargaGasPjbgStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Periode Awal',
                    dataIndex: 'periodeAwal',
                    renderer: Ext.util.Format.dateRenderer('d F Y')
                },
                {
                    text: 'Periode Akhir',
                    dataIndex: 'periodeAkhir',
                    renderer: Ext.util.Format.dateRenderer('d F Y')
                },
                {
                    text: 'Harga Gas (IDR)',
                    dataIndex: 'hargaGas',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                }
            ],

            tbar: [
                {
                    xtype: 'button',
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
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Harga Gas {0} - {1} of {2}',
                    emptyMsg: 'No Harga Gas to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});