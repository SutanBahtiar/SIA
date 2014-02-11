/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 11/04/13
 * Time: 11:14
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.sumberGas.SumberGasFormPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sumberGasFormPanel',
    title: 'Master Sumber Gas',

    autoScroll: true,
    bodyPadding: 5,

    initComponent:function(){
        Ext.apply(this, {
            items: [
                {
                    xtype: 'form',
                    padding: '5 5 0 5',
                    border: false,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            name: 'hboxContainer',
                            flex: 1,
                            layout: 'anchor',
                            defaultType: 'textfield',
                            fieldDefaults: {
                                labelWidth: 150
                            },
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'id'
                                },
                                {
                                    fieldLabel: 'Sumber Gas',
                                    name: 'namaSumberGas',
                                    msgTarget: 'side',
                                    allowBlank: false,
                                    blankText: 'Nama Sumber Gas wajib diisi.'
                                },
                                {
                                    fieldLabel: 'Lokasi',
                                    name: 'lokasi',
                                    msgTarget: 'side',
                                    allowBlank: false,
                                    blankText: 'Lokasi wajib diisi.'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Jenis Gas',
                                    name: 'jenisGas',
                                    store: [
                                        ['CNG', 'CNG'],
                                        ['LNG', 'LNG'],
                                        ['LPG', 'LPG']
                                    ]
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Perkiraan Volume',
                                    name: 'perkiraanVol',
                                    hideTrigger: true,
                                    msgTarget: 'side',
                                    allowBlank: false,
                                    blankText: 'Perkiraan volume gas wajib diisi.'
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Latitude',
                                    name: 'latitude',
                                    hideTrigger: true,
                                    decimalPrecision: 7
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Longitude',
                                    name: 'longitude',
                                    hideTrigger: true,
                                    decimalPrecision: 7
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