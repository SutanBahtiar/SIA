Ext.define('Ifuel.view.pengadaan.keyterms.KeytermsFormPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.keytermsFormPanel',
    title: 'Data Keytems Agreement',

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
                                    flex:1,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    defaults:{
                                        labelAlign: 'right',
                                        labelWidth: 150
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nomor',
                                            name: 'nomor',
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Status',
                                            name: 'status',
                                            readOnly: true
                                        },
                                        {
                                            xtype:'datefield',
                                            fieldLabel:'Tanggal Persetujuan',
                                            name:'tanggalPersetujuan',
                                            format:'d F Y',
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                Ext.create('Ifuel.view.pengadaan.isuKeyterms.SimpleIsuKeytermsGridPanel', {
                    flex:1,
                    minHeight:200
                })
            ]
        });
        this.callParent(arguments);
    }
})