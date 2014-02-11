Ext.define('Ifuel.view.pengadaan.kom.KomPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.komPanel',
    title:'Kick-off Meeting',

    layout:{
        align:'stretch',
        type:'vbox'
    },

    requires:[
    ],

    initComponent:function () {
        Ext.apply(this, {
            items:[
                {
                    xtype:'tabpanel',
                    flex:1,
                    items:[
                        Ext.create('Ifuel.view.pengadaan.kom.KomGridPanel'),
                        Ext.create('Ifuel.view.pengadaan.kom.KomFormPanel', {
                            disabled:true
                        }),
                        Ext.create('Ifuel.view.pengadaan.kom.HasilKomFormPanel', {
                            disabled:true
                        })
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
                        },
                        {

                            xtype:'button',
                            text:'Kirim Undangan',
                            disabled:true,
                            action:'undang',
                            iconCls:'fam-email-go'
                        }
//                        {
//                            xtype:'button',
//                            text:'Delete',
//                            disabled:true,
//                            action:'delete',
//                            iconCls:'fam-page-delete'
//                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})