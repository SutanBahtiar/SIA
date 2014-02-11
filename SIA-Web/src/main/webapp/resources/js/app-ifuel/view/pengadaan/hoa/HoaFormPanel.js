Ext.define('Ifuel.view.pengadaan.hoa.HoaFormPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hoaFormPanel',
    title: 'Data HoA',

    autoScroll: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'form',
                    border:0,
                    padding: '5 5 0 5',
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'id'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    flex:1,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            groupField: 'mou',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'hiddenfield',
                                                    name: 'mouId'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'MoU',
                                                    name: 'mou',
                                                    anchor: '100%',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'button',
                                                    action: 'mouSearch',
                                                    iconCls: 'fam-zoom'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Pembangkit',
                                                    name: 'pembangkit',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Sumber Gas',
                                                    name: 'sumberGas',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex:1,
                                    layout: {
                                        type: 'vbox'
//                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nomor',
                                            labelAlign: 'right',
                                            name: 'nomor',
                                            width: '98%',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Status',
                                            labelAlign: 'right',
                                            name: 'status',
                                            width: '98%',
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Bahasa',
                                            labelAlign: 'right',
                                            name: 'bahasa',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'name',
                                            width: '98%',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['name'],
                                                data: [
                                                    {"name": "INDONESIA"},
                                                    {"name": "INDONESIA-INGGRIS"}
                                                ]
                                            })
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Judul',
                            collapsible: true,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textarea',
                                    fieldLabel: 'Indonesia',
                                    name:'judulIndonesia',
                                    allowBlank:false,
                                    flex: 1
                                },
                                {
                                    xtype: 'textarea',
                                    labelAlign: 'right',
                                    fieldLabel: 'English',
                                    name:'judulEnglish',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            groupField: 'fieldset',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    frame: true,
                                    groupField: 'instansi',
                                    collapsible: true,
                                    margins:'0 10 0 0',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    defaults:{
                                        labelWidth:160
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Instansi Pihak-1',
                                            name: 'instansiPihak1',
                                            allowBlank: false,
                                            readOnly:true
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Instansi Pihak-2',
                                            name: 'instansiPihak2',
                                            allowBlank: false,
                                            readOnly:true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    frame: true,
                                    groupField: 'persetujuan',
                                    collapsible: true,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    defaults:{
                                        labelWidth:130,
                                        readOnly:true
                                    },
                                    items: [
                                        {
                                            xtype:'datefield',
                                            fieldLabel:'Tanggal Persetujuan',
                                            name:'tglHoa',
                                            format:'d F Y'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Disetujui Oleh',
                                            name: 'disetujuiOleh'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Jabatan',
                                            name: 'jabatanPersetujuan'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Keterangan',
                                            name: 'keteranganPersetujuan'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Pembukaan',
                            collapsible: true,
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textarea',
                                    fieldLabel: 'Indonesia',
                                    name:'pembukaanIndonesia',
                                    allowBlank:false,
                                    flex: 1
                                },
                                {
                                    xtype: 'textarea',
                                    labelAlign: 'right',
                                    fieldLabel: 'English',
                                    name:'pembukaanEnglish',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                },
                Ext.create('Ifuel.view.master.document.DocumentGridPanel', {
                    flex:1,
                    minHeight:200
                })
            ]
        });
        this.callParent(arguments);
    }
})