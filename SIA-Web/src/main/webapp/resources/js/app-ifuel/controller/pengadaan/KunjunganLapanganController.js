Ext.define('Ifuel.controller.pengadaan.KunjunganLapanganController', {
    extend: 'Ext.app.Controller',
//        allowWrite:Rima.util.SecurityHelper.isWriteAllowed("ANAK_PERUSAHAAN_WRITE"),
    allowWrite: true,

    views: [
        'pengadaan.kunjunganLapangan.KunjunganLapanganPanel',
        'Ifuel.view.master.person.PersonWindowChooser',
        'Ifuel.view.perencanaan.potensiGas.PotensiGasWindowChooser',
        'Ifuel.view.pengadaan.agendaKunjunganLapangan.AgendaKunjunganLapanganWindow',
        'Ifuel.view.pengadaan.pesertaKunjunganLapangan.PesertaKunjunganLapanganWindowChooser',
        'Ifuel.view.email.SendEmailWindow',
        'Ifuel.view.pengadaan.kunjunganLapangan.ChangeStatusKunjunganLapanganWindow',
        'Ifuel.view.pengadaan.dokumenKunjunganLapangan.DokumenKunjunganLapanganWindow'
    ],
    models: [],
    stores: [],

    /**
     * Field ini adalah data kunjungan yang dipilih untuk ditampilkan di form.
     * Jika ada data pada grid panel di-double click, data tersebut di-assign ke field ini.
     * Jika setelah save data baru/update/change status, data yang disave akan diambil dari server dan di-assign ke field ini.
     * Field ini akan di-assign null jika: menekan tombol new.
     */
    data: null,

    refs: [
        //selector untuk bagian TrKunjunganLapangan
        {
            ref: 'kunjunganLapanganTabPanel',
            selector: 'kunjunganLapanganPanel tabpanel'
        },
        {
            ref: 'kunjunganLapanganGridPanel',
            selector: 'kunjunganLapanganPanel tabpanel kunjunganLapanganGridPanel'
        },
        {
            ref: 'kunjunganLapanganFormPanel',
            selector: 'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel'
        },
        {
            ref: 'kunjunganLapanganFormPanelForm',
            selector: 'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel form'
        },
        {
            ref: 'rangkumanKegiatanFormPanel',
            selector: 'kunjunganLapanganPanel tabpanel rangkumanKegiatanFormPanel'
        },
        {
            ref: 'potensiGasWindowChooser',
            selector: 'potensiGasWindowChooser[parentName=kunjunganLapangan]'
        },
        {
            ref: 'sendEmailWindow',
            selector: 'sendEmailWindow[parentName=kunjunganLapangan]'
        },
        {
            ref: 'changeStatusKunjunganLapanganWindow',
            selector: 'changeStatusKunjunganLapanganWindow[parentName=kunjunganLapangan]'
        },

        //selector untuk bagian TrPesertaKunjungan
        {
            ref: 'pesertaKunjunganLapanganGridPanel',
            selector: 'kunjunganLapanganPanel > tabpanel > kunjunganLapanganFormPanel > panel[groupField=gridList] > pesertaKunjunganLapanganGridPanel'
        },
        {
            ref: 'personWindowChooser',
            selector: 'personWindowChooser[parentName=kunjunganLapangan]'
        },

        //selector untuk bagian TrDokKunjLap
        {
            ref: 'dokumenKunjunganLapanganGridPanel',
            selector: 'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] dokumenKunjunganLapanganGridPanel'
        },
        {
            ref: 'dokumenKunjunganLapanganWindow',
            selector: 'dokumenKunjunganLapanganWindow[parentName=kunjunganLapangan]'
        },

        //selector untuk bagian TrAgendaKunjungan
        {
            ref: 'agendaKunjunganLapanganPanel',
            selector: 'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel'
        },
        {
            ref: 'agendaKunjunganLapanganGridPanel',
            selector: 'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel agendaKunjunganLapanganGridPanel'
        },
        {
            ref: 'agendaKunjunganLapanganWindow',
            selector: 'agendaKunjunganLapanganWindow'
        },
        {
            ref: 'agendaKunjunganLapanganWindowForm',
            selector: 'agendaKunjunganLapanganWindow form'
        },

        //selector untuk bagian peserta TrAgendaKunjungan
        {
            ref: 'pesertaAgendaKunjunganLapanganGridPanel',
            selector: 'kunjunganLapanganPanel > tabpanel > agendaKunjunganLapanganPanel > pesertaKunjunganLapanganGridPanel'
        },
        {
            ref: 'pesertaKunjunganLapanganWindowChooser',
            selector: 'pesertaKunjunganLapanganWindowChooser[parentName=kunjunganLapangan]'
        },
        
        //POTENSI GAS
        {
            ref:'statusPotensiGasGridPanel',
            selector:'pengadaanPotensiGasPanel tabpanel statusPotensiGasGridPanel'
        }
    ],

    init: function () {
        this.control({
            'kunjunganLapanganPanel tabpanel kunjunganLapanganGridPanel': {
                itemdblclick: this.kunjunganLapanganGridItemdblclick,
                show: this.kunjunganLapanganGridShow
            },
            'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] dokumenKunjunganLapanganGridPanel': {
                itemdblclick: this.dokumenKunjunganLapanganGridItemdblclick
            },
            'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel agendaKunjunganLapanganGridPanel': {
                itemdblclick: this.agendaKunjunganLapanganGridItemdblclick,
                selectionchange: this.agendaKunjunganLapanganGridSelectionChange
            },
            'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel pesertaKunjunganLapanganGridPanel': {
                afterrender: function (panel) {
                    panel.down("button[action=new]").setDisabled(true);
                    panel.down("button[action=delete]").setDisabled(true);
                }
            }
        });
        if (this.allowWrite) {
            this.control({
                //segala hal yang berhubungan dengan tabel TrKunjunganLapangan
                'kunjunganLapanganPanel tabpanel kunjunganLapanganGridPanel': {
                    selectionchange: this.kunjunganLapanganGridSelectionChange
                },
                'kunjunganLapanganPanel > tabpanel > toolbar button[action=new]': {
                    click: this.kunjunganLapanganButtonNewClick
                },
                'kunjunganLapanganPanel > tabpanel > toolbar button[action=save]': {
                    click: this.kunjunganLapanganButtonSaveClick
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel form fieldcontainer[groupField=potensiGas] button[action=search]': {
                    click: this.kunjunganLapanganButtonPotensiGasSearchClick
                },
                'potensiGasWindowChooser[parentName=kunjunganLapangan] potensiGasGridPanel': {
                    itemdblclick: this.kunjunganLapanganPotensiGasGridItemdblclick
                },
                'kunjunganLapanganPanel > tabpanel > toolbar button[action=changestatus]': {
                    click: this.kunjunganLapanganButtonChangestatusClick
                },
                'changeStatusKunjunganLapanganWindow[parentName=kunjunganLapangan] button[action=save]': {
                    click: this.kunjunganLapanganChangestatusButtonSaveClick
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel fieldcontainer[groupField=fieldset] fieldset[groupField=tanggal] datefield[name=tglAwalKunjungan]': {
                    change: this.kunjunganLapanganTglAwalDatefieldChange
                },
                'kunjunganLapanganPanel > tabpanel > toolbar button[action=undang]': {
                    click: this.kunjunganLapanganButtonUndangClick
                },
                'sendEmailWindow[parentName=kunjunganLapangan] button[action=send]': {
                    click: this.kunjunganLapanganUndangButtonSendClick
                },

                //segala hal yang berhubungan dengan tabel TrPesertaKunjungan
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] > pesertaKunjunganLapanganGridPanel': {
                    selectionchange: this.pesertaKunjunganLapanganGridSelectionChange
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] > pesertaKunjunganLapanganGridPanel button[action=new]': {
                    click: this.pesertaKunjunganLapanganButtonNewClick
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] > pesertaKunjunganLapanganGridPanel button[action=delete]': {
                    click: this.pesertaKunjunganLapanganButtonDeleteClick
                },
                'personWindowChooser[parentName=kunjunganLapangan] button[action=save]': {
                    click: this.pesertaKunjunganLapanganWindowButtonSaveClick
                },

                //segala hal yang berhubungan dengan tabel TrDokKunjLap
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] dokumenKunjunganLapanganGridPanel': {
                    selectionchange: this.dokumenKunjunganLapanganGridSelectionChange
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] dokumenKunjunganLapanganGridPanel button[action=new]': {
                    click: this.dokumenKunjunganLapanganButtonNewClick
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] dokumenKunjunganLapanganGridPanel button[action=delete]': {
                    click: this.dokumenKunjunganLapanganButtonDeleteClick
                },
                'dokumenKunjunganLapanganWindow[parentName=kunjunganLapangan] button[action=save]': {
                    click: this.dokumenKunjunganLapanganWindowButtonSaveClick
                },

                //segala hal yang berhubungan dengan tabel TrAgendaKunjungan
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel': {
//                    selectionchange: this.agendaKunjunganLapanganGridSelectionChange
                },
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel agendaKunjunganLapanganGridPanel button[action=new]': {
                    click: this.agendaKunjunganLapanganButtonNewClick
                },
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel agendaKunjunganLapanganGridPanel button[action=delete]': {
                    click: this.agendaKunjunganLapanganButtonDeleteClick
                },
                'agendaKunjunganLapanganWindow button[action=save]': {
                    click: this.agendaKunjunganLapanganWindowButtonSaveClick
                },

                //segala hal yang berhubungan dengan tabel peserta TrAgendaKunjungan
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel pesertaKunjunganLapanganGridPanel': {
                    selectionchange: this.pesertaAgendaKunjunganLapanganGridSelectionChange
                },
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel pesertaKunjunganLapanganGridPanel button[action=new]': {
                    click: this.pesertaAgendaKunjunganLapanganButtonNewClick
                },
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel pesertaKunjunganLapanganGridPanel button[action=delete]': {
                    click: this.pesertaAgendaKunjunganLapanganButtonDeleteClick
                },
                'pesertaKunjunganLapanganWindowChooser button[action=save]': {
                    click: this.pesertaAgendaKunjunganLapanganWindowButtonSaveClick
                }
            });
        } else {
            this.control({
                'kunjunganLapanganPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
//                        panel.down("button[action=delete]").setDisabled(true);
                        panel.down("button[action=undang]").setDisabled(true);
                        panel.down("button[action=changestatus]").setDisabled(true);
                    }
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] pesertaKunjunganLapanganGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] dokumenKunjunganLapanganGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel agendaKunjunganLapanganGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'agendaKunjunganLapanganWindow': {
                    show: function (window) {
                        window.down("button[action=save]").setDisabled(true);
                    }
                }
            });
        }
    },

    // ---- PESERTA AGENDA KUNJUNGAN LAPANGAN --------------------------------------------------------------------------

    pesertaAgendaKunjunganLapanganGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(this.data);
        if (this.allowWrite && selected[0] && ('BARU' == lastStatus || 'KUNJUNGAN' == lastStatus)) {
            this.togglePesertaAgendaKunjunganLapanganDeleteButton(true);
        } else {
            this.togglePesertaAgendaKunjunganLapanganDeleteButton(false);
        }
    },

    pesertaAgendaKunjunganLapanganButtonDeleteClick: function (button) {
        var recordPeserta = this.getPesertaAgendaKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        var recordAgenda = this.getAgendaKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (recordPeserta && recordAgenda) {
            Ext.Ajax.request({
                url: Ifuel.config.pesertaKunjunganUrl + recordPeserta.data.id + '/fromAgendaKunjungan/' + recordAgenda.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getPesertaAgendaKunjunganLapanganGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Peserta Agenda Kunjungan Lapangan');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Peserta Agenda Kunjungan Lapangan');
                }
            });
        }
    },

    pesertaAgendaKunjunganLapanganButtonNewClick: function () {
        var record = this.getAgendaKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        if (record) {
            var personWindowChooser = Ext.widget('pesertaKunjunganLapanganWindowChooser', {parentName: 'kunjunganLapangan'});
            personWindowChooser.setUrl(Ifuel.config.pesertaKunjunganUrl + '/byNotInAgendaKunjungan/' + record.data.id);
        }
    },

    pesertaAgendaKunjunganLapanganWindowButtonSaveClick: function (button) {
        var me = this;
        var agendaId = this.getAgendaKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0].data.id;
        var records = this.getPesertaKunjunganLapanganWindowChooser().down('pesertaKunjunganLapanganGridPanel').getSelectionModel().getSelection();
        var datas = [];
        Ext.Array.forEach(records, function (record, i) {
            var data = {
                id: record.data.id
            }
            datas.push(data);
        });

        this.getPesertaKunjunganLapanganWindowChooser().close();
        Ext.Ajax.request({
            url: Ifuel.config.pesertaKunjunganUrl + "/addAllToAgendaKunjungan/" + agendaId,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode(datas),
            success: function (response, options) {
                me.getPesertaAgendaKunjunganLapanganGridPanel().getStore().reload();
                
                if(me.getStatusPotensiGasGridPanel !== null) {
                    me.getStatusPotensiGasGridPanel().getStore().reload();
                }
                
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Peserta Agenda Kunjungan Lapangan');
            },
            failure: function (response, options) {
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Peserta Agenda Kunjungan Lapangan');
            }
        });
    },

    togglePesertaAgendaKunjunganLapanganDeleteButton: function (enable) {
        if (enable) {
            this.getPesertaAgendaKunjunganLapanganGridPanel().down('button[action=delete]').enable();
        } else {
            this.getPesertaAgendaKunjunganLapanganGridPanel().down('button[action=delete]').disable();
        }
    },

    // ---- AGENDA KUNJUNGAN LAPANGAN ----------------------------------------------------------------------------------

    agendaKunjunganLapanganGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(this.data);

        this.getPesertaAgendaKunjunganLapanganGridPanel().down('button[action=new]').disable();
        this.toggleAgendaKunjunganLapanganDeleteButton(false);
        if (selected[0]) {
            this.reloadPesertaAgendaKunjunganLapanganGrid(selected[0].data.id);
            if (this.allowWrite && ('BARU' == lastStatus || 'KUNJUNGAN' == lastStatus)) {
                this.getPesertaAgendaKunjunganLapanganGridPanel().down('button[action=new]').enable();
                this.toggleAgendaKunjunganLapanganDeleteButton(true);
            }
        } else {
            this.reloadPesertaAgendaKunjunganLapanganGrid(null);
        }
    },

    agendaKunjunganLapanganButtonDeleteClick: function (button) {
        var record = this.getAgendaKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.agendaKunjunganUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getAgendaKunjunganLapanganGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Agenda Kunjungan Lapangan');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Agenda Kunjungan Lapangan');
                }
            });
        }
    },

    agendaKunjunganLapanganGridItemdblclick: function (o, record) {
        var kunjunganLapanganFormPanelForm = this.getKunjunganLapanganFormPanelForm();
        var view = Ext.widget('agendaKunjunganLapanganWindow', {dataKunjunganLapangan: this.data});
        view.down('form').loadRecord(record);
        var datefield = view.down('datefield[name=tanggalKunjungan]');
        datefield.setValue(record.data.waktuAwalKunjungan);
        datefield.setMinValue(kunjunganLapanganFormPanelForm.down('datefield[name=tglAwalKunjungan]').getValue());
        datefield.setMaxValue(kunjunganLapanganFormPanelForm.down('datefield[name=tglAkhirKunjungan]').getValue());
    },

    agendaKunjunganLapanganButtonNewClick: function () {
        var kunjunganLapanganFormPanelForm = this.getKunjunganLapanganFormPanelForm();
        var view = Ext.widget('agendaKunjunganLapanganWindow', {dataKunjunganLapangan: this.data});
        var datefield = view.down('datefield[name=tanggalKunjungan]');
        datefield.setMinValue(kunjunganLapanganFormPanelForm.down('datefield[name=tglAwalKunjungan]').getValue());
        datefield.setMaxValue(kunjunganLapanganFormPanelForm.down('datefield[name=tglAkhirKunjungan]').getValue());
    },

    agendaKunjunganLapanganWindowButtonSaveClick: function (button) {
        var me = this;
        var form = this.getAgendaKunjunganLapanganWindowForm();
        var values = form.getValues();
        var record = form.getRecord();

        var waktuAwalKunjungan = Ext.Date.parse(values.tanggalKunjungan, 'd F Y');
        var waktuAkhirKunjungan = Ext.Date.parse(values.tanggalKunjungan, 'd F Y');
        var timeAwal = values.waktuAwalKunjungan.split(':');
        var timeAkhir = values.waktuAkhirKunjungan.split(':');
        waktuAwalKunjungan.setHours(new Number(timeAwal[0]), new Number(timeAwal[1]));
        waktuAkhirKunjungan.setHours(new Number(timeAkhir[0]), new Number(timeAkhir[1]));
        var data = {
            id: record ? values.id : null,
            waktuAwalKunjungan: Ext.Date.format(waktuAwalKunjungan, 'c'),
            waktuAkhirKunjungan: Ext.Date.format(waktuAkhirKunjungan, 'c'),
            tujuanKunjungan: values.tujuanKunjungan,
            lokasiKunjungan: values.lokasiKunjungan,
            kegiatan: values.kegiatan,
            keterangan: values.keterangan,
            tambahSummary: false,
            trKunjunganLapangan: {
                id: me.data.id
            }
        };

        if (form.getForm().isValid()) {
            if (data.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.agendaKunjunganUrl + record.data.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function (response, options) {
                        me.getAgendaKunjunganLapanganGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Agenda Kunjungan Lapangan');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Agenda Kunjungan Lapangan');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.agendaKunjunganUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function (response, options) {
                        me.getAgendaKunjunganLapanganGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Agenda Kunjungan Lapangan');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Agenda Kunjungan Lapangan');
                    }
                });
            }
            this.getAgendaKunjunganLapanganWindow().close();
        }
    },

    toggleAgendaKunjunganLapanganDeleteButton: function (enable) {
        if (enable) {
            this.getAgendaKunjunganLapanganGridPanel().down('button[action=delete]').enable();
        } else {
            this.getAgendaKunjunganLapanganGridPanel().down('button[action=delete]').disable();
        }
    },

    // ---- DOKUMEN KUNJUNGAN LAPANGAN ---------------------------------------------------------------------------------

    dokumenKunjunganLapanganGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(this.data);
        if (this.allowWrite && selected[0] && ('BARU' == lastStatus || 'KUNJUNGAN' == lastStatus)) {
            this.toggleDokumenKunjunganLapanganDeleteButton(true);
        } else {
            this.toggleDokumenKunjunganLapanganDeleteButton(false);
        }
    },

    dokumenKunjunganLapanganButtonDeleteClick: function (button) {
        var record = this.getDokumenKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.dokumenKunjunganLapanganUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getDokumenKunjunganLapanganGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Dokumen Kunjungan Lapangan');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Dokumen Kunjungan Lapangan');
                }
            });
        }
    },

    dokumenKunjunganLapanganButtonNewClick: function () {
        Ext.widget('dokumenKunjunganLapanganWindow', {parentName: 'kunjunganLapangan'});
        this.getDokumenKunjunganLapanganWindow().down('hiddenfield[name=idTrKunjunganLapangan]').setValue(this.data.id);
    },

    dokumenKunjunganLapanganWindowButtonSaveClick: function (button) {
        var me = this;
        var form = this.getDokumenKunjunganLapanganWindow().down('form');

        if (form.getForm().isValid()) {
            form.submit({
                url: Ifuel.config.dokumenKunjunganLapanganUrl + 'upload',
                waitMsg: 'Uploading your document...',
                success: function (form, action) {
                    me.getDokumenKunjunganLapanganGridPanel().getStore().reload();
                    Ext.Msg.alert('Success', 'Dokumen telah berhasil diunggah.');
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    me.getDokumenKunjunganLapanganWindow().close();
                },
                failure: function (form, action) {
                    Ext.Msg.alert('Failed', action.result.msg);
                    me.getDokumenKunjunganLapanganWindow().close();
                }
            })
        }
    },

    dokumenKunjunganLapanganGridItemdblclick: function (o, record) {
        window.open(Ifuel.config.dokumenKunjunganLapanganUrl + 'download/' + record.data.id);
    },

    toggleDokumenKunjunganLapanganDeleteButton: function (enable) {
        if (enable) {
            this.getDokumenKunjunganLapanganGridPanel().down('button[action=delete]').enable();
        } else {
            this.getDokumenKunjunganLapanganGridPanel().down('button[action=delete]').disable();
        }
    },

    // ---- PESERTA KUNJUNGAN LAPANGAN ---------------------------------------------------------------------------------

    pesertaKunjunganLapanganGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(this.data);
        if (this.allowWrite && selected[0] && ('BARU' == lastStatus || 'KUNJUNGAN' == lastStatus)) {
            this.togglePesertaKunjunganLapanganDeleteButton(true);
        } else {
            this.togglePesertaKunjunganLapanganDeleteButton(false);
        }
    },

    pesertaKunjunganLapanganButtonDeleteClick: function (button) {
        var record = this.getPesertaKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.pesertaKunjunganUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getPesertaKunjunganLapanganGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Peserta Kunjungan Lapangan');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Peserta Kunjungan Lapangan');
                }
            });
        }
    },

    pesertaKunjunganLapanganButtonNewClick: function () {
        var personWindowChooser = Ext.widget('personWindowChooser', {parentName: 'kunjunganLapangan'});
        personWindowChooser.setUrl(Ifuel.config.personUrl + '/byAllPln/byPemasok/' + this.data.trPotensiGas.tmPemasok.id
            + '/byNotInKunjunganLapangan/' + this.data.id);
    },

    pesertaKunjunganLapanganWindowButtonSaveClick: function (button) {
        var me = this;
        var records = this.getPersonWindowChooser().down('personGridPanel').getSelectionModel().getSelection();
        var datas = [];
        Ext.Array.forEach(records, function (record, i) {
            var data = {
                id: null,
                hadir: null,
                keterangan: null,
                tmPerson: {id: record.data.id},
                trKunjunganLapangan: {
                    id: me.data.id
                }
            }
            datas.push(data);
        });

        this.getPersonWindowChooser().close();
        Ext.Ajax.request({
            url: Ifuel.config.pesertaKunjunganUrl + "/all/",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode(datas),
            success: function (response, options) {
                me.getPesertaKunjunganLapanganGridPanel().getStore().reload();
                
                if(me.getStatusPotensiGasGridPanel !== null) {
                    me.getStatusPotensiGasGridPanel().getStore().reload();
                }
                
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Peserta Kunjungan Lapangan');
            },
            failure: function (response, options) {
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'PesertaKunjungan Lapangan');
            }
        });
    },

    togglePesertaKunjunganLapanganDeleteButton: function (enable) {
        if (enable) {
            this.getPesertaKunjunganLapanganGridPanel().down('button[action=delete]').enable();
        } else {
            this.getPesertaKunjunganLapanganGridPanel().down('button[action=delete]').disable();
        }
    },

    //---- FUNCTION KUNJUNGAN LAPANGAN ---------------------------------------------------------------------------------

    kunjunganLapanganUndangButtonSendClick: function () {
        var me = this;
        var form = this.getSendEmailWindow().down("form");
        var values = form.getValues();

        if (form.getForm().isValid()) {
            var data = {
                subject: values.subject,
                to: values.to ? values.to.split(',') : null,
                cc: values.cc ? values.cc.split(',') : null,
                bcc: values.bcc ? values.bcc.split(',') : null,
                text: values.text
            }

            Ext.Ajax.request({
                url: Ifuel.config.kunjunganLapanganUrl + me.data.id + "/sendEmail/",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 120000,
                params: Ext.JSON.encode(data),
                success: function (response, options) {
                    me.reshowValueKunjunganLapangan(Ifuel.config.kunjunganLapanganUrl + me.data.id); //bagian ini jangan terbalik
                    me.getKunjunganLapanganGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kirim Undangan Kunjungan Lapangan');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kirim Undangan Kunjungan Lapangan');
                }
            });
            this.getSendEmailWindow().close();
        }
    },

    kunjunganLapanganButtonUndangClick: function () {
        var me = this;
        Ext.Ajax.request({
            url: Ifuel.config.kunjunganLapanganUrl + me.data.id + "/getDefaultMail/",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response, options) {
                var data = Ext.JSON.decode(response.responseText);
                var sendEmailWindow = Ext.widget('sendEmailWindow', {parentName: 'kunjunganLapangan'});
                sendEmailWindow.down("hiddenfield[name=id]").setValue(me.data.id);
                sendEmailWindow.down("textfield[name=to]").setValue(data.to);
                sendEmailWindow.down("textfield[name=cc]").setValue(data.cc);
                sendEmailWindow.down("textfield[name=bcc]").setValue(data.bcc);
                sendEmailWindow.down("textfield[name=subject]").setValue(data.subject);
                sendEmailWindow.down("textfield[name=text]").setValue(data.text);
            },
            failure: function (response, options) {
            }
        });
    },

    kunjunganLapanganTglAwalDatefieldChange: function (datefield, newValue) {
        this.getKunjunganLapanganFormPanelForm().down('datefield[name=tglAkhirKunjungan]').setMinValue(newValue);
    },

    kunjunganLapanganGridShow: function () {
        var kunjunganLapanganGridPanel = this.getKunjunganLapanganGridPanel();
        this.getKunjunganLapanganFormPanel().disable();
        this.getAgendaKunjunganLapanganPanel().disable();
        this.getRangkumanKegiatanFormPanel().disable();

        this.getKunjunganLapanganTabPanel().setActiveTab(kunjunganLapanganGridPanel);

        var records = kunjunganLapanganGridPanel.getSelectionModel().getSelection();
        if (!Ext.isEmpty(records[0])) {
            this.setData(records[0].data);
        } else {
            this.setData(null);
        }
    },

    kunjunganLapanganGridSelectionChange: function (sel, selected) {
        if (!this.getKunjunganLapanganGridPanel().isHidden()) {
            if (selected[0]) {
                this.setData(selected[0].data);
            } else {
                this.setData(null);
            }
        }
    },

    kunjunganLapanganButtonNewClick: function () {
        this.activatedTabForm();  //jangan dibalik
        this.setData(null);
    },

    kunjunganLapanganGridItemdblclick: function (grid, record) {
        this.activatedTabForm(); //jangan dibalik
        this.setData(record.data);
    },

    kunjunganLapanganButtonPotensiGasSearchClick: function () {
        var potensiGasWindowChooser = Ext.widget('potensiGasWindowChooser', {parentName: 'kunjunganLapangan'});
        potensiGasWindowChooser.setUrl(Ifuel.config.potensiGasUrl + '/KunjunganLapangan');
        potensiGasWindowChooser.show();
    },

    kunjunganLapanganPotensiGasGridItemdblclick: function (grid, record) {
        this.showValuePotensiGas(record.data);
        this.getPotensiGasWindowChooser().close();
    },

    kunjunganLapanganButtonSaveClick: function () {
        var me = this;
        var form = this.getKunjunganLapanganFormPanelForm();
        var values = form.getValues();
        var record = form.getRecord();

        var data = {
            id: !Ext.isEmpty(values.id) ? values.id : null,
            tglAwalKunjungan: Ext.Date.format(Ext.Date.parse(values.tglAwalKunjungan, 'd F Y'), 'c'),
            tglAkhirKunjungan: Ext.Date.format(Ext.Date.parse(values.tglAkhirKunjungan, 'd F Y'), 'c'),
            iterasiKunjungan: 5,
            summaryKunjungan: this.getRangkumanKegiatanFormPanel().down('htmleditor').getValue(),
            trPotensiGas: {
                id: values.potensiGasId
            }
        };

        if (form.getForm().isValid()) {
            if (data.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.kunjunganLapanganUrl + data.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function (response, options) {
                        me.getKunjunganLapanganGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        me.reshowValueKunjunganLapangan(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kunjungan Lapangan');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kunjungan Lapangan');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.kunjunganLapanganUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function (response, options) {
                        me.getKunjunganLapanganGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        me.reshowValueKunjunganLapangan(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kunjungan Lapangan');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kunjungan Lapangan');
                    }
                });
            }
        }
    },

    kunjunganLapanganButtonChangestatusClick: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(this.data);
        var window = Ext.widget('changeStatusKunjunganLapanganWindow', {
            parentName: 'kunjunganLapangan', typeComboList: lastStatus == 'KUNJUNGAN' ? 0 : (lastStatus == 'LAPORAN_KUNJUNGAN' ? 1 : null)
        });
    },

    kunjunganLapanganChangestatusButtonSaveClick: function () {
        var me = this;
        var form = this.getChangeStatusKunjunganLapanganWindow().down("form");
        var values = form.getValues();

        if (form.getForm().isValid()) {
            Ext.Ajax.request({
                url: Ifuel.config.kunjunganLapanganUrl + me.data.id + "/changeStatus/" + values.status,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 120000,
                params: Ext.JSON.encode(values.name),
                success: function (response, options) {
                    me.reshowValueKunjunganLapangan(Ifuel.config.kunjunganLapanganUrl + me.data.id); //bagian ini jangan terbalik
                    me.getKunjunganLapanganGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Kunjungan Lapangan');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Kunjungan Lapangan');
                }
            });
            this.getChangeStatusKunjunganLapanganWindow().close();
        }
    },

    reshowValueKunjunganLapangan: function (url) {
        var me = this;
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response, options) {
                var responseData = Ext.JSON.decode(response.responseText);
                responseData.tglAwalKunjungan = Ext.isEmpty(responseData.tglAwalKunjungan) ? null : new Date(responseData.tglAwalKunjungan);
                responseData.tglAkhirKunjungan = Ext.isEmpty(responseData.tglAkhirKunjungan) ? null : new Date(responseData.tglAkhirKunjungan);
                me.setData(responseData);
            },
            failure: function (response, options) {
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kunjungan Lapangan');
            }
        });
    },

    /**
     * memberikan nilai pada data untuk controller ini yang sedang aktif.
     * dipanggil ketika grid kunjunganLapangan di click/dblclick, sukses update data(reshowValueKunjunganLapangan(url)),
     * dan ketika tombol new kunjunganLapangan ditekan(membuat kunjunganLapangan baru -- data adalah null).
     * @param newData
     */
    setData: function (newData) {
        this.data = newData;

        this.buttonDataChange();

        if (this.getKunjunganLapanganGridPanel().isHidden()) {
            this.formDataChange();
            if (!Ext.isEmpty(this.data)) {//jika grid click/dblclick atau update data(reshowValueKunjunganLapangan(url))
                this.showValueKunjunganLapangan();
            } else {//jika data kosong atau buat data baru (tombol new kunjunganLapangan ditekan)
                this.clearValueKunjunganLapangan();
            }
        }
    },

    buttonDataChange: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(this.data);
        var kunjunganLapanganTabPanel = this.getKunjunganLapanganTabPanel();
        var kunjunganLapanganGridPanel = this.getKunjunganLapanganGridPanel();

        var pesertaKunjunganLapanganGridPanel = this.getPesertaKunjunganLapanganGridPanel();
        var dokumenKunjunganLapanganGridPanel = this.getDokumenKunjunganLapanganGridPanel();
        var agendaKunjunganLapanganGridPanel = this.getAgendaKunjunganLapanganGridPanel();
        var pesertaAgendaKunjunganLapanganGridPanel = this.getPesertaAgendaKunjunganLapanganGridPanel();

        kunjunganLapanganTabPanel.down('button[action=changestatus]').disable();
        kunjunganLapanganTabPanel.down('button[action=save]').disable();
        kunjunganLapanganTabPanel.down("button[action=undang]").disable();

        pesertaKunjunganLapanganGridPanel.down('button[action=new]').disable();
        dokumenKunjunganLapanganGridPanel.down('button[action=new]').disable();
        agendaKunjunganLapanganGridPanel.down("button[action=new]").disable();
        pesertaAgendaKunjunganLapanganGridPanel.down("button[action=new]").disable();

        if (this.allowWrite) {
            if (Ext.isEmpty(this.data)) {//jika buat data baru
                if (kunjunganLapanganGridPanel.isHidden()) {
                    kunjunganLapanganTabPanel.down('button[action=save]').enable();
                }
            }

            if ('BARU' == lastStatus) {
                kunjunganLapanganTabPanel.down("button[action=undang]").enable();
            }

            if ('KUNJUNGAN' == lastStatus || 'LAPORAN_KUNJUNGAN' == lastStatus) {
                kunjunganLapanganTabPanel.down('button[action=changestatus]').enable();
            }

            if ('BARU' == lastStatus || 'KUNJUNGAN' == lastStatus) {
                pesertaKunjunganLapanganGridPanel.down('button[action=new]').enable();
                dokumenKunjunganLapanganGridPanel.down('button[action=new]').enable();
                agendaKunjunganLapanganGridPanel.down("button[action=new]").enable();
                pesertaAgendaKunjunganLapanganGridPanel.down("button[action=new]").enable();

                if (kunjunganLapanganGridPanel.isHidden()) {//jika update data pas status BARU / KUNJUNGAN
                    kunjunganLapanganTabPanel.down('button[action=save]').enable();
                }
            }
        }
    },

    formDataChange: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(this.data);
        var form = this.getKunjunganLapanganFormPanelForm();

        form.down('datefield[name=tglAwalKunjungan]').setReadOnly(true);
        form.down('datefield[name=tglAkhirKunjungan]').setReadOnly(true);

        var rangkumanKegiatanFormPanel = this.getRangkumanKegiatanFormPanel();
        rangkumanKegiatanFormPanel.down('htmleditor').setReadOnly(true);

        if (this.allowWrite) {
            if (Ext.isEmpty(lastStatus) || 'BARU' == lastStatus || 'KUNJUNGAN' == lastStatus) {
                form.down('datefield[name=tglAwalKunjungan]').setReadOnly(false);
                form.down('datefield[name=tglAkhirKunjungan]').setReadOnly(false);
            }

            if (lastStatus == "KUNJUNGAN" || lastStatus == "LAPORAN_KUNJUNGAN" || lastStatus == "DISETUJUI" || lastStatus == "KUNJUNGAN_LANJUTAN" || lastStatus == "DIBATALKAN") {
                rangkumanKegiatanFormPanel.enable();
                if (lastStatus == "KUNJUNGAN") {
                    rangkumanKegiatanFormPanel.down('htmleditor').setReadOnly(false);
                }
            }
        }
    },

    clearValueKunjunganLapangan: function () {
        var form = this.getKunjunganLapanganFormPanelForm();

        form.getForm().reset();
        form.down('button[action=search]').enable();

        form.down('datefield[name=tglAwalKunjungan]').setMinValue(new Date());
        form.down('datefield[name=tglAkhirKunjungan]').setMinValue(new Date());
        form.down('datefield[name=tglAwalKunjungan]').clearInvalid();
        form.down('datefield[name=tglAkhirKunjungan]').clearInvalid();

        this.reloadGrid(null);
    },

    showValueKunjunganLapangan: function () {
        var form = this.getKunjunganLapanganFormPanelForm();
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(this.data);

        form.down('textfield[name=noKunjunganLapangan]').setValue('KJ-' + this.data.trPotensiGas.id + '-' + this.data.iterasiKunjungan);

        form.down('datefield[name=tglAwalKunjungan]').setMinValue(this.data.tglAwalKunjungan);
        form.down('datefield[name=tglAkhirKunjungan]').setMinValue(this.data.tglAwalKunjungan);

        form.loadRecord(new Ifuel.model.pengadaan.TrKunjunganLapangan(this.data));

        form.down('datefield[name=tglAwalKunjungan]').clearInvalid();
        form.down('datefield[name=tglAkhirKunjungan]').clearInvalid();

        this.showValuePotensiGas(this.data.trPotensiGas);
        this.reloadGrid(this.data.id);

        form.down('textfield[name=statusKunjungan]').setValue(lastStatus);
    },

    showValuePotensiGas: function (potensiGas) {
        var form = this.getKunjunganLapanganFormPanel();
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(this.data);

        form.down('hiddenfield[name=potensiGasId]').setValue(potensiGas.id);
        form.down('textfield[name=potensiGas]').setValue(potensiGas.id);
        form.down('textfield[name=pembangkit]').setValue(potensiGas.tmPltgm.namaPltgm);
        form.down('textfield[name=sumberGas]').setValue(potensiGas.tmSumberGas.namaSumberGas);
        form.down('textfield[name=pemasok]').setValue(potensiGas.tmPemasok.namaPemasok);
        form.down('hiddenfield[name=pemasokId]').setValue(potensiGas.tmPemasok.id);

        form.down('button[action=search]').disable();
        if ('BARU' == lastStatus) {
            form.down('button[action=search]').enable();
        }
    },

    reloadGrid: function (kunjunganLapanganId) {
        this.reloadPesertaKunjunganLapanganGrid(kunjunganLapanganId);
        this.reloadDokumenKunjunganLapanganGrid(kunjunganLapanganId);
        this.reloadAgendaKunjunganLapanganGrid(kunjunganLapanganId);
    },

    reloadPesertaKunjunganLapanganGrid: function (kunjunganLapanganId) {
        var grid = this.getPesertaKunjunganLapanganGridPanel();
        var store = grid.getStore();
        if (kunjunganLapanganId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.pesertaKunjunganUrl + 'byKunjunganLapangan/' + kunjunganLapanganId,
                reader: {
                    type: 'json',
                    root: 'content',
                    totalProperty: 'totalElements'
                }
            };
            store.setProxy(proxy);
            store.loadPage(1);
            grid.down('pagingtoolbar').enable();
        } else {
            grid.down('pagingtoolbar').disable();
            store.loadRawData([]);
        }
    },

    reloadDokumenKunjunganLapanganGrid: function (kunjunganLapanganId) {
        var grid = this.getDokumenKunjunganLapanganGridPanel();
        var store = grid.getStore();
        if (kunjunganLapanganId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.dokumenKunjunganLapanganUrl + 'byKunjunganLapangan/' + kunjunganLapanganId,
                reader: {
                    type: 'json',
                    root: 'content',
                    totalProperty: 'totalElements'
                }
            };
            store.setProxy(proxy);
            store.loadPage(1);
            grid.down('pagingtoolbar').enable();
        } else {
            grid.down('pagingtoolbar').disable();
            store.loadRawData([]);
        }
    },

    reloadAgendaKunjunganLapanganGrid: function (kunjunganLapanganId) {
        var grid = this.getAgendaKunjunganLapanganGridPanel();
        var store = grid.getStore();
        if (kunjunganLapanganId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.agendaKunjunganUrl + 'byKunjunganLapangan/' + kunjunganLapanganId,
                reader: {
                    type: 'json',
                    root: 'content',
                    totalProperty: 'totalElements'
                }
            };
            store.setProxy(proxy);
            store.loadPage(1);
            grid.down('pagingtoolbar').enable();
        } else {
            grid.down('pagingtoolbar').disable();
            store.loadRawData([]);
        }
        this.reloadPesertaAgendaKunjunganLapanganGrid(null);
    },

    reloadPesertaAgendaKunjunganLapanganGrid: function (agendaId) {
        var grid = this.getPesertaAgendaKunjunganLapanganGridPanel();
        var store = grid.getStore();
        if (agendaId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.pesertaKunjunganUrl + 'byAgendaKunjungan/' + agendaId,
                reader: {
                    type: 'json',
                    root: 'content',
                    totalProperty: 'totalElements'
                }
            };
            store.setProxy(proxy);
            store.loadPage(1);
            grid.down('pagingtoolbar').enable();
        } else {
            grid.down('pagingtoolbar').disable();
            store.loadRawData([]);
        }
    },

    activatedTabForm: function () {
        var kunjunganLapanganFormPanel = this.getKunjunganLapanganFormPanel();
        kunjunganLapanganFormPanel.enable();
        this.getAgendaKunjunganLapanganPanel().enable();
        this.getKunjunganLapanganTabPanel().setActiveTab(kunjunganLapanganFormPanel);
    }

});


