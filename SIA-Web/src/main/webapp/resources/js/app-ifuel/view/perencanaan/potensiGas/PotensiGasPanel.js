Ext.define('Ifuel.view.perencanaan.potensiGas.PotensiGasPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.perencanaanPotensiGasPanel',
    title:'Perencanaan Potensi Gas',

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
                        Ext.create('Ifuel.view.perencanaan.statusPotensiGas.StatusPotensiGasGridPanel'),
                        Ext.create('Ifuel.view.perencanaan.statusPotensiGas.StatusPotensiGasFormPanel')
                    ],

                    tbar:[
                        {
                            text:'New',
                            disabled:true,
                            action:'new',
                            iconCls:'fam-page-add'
                        },
                        {
                            text:'Save',
                            disabled:true,
                            action:'save',
                            iconCls:'fam-page-save'
                        },
                        {

                            text:'Change Status',
                            disabled:true,
                            action:'changestatus',
                            iconCls:'icon-changestatus'
                        },
                        {
                            xtype:'button',
                            text:'Delete',
                            disabled:true,
                            action:'delete',
                            iconCls:'fam-page-delete'
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})