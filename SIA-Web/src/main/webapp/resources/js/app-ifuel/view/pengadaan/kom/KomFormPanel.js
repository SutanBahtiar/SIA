Ext.define('Ifuel.view.pengadaan.kom.KomFormPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.komFormPanel',
    title:'Data Kick-off Meeting',

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
                            border:0,
                            layout:{
                                type:'hbox'
                            },
                            items:[
                                {
                                    xtype:'textfield',
                                    fieldLabel:'Nomor',
                                    name:'nomor',
                                    flex:1,
                                    allowBlank:false
//                                    readOnly:true
                                },
                                {
                                    xtype:'textfield',
                                    fieldLabel:'Status',
                                    labelAlign:'right',
                                    name:'status',
                                    flex:1,
                                    readOnly:true
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
                                    groupField:'tanggal',
                                    collapsible:true,
                                    margins:'0 10 0 0',
                                    layout:{
                                        type:'vbox',
                                        align:'stretch'
                                    },
                                    items:[
                                        {
                                            xtype:'datefield',
                                            fieldLabel:'Tanggal',
                                            name:'waktuPelaksanaan',
                                            allowBlank:false,
                                            minValue:new Date(),
                                            format:'d F Y'
                                        },
                                        {
                                            xtype:'timefield',
                                            fieldLabel:'Waktu',
                                            name:'waktuPelaksanaan',
                                            anchor:'100%',
                                            format:'H:i',
                                            increment:60,
                                            allowBlank:false
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Lokasi',
                                            name:'lokasi'
                                        },
                                        {
                                            xtype:'textarea',
                                            fieldLabel:'Agenda',
                                            name:'agenda'
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
                                            xtype:'hiddenfield',
                                            name:'pemasokId'
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
                {
                    xtype:'panel',
                    groupField:'gridList',
                    flex:1,
                    layout:{
                        type:'hbox',
                        align:'stretch'
                    },
                    items:[
                        Ext.create('Ifuel.view.pengadaan.pesertaKom.PesertaKomGridPanel', {
                            flex:1
                        }),
                        Ext.create('Ifuel.view.pengadaan.dokumenKom.DokumenKomGridPanel', {
                            flex:1
                        })
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})