Ext.define('Ifuel.view.pengadaan.mou.MouPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.mouPanel',
    title:'Memorandum of Understanding',

    layout:{
        align:'stretch',
        type:'vbox'
    },

    initComponent:function () {
        Ext.apply(this, {
            items:[
                {
                    xtype:'tabpanel',
                    flex:1,
                    items:[
                        Ext.create('Ifuel.view.pengadaan.mou.MouGridPanel', {withTbar:false}),
                        Ext.create('Ifuel.view.pengadaan.mou.MouFormPanel', {disabled:true}),
                        Ext.create('Ifuel.view.master.pasal.SimplePasalSimpleAyatPanel', {disabled: true})
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
                            xtype: 'button',
                            text: 'Salin Pasal',
                            disabled: true,
                            action: 'salin',
                            iconCls: 'fam-disk-multiple'
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