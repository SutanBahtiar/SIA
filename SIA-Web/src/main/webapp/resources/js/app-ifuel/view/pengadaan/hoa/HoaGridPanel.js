Ext.define('Ifuel.view.pengadaan.hoa.HoaGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.hoaGridPanel',
    forceFit: true,
    title: 'Daftar Rincian HoA',
    features: [{
            ftype: 'filters',
            autoReload: true,
            local: true
        }],

    initComponent: function () {
        var store = Ext.create('Ifuel.store.pengadaan.HoaStore');
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
                    dataIndex: 'statusHoaSet',
                    renderer: function (value, metadata, record) {
                        return Ifuel.util.SystemUtil.getLastStatusHoa(record.data);
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
        this.callParent(arguments);
    }

});