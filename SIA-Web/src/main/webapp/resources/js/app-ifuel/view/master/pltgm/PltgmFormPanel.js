/**
 * Created with IntelliJ IDEA.
 * User: BayuFrioGS
 * Date: 08/05/13
 * Time: 15:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.pltgm.PltgmFormPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pltgmFormPanel',
    title: 'Master PLTGU',

    autoScroll: true,
    bodyPadding: 5,

    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'form',
                    padding: '5 5 0 5',
                    border: false,
                    defaultType: 'textfield',
                    fieldDefaults: {
                        labelWidth: 150
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            name: 'hboxContainer',
                            items: [
                                {
                                    xtype:'hiddenfield',
                                    name: 'id'
                                },
                                {
                                    xtype: 'container',
                                    name: 'leftContainer',
                                    flex: 1,
                                    layout: 'anchor',
                                    defaultType: 'textfield',
                                    fieldDefaults: {
                                        labelWidth: 150
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Nama',
                                            name: 'namaPltgm',
                                            allowBlank: false,
                                            msgTarget: 'side',
                                            blankText: 'Nama pembangkit wajib diisi.'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Jenis Pembangkit',
                                            name: 'jenisPltgm',
                                            store: [
                                                ['PLTG', 'PLTG'],
                                                ['PLTGU', 'PLTGU']
                                            ],
                                            editable: false
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Kapasitas Total (MW)',
                                            name: 'kapasitasProd',
                                            allowBlank: false,
                                            msgTarget: 'side',
                                            blankText: 'Kapasitas wajib diisi.',
                                            hideTrigger: true,
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false
                                        },
                                        {
                                            fieldLabel: 'Lokasi',
                                            name: 'namaLokasi',
                                            allowBlank: false,
                                            msgTarget: 'side',
                                            blankText: 'Lokasi wajib diisi.'
                                        },
                                        {
                                            fieldLabel: 'Alamat Pembangkit',
                                            name: 'alamatPltgm'
                                        },
                                        {
                                            fieldLabel: 'Kota',
                                            name: 'kotaPltgm'
                                        },
                                        {
                                            fieldLabel: 'Provinsi',
                                            name: 'provinsiPltgm'
                                        },
                                        {
                                            fieldLabel: 'Kode Pos',
                                            name: 'kodePosPltgm'
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            groupField: 'grpRegion',
                                            border: 0,
                                            layout: {
                                                type: 'hbox',
                                                align:'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'hiddenfield',
                                                    name: 'regionId'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Region',
                                                    labelWidth: 150,
                                                    name: 'region',
//                                                    flex: 1,
                                                    allowBlank: false,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'button',
                                                    action: 'searchRegion',
                                                    iconCls: 'fam-zoom'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    name: 'rightContainer',
                                    flex: 1,
                                    layut: 'anchor',
                                    defaultType: 'textfield',
                                    fieldDefaults: {
                                        labelWidth: 220
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Nama GM',
                                            name: 'namaGm'
                                        },
                                        {
                                            xtype: 'datefield',
                                            name: 'periodeAkhirGm',
                                            fieldLabel: 'Periode Akhir GM',
//                                            minValue:new Date(),
                                            format:'d F Y'
                                        },
                                        {
                                            fieldLabel: 'Nama Manager Bid. Prod.',
                                            name: 'namaMbprod'
                                        },
                                        {
                                            xtype: 'datefield',
                                            name: 'periodeAkhirMbprod',
                                            fieldLabel: 'Periode Akhir Manager Bid. Prod.',
//                                            minValue:new Date(),
                                            format:'d F Y'
                                        },
                                        {
                                            fieldLabel: 'Nama DM Kit',
                                            name: 'namaDmkit'
                                        },
                                        {
                                            xtype: 'datefield',
                                            name: 'periodeAkhirDmkit',
                                            fieldLabel: 'Periode Akhir DM Kit',
//                                            minValue:new Date(),
                                            format:'d F Y'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})