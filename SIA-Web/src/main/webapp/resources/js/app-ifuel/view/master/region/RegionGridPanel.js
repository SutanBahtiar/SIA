Ext.define('Ifuel.view.master.region.RegionGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.regionGridPanel',
    store: Ext.create('Ifuel.store.master.RegionStore'),
    forceFit: true,
    title: 'Daftar Region',

    initComponent:function(){
        Ext.apply(this, {
            columns:[
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Region',
                    dataIndex: 'region',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Wilayah',
                    dataIndex: 'wilayah',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                }
            ],

            dockedItems:[
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: this.store,
                    displayInfo: true,
                    displayMsg: 'Displaying Pemasok {0} - {1} of {2}.',
                    emptyMsg: 'No Pemasok to display.'
                }
            ]
        });
        this.callParent(arguments);
    }
})