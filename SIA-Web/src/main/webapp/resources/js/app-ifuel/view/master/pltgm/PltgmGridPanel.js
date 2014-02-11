Ext.define('Ifuel.view.master.pltgm.PltgmGridPanel', {
    extend:'Ext.grid.Panel',
    alias:'widget.pltgmGridPanel',
    store:Ext.create('Ifuel.store.master.PltgmStore'),
    forceFit:true,
    title:'Pembangkit',

    //custom field
    withTbar:true,

    initComponent:function () {
        Ext.apply(this, {
            columns:[
                {
                    xtype:'rownumberer'
                },
                {
                    text:'Nama Pembangkit',
                    dataIndex:'namaPltgm'

                },
                {
                    text:'Jenis',
                    dataIndex:'jenisPltgm'
                },
                {
                    text:'Kapasitas',
                    dataIndex:'kapasitasProd'
                },
                {
                    text:'Lokasi',
                    dataIndex:'namaLokasi'
                }
            ],

            dockedItems:[
                {
                    xtype:'pagingtoolbar',
                    dock:'bottom',
                    store:this.store,
                    displayInfo:true,
                    displayMsg:'Displaying Pembangkit {0} - {1} of {2}',
                    emptyMsg:'No Data to display'
                }
            ]
        });

        if (this.withTbar == true) {
            Ext.apply(this, {
                tbar:[
                    {
                        text:'New',
                        action:'new',
                        iconCls:'fam-page-add'
                    },
                    {
                        xtype:'button',
                        text:'Delete',
                        disabled:true,
                        action:'delete',
                        iconCls:'fam-page-delete'
                    }
                ]
            });
        }
        this.callParent(arguments);
    }

});