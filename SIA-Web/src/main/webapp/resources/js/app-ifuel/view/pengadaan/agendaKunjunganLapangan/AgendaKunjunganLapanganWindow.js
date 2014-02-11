Ext.define('Ifuel.view.pengadaan.agendaKunjunganLapangan.AgendaKunjunganLapanganWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.agendaKunjunganLapanganWindow',

    title: 'Edit Agenda Kunjungan Lapangan',
    layout: 'fit',
    autoShow: true,
    resizable: false,
    modal: true,

    dataKunjunganLapangan: null,

    initComponent: function () {
        var me = this;
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                defaults: {
//                    width:400
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id'
                    },
                    {
                        xtype: 'datefield',
                        anchor: '100%',
                        fieldLabel: 'Tanggal',
                        name: 'tanggalKunjungan',
                        format: 'd F Y',
                        allowBlank: false
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'timefield',
                                fieldLabel: 'Pukul',
                                name: 'waktuAwalKunjungan',
                                anchor: '100%',
                                format: 'H:i',
                                increment: 60,
                                allowBlank: false,
                                listeners: {
                                    change: function (timefield, newValue) {
                                        timefield.up("fieldcontainer").down('timefield[name=waktuAkhirKunjungan]').setMinValue(newValue);
                                    }
                                }
                            },
                            {
                                xtype: 'timefield',
                                fieldLabel: '-',
                                name: 'waktuAkhirKunjungan',
                                anchor: '100%',
                                format: 'H:i',
                                labelSeparator: '',
                                labelAlign: 'center',
                                labelWidth: 5,
                                increment: 60,
                                allowBlank: false
                            }
                        ]
                    },
                    {
                        xtype: 'combobox',
                        anchor: '100%',
                        fieldLabel: 'Tujuan',
                        name: 'tujuanKunjungan',
                        width: 400,
                        allowBlank: false,
                        editable: false,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'name',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name'],
                            data: [
                                {"name": "Sumber Gas"},
                                {"name": "Pembangkit"},
                                {"name": "Jalur Pipa"},
                                {"name": "Titik Serah"},
                                {"name": "Lain-lain"}
                            ]
                        }),
                        listeners: {
                            change: function (combo, newValue, oldValue, eOpts) {
                                var textfield = me.down("textfield[name=lokasiKunjungan]");
                                textfield.setValue("");
                                if (!Ext.isEmpty(me.dataKunjunganLapangan)) {
                                    if (newValue == "Sumber Gas") {
                                        textfield.setValue(me.dataKunjunganLapangan.trPotensiGas.tmSumberGas.namaSumberGas);
                                    } else if (newValue == "Pembangkit") {
                                        textfield.setValue(me.dataKunjunganLapangan.trPotensiGas.tmPltgm.namaPltgm);
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        anchor: '100%',
                        fieldLabel: 'Lokasi',
                        name: 'lokasiKunjungan',
                        width: 400,
                        allowBlank: false
                    },
                    {
                        xtype: 'textareafield',
                        anchor: '100%',
                        fieldLabel: 'Kegiatan',
                        width: 400,
                        name: 'kegiatan',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        anchor: '100%',
                        fieldLabel: 'Keterangan',
                        width: 400,
                        name: 'keterangan',
                        allowBlank: false
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});