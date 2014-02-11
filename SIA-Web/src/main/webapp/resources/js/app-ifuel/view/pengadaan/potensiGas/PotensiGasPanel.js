Ext.define('Ifuel.view.pengadaan.potensiGas.PotensiGasPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.pengadaanPotensiGasPanel',
    title:'Pengadaan Potensi Gas',

    layout:{
        align:'stretch',
        type:'vbox'
    },

    requires:[
        'Ifuel.view.perencanaan.statusPotensiGas.StatusPotensiGasGridPanel',
        'Ifuel.view.perencanaan.statusPotensiGas.StatusPotensiGasFormPanel'
    ],

    initComponent:function () {
        Ext.apply(this, {
            items:[
                {
                    xtype:'tabpanel',
                    flex:1,
                    items:[
                        Ext.create('Ifuel.view.perencanaan.statusPotensiGas.StatusPotensiGasGridPanel', {withTbar:false}),
                        Ext.create('Ifuel.view.perencanaan.statusPotensiGas.StatusPotensiGasFormPanel',{disabled:true})
                    ],

                    tbar:[
                        {
                            xtype:'button',
                            text:'New',
//                            disabled:true,
                            action:'new',
                            iconCls:'fam-page-add'
                        },
                        {
                            xtype:'button',
                            text:'Save',
                            disabled:true,
                            action:'save',
                            iconCls:'fam-page-save'
                        },
                        {

                            xtype:'button',
                            text:'Change Status',
                            disabled:true,
                            action:'changestatus',
                            iconCls:'icon-changestatus'
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})