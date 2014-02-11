Ext.define('Ifuel.view.pengadaan.kunjunganLapangan.KunjunganLapanganFormPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.kunjunganLapanganFormPanel',
    title:'Data Kunjungan Lapangan',

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
                                    fieldLabel:'No.',
                                    name:'noKunjunganLapangan',
                                    flex:1,
                                    readOnly:true
                                },
                                {
                                    xtype:'textfield',
                                    fieldLabel:'Status',
                                    labelAlign:'right',
                                    name:'statusKunjungan',
                                    flex:1,
                                    anchor:'100%',
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
                                    collapsible:true,
                                    margins:'0 10 0 0',
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
                                },
                                {
                                    xtype:'fieldset',
                                    flex:1,
                                    frame:true,
                                    groupField:'tanggal',
                                    collapsible:true,
                                    layout:{
                                        type:'vbox',
                                        align:'stretch'
                                    },
                                    items:[
                                        {
                                            xtype:'datefield',
                                            fieldLabel:'Tanggal Awal',
                                            name:'tglAwalKunjungan',
                                            allowBlank:false,
                                            minValue:new Date(),
                                            format:'d F Y'
                                        },
                                        {
                                            xtype:'datefield',
                                            fieldLabel:'Tanggal Akhir',
                                            name:'tglAkhirKunjungan',
                                            allowBlank:false,
                                            minValue:new Date(),
                                            format:'d F Y'
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
                        Ext.create('Ifuel.view.pengadaan.pesertaKunjunganLapangan.PesertaKunjunganLapanganGridPanel', {
                            flex:1
                        }),
                        Ext.create('Ifuel.view.pengadaan.dokumenKunjunganLapangan.DokumenKunjunganLapanganGridPanel', {
                            flex:1
                        })
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})