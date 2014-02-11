Ext.define('Ifuel.view.perencanaan.statusPotensiGas.StatusPotensiGasFormPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.statusPotensiGasFormPanel',
    title:'Data Potensi Gas',

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
                    style:'background-color: #fff;',
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
                            xtype:'textfield',
                            fieldLabel:'Status',
                            name:'statusPotensiGas',
                            anchor:'100%',
                            readOnly:true
                        },
                        {
                            xtype:'fieldcontainer',
                            layout:{
                                type:'hbox',
                                align:'stretchmax'
                            },
                            items:[
                                {
                                    xtype:'fieldset',
                                    title:'Data Sumber Gas',
                                    flex:1,
                                    margins:'0 10 0 0',
                                    layout:{
                                        type:'vbox',
                                        align:'stretch'
                                    },
                                    items:[
                                        {
                                            xtype:'fieldcontainer',
                                            groupField:'grpSumberGas',
                                            border: 0,
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'hiddenfield',
                                                    name: 'sumberGasId'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Sumber Gas',
                                                    name: 'namaSumberGas',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'button',
                                                    action: 'searchSumberGas',
                                                    iconCls: 'fam-zoom'
                                                }
                                            ]
                                        },
                                        /*{
                                            xtype:'textfield',
                                            fieldLabel:'Sumber Gas',
                                            name:'namaSumberGas',
                                            readOnly:true
                                        },*/
                                        {
                                            xtype:'fieldcontainer',
                                            groupField:'grpPemasok',
                                            border: 0,
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'hiddenfield',
                                                    name: 'pemasokId'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Pemasok',
                                                    name: 'namaPemasok',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'button',
                                                    action: 'searchPemasok',
                                                    iconCls: 'fam-zoom'
                                                }
                                            ]
                                        },
                                        /*{
                                            xtype:'textfield',
                                            fieldLabel:'Pemasok',
                                            name:'namaPemasok',
                                            readOnly:true

                                        }, */
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Lokasi',
                                            name:'lokasiSumberGas',
                                            readOnly:true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Jenis Gas',
                                            name:'jenisGas',
                                            readOnly:true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Perkiraan Volume',
                                            name:'perkiraanVolGas',
                                            readOnly:true
                                        }
                                    ]
                                },
                                {
                                    xtype:'fieldset',
                                    title:'Data PLTG',
                                    flex:1,
                                    layout:{
                                        type:'vbox',
                                        align:'stretch'
                                    },
                                    items:[
                                        {
                                            xtype:'fieldcontainer',
                                            groupField:'grpPltgm',
                                            border: 0,
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'hiddenfield',
                                                    name: 'pltgmId'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'PLTG',
                                                    name: 'namaPltgm',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'button',
                                                    action: 'searchPltgm',
                                                    iconCls: 'fam-zoom'
                                                }
                                            ]
                                        },
                                        /*{
                                            xtype:'textfield',
                                            fieldLabel:'PLTG',
                                            name:'namaPltgm',
                                            readOnly:true
                                        },*/
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Lokasi',
                                            name:'namaLokasi',
                                            readOnly:true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kapasitas (MW)',
                                            name:'kapasitasProd',
                                            readOnly:true
                                        },
                                        {
                                            xtype:'datefield',
                                            fieldLabel:'Tanggal COD',
                                            name:'tanggalCod',
                                            format:'d F Y',
                                            readOnly:true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                Ext.create('Ifuel.view.perencanaan.dokPotensiGas.DokPotensiGasGridPanel', {
                    padding:'0 0 0 0',
                    flex:1
                })
            ]
        });
        this.callParent(arguments);
    }
})