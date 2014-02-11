Ext.define('Ifuel.view.pengadaan.skPanitia.SkPanitiaFormPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.skPanitiaFormPanel',
    title:'Data Sk Panitia',

    requires:[],

    autoScroll:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },

    initComponent:function () {
        Ext.apply(this, {
            items:[
                {
                    xtype:'form',
                    padding:'5 5 0 5',
                    border:false,
                    layout:{
                        type:'vbox',
                        align:'stretch'
                    },
                    items:[
                        {
                            xtype:'hiddenfield',
                            name:'id'
                        },
                        {
                            xtype:'fieldcontainer',
                            groupField:'potensiGas',
                            border:0,
                            layout:{
                                type:'hbox'
                            },
                            items:[
                                {
                                    xtype:'hiddenfield',
                                    name:'potensiGasId'
                                },
                                {
                                    xtype:'textfield',
                                    fieldLabel:'Potensi Gas',
                                    name:'potensiGas',
                                    anchor:'100%',
                                    flex:1,
                                    allowBlank:false,
                                    readOnly:true
                                },
                                {
                                    xtype:'button',
                                    action:'search',
                                    iconCls:'fam-zoom'
                                }
                            ]
                        },
                        {
                            xtype:'fieldcontainer',
                            border:1,
                            groupField:'fieldset',
                            layout:{
                                type:'hbox',
                                align:'stretchmax'
                            },
                            items:[
                                {
                                    xtype:'fieldset',
                                    flex:1,
                                    frame:true,
//                                    groupField:'dataSkPanitia',
                                    margins:'0 10 0 0',
                                    collapsible:true,
                                    layout:{
                                        type:'vbox',
                                        align:'stretch'
                                    },
                                    items:[
                                        {
                                            xtype:'textfield',
                                            anchor:'100%',
                                            fieldLabel:'Nomor Sk Panitia',
                                            name:'nomor',
                                            allowBlank:false
                                        },
                                        {
                                            xtype:'textfield',
                                            anchor:'100%',
                                            fieldLabel:'Status',
                                            name:'status',
                                            readOnly:true,
                                            allowBlank:true
                                        },
                                        {
                                            xtype:'fieldcontainer',
                                            anchor:'100%',
                                            layout:{
                                                type:'hbox'
                                            },
                                            items:[
                                                {
                                                    xtype:'filefield',
                                                    name:'uploadedfiles',
                                                    fieldLabel:'Dokumen',
                                                    msgTarget:'side',
//                                                    allowBlank:false,
                                                    anchor:'100%',
                                                    flex:1,
                                                    buttonText:'Cari Dokumen'
                                                },
                                                {

                                                    xtype:'button',
                                                    text:'Download',
//                                                    disabled:true,
                                                    action:'download'
//                                                    iconCls:'fam-email-go'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype:'fieldset',
                                    flex:1,
                                    frame:true,
                                    collapsible:true,
                                    layout:{
                                        type:'vbox',
                                        align:'stretch'
                                    },
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Pembangkit',
                                            name:'pembangkit',
                                            readOnly:true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Sumber Gas',
                                            name:'sumberGas',
                                            readOnly:true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Pemasok',
                                            name:'pemasok',
                                            readOnly:true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]

                },
                Ext.create('Ifuel.view.pengadaan.personilPanitia.PersonilPanitiaGridPanel', {flex:1})
            ]
        });
        this.callParent(arguments);
    }
})