Ext.define('Ifuel.view.pengadaan.pjbg.PjbgFormPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pjbgFormPanel',
    title: 'Data PJBG',

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
                    border: 0,
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
                                    flex: 1,
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
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Pemasok',
                                                    name: 'pemasok',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'right',
                                        labelWidth: 150
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nomor',
                                            name: 'nomor'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Status',
                                            name: 'status',
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Tanggal Persetujuan',
                                            name: 'tanggalPersetujuan',
                                            format: 'd F Y',
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    frame: true,
                                    collapsible: true,
                                    margins: '0 10 0 0',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    defaults: {
                                        labelWidth: 160
                                    },
                                    items: [
                                        {
                                            xtype: 'textarea',
                                            fieldLabel: 'Judul',
                                            name: 'judul',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Jenis Kontrak',
                                            name: 'jenisKontrakPjbg',
                                            allowBlank: false,
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'name',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['name'],
                                                data: [
                                                    {"name": "A"},
                                                    {"name": "B"},
                                                    {"name": "C"}
                                                ]
                                            })
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Jenis Gas',
                                            name: 'jenisGas',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'name',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['name'],
                                                data: [
                                                    {"name": "CNG"},
                                                    {"name": "LNG"}
                                                ]
                                            })
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
                                    defaults: {
                                        labelWidth: 130
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Tanggal Mulai',
                                            name: 'tanggalMulai',
                                            format: 'd F Y'
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Tanggal Berakhir',
                                            name: 'tanggalBerakhir',
                                            format: 'd F Y'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Volume Total',
                                            name: 'volumeTotal',
                                            minValue: 0,
                                            hideTrigger: true,
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Volume Sisa',
                                            name: 'volumeSisa',
                                            minValue: 0,
                                            hideTrigger: true,
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    flex: 1,
                    items: [
                        Ext.create('Ifuel.view.pengadaan.hargaGasPjbg.HargaGasPjbgGridPanel', {
                            flex: 1
                        })
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})