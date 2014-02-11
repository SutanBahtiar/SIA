Ext.define('Ifuel.view.pengadaan.skPanitia.SkPanitiaPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.skPanitiaPanel',
    title:'SK Panitia',

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
                        Ext.create('Ifuel.view.pengadaan.skPanitia.SkPanitiaGridPanel'),
                        Ext.create('Ifuel.view.pengadaan.skPanitia.SkPanitiaFormPanel', {disabled:true})
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