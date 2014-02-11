Ext.define('Ifuel.controller.pengadaan.KunjunganLapanganControllerx', {
    extend:'Ext.app.Controller',
//        allowWrite:Rima.util.SecurityHelper.isWriteAllowed("ANAK_PERUSAHAAN_WRITE"),
    allowWrite:true,

    views:[
        'pengadaan.kunjunganLapangan.KunjunganLapanganPanel',
        'Ifuel.view.master.person.PersonWindowChooser',
        'Ifuel.view.perencanaan.potensiGas.PotensiGasWindowChooser',
        'Ifuel.view.pengadaan.agendaKunjunganLapangan.AgendaKunjunganLapanganWindow',
        'Ifuel.view.pengadaan.pesertaKunjunganLapangan.PesertaKunjunganLapanganWindowChooser',
        'Ifuel.view.email.SendEmailWindow',
        'Ifuel.view.pengadaan.kunjunganLapangan.ChangeStatusKunjunganLapanganWindow',
        'Ifuel.view.pengadaan.dokumenKunjunganLapangan.DokumenKunjunganLapanganWindow'
    ],
    models:[],
    stores:[],

    refs:[
        //selector untuk bagian TrKunjunganLapangan
        {
            ref:'kunjunganLapanganTabPanel',
            selector:'kunjunganLapanganPanel tabpanel'
        },
        {
            ref:'kunjunganLapanganGridPanel',
            selector:'kunjunganLapanganPanel tabpanel kunjunganLapanganGridPanel'
        },
        {
            ref:'kunjunganLapanganFormPanel',
            selector:'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel'
        },
        {
            ref:'kunjunganLapanganFormPanelForm',
            selector:'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel form'
        },
        {
            ref:'rangkumanKegiatanFormPanel',
            selector:'kunjunganLapanganPanel tabpanel rangkumanKegiatanFormPanel'
        },
        {
            ref:'potensiGasWindowChooser',
            selector:'potensiGasWindowChooser[parentName=kunjunganLapangan]'
        },
        {
            ref:'sendEmailWindow',
            selector:'sendEmailWindow[parentName=kunjunganLapangan]'
        },
        {
            ref:'changeStatusKunjunganLapanganWindow',
            selector:'changeStatusKunjunganLapanganWindow[parentName=kunjunganLapangan]'
        },

        //selector untuk bagian TrPesertaKunjungan
        {
            ref:'pesertaKunjunganLapanganGridPanel',
            selector:'kunjunganLapanganPanel > tabpanel > kunjunganLapanganFormPanel > panel[groupField=gridList] > pesertaKunjunganLapanganGridPanel'
        },
        {
            ref:'personWindowChooser',
            selector:'personWindowChooser[parentName=kunjunganLapangan]'
        },

        //selector untuk bagian TrDokKunjLap
        {
            ref:'dokumenKunjunganLapanganGridPanel',
            selector:'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] dokumenKunjunganLapanganGridPanel'
        },
        {
            ref:'dokumenKunjunganLapanganWindow',
            selector:'dokumenKunjunganLapanganWindow[parentName=kunjunganLapangan]'
        },

        //selector untuk bagian TrAgendaKunjungan
        {
            ref:'agendaKunjunganLapanganPanel',
            selector:'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel'
        },
        {
            ref:'agendaKunjunganLapanganGridPanel',
            selector:'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel agendaKunjunganLapanganGridPanel'
        },
        {
            ref:'agendaKunjunganLapanganWindow',
            selector:'agendaKunjunganLapanganWindow'
        },
        {
            ref:'agendaKunjunganLapanganWindowForm',
            selector:'agendaKunjunganLapanganWindow form'
        },

        //selector untuk bagian peserta TrAgendaKunjungan
        {
            ref:'pesertaAgendaKunjunganLapanganGridPanel',
            selector:'kunjunganLapanganPanel > tabpanel > agendaKunjunganLapanganPanel > pesertaKunjunganLapanganGridPanel'
        },
        {
            ref:'pesertaKunjunganLapanganWindowChooser',
            selector:'pesertaKunjunganLapanganWindowChooser[parentName=kunjunganLapangan]'
        }
    ],

    init:function () {
        this.control({
            'kunjunganLapanganPanel tabpanel kunjunganLapanganGridPanel':{
                itemdblclick:this.showKunjunganLapangan,
                show:this.activatedTabGrid
            },
            'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] dokumenKunjunganLapanganGridPanel':{
                itemdblclick:this.showDokumenKunjunganLapangan
            },
            'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel agendaKunjunganLapanganGridPanel':{
                itemdblclick:this.showAgendaKunjunganLapangan,
                selectionchange:this.agendaKunjunganLapanganGridSelectionChange
            },
            'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel pesertaKunjunganLapanganGridPanel':{
                afterrender:function (panel) {
                    panel.down("button[action=new]").setDisabled(true);
                    panel.down("button[action=delete]").setDisabled(true);
                }
            }
        });
        if (this.allowWrite) {
            this.control({
                //segala hal yang berhubungan dengan tabel TrKunjunganLapangan
                'kunjunganLapanganPanel tabpanel kunjunganLapanganGridPanel':{
                    selectionchange:this.kunjunganLapanganGridSelectionChange
                },
                'kunjunganLapanganPanel > tabpanel > toolbar button[action=new]':{
                    click:this.createKunjunganLapangan
                },
                'kunjunganLapanganPanel > tabpanel > toolbar button[action=save]':{
                    click:this.saveKunjunganLapangan
                },
//                'kunjunganLapanganPanel > tabpanel > toolbar button[action=delete]':{
//                    click:this.deleteKunjunganLapangan
//                },
                'kunjunganLapanganPanel > tabpanel > toolbar button[action=undang]':{
                    click:this.undangKunjunganLapangan
                },
                'kunjunganLapanganPanel > tabpanel > toolbar button[action=changestatus]':{
                    click:this.changeStatusKunjunganLapangan
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel form hiddenfield[name=id]':{
                    change:this.idHiddenfieldChange
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel fieldcontainer[groupField=fieldset] fieldset[groupField=tanggal] datefield[name=tglAwalKunjungan]':{
                    change:this.changeTanggalAwalKunjungan
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel form fieldcontainer[groupField=potensiGas] button[action=search]':{
                    click:this.showPotensiGasWindowChooser
                },
                'potensiGasWindowChooser[parentName=kunjunganLapangan] potensiGasGridPanel':{
                    itemdblclick:this.choosePotensiGas
                },
                'sendEmailWindow[parentName=kunjunganLapangan] button[action=send]':{
                    click:this.sendEmailUndanganKunjungan
                },
                'changeStatusKunjunganLapanganWindow[parentName=kunjunganLapangan] button[action=save]':{
                    click:this.saveChangeStatusKunjunganLapangan
                },

                //segala hal yang berhubungan dengan tabel TrPesertaKunjungan
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] > pesertaKunjunganLapanganGridPanel':{
                    selectionchange:this.pesertaKunjunganLapanganGridSelectionChange
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] > pesertaKunjunganLapanganGridPanel button[action=new]':{
                    click:this.createPesertaKunjunganLapangan
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] > pesertaKunjunganLapanganGridPanel button[action=delete]':{
                    click:this.deletePesertaKunjunganLapangan
                },
                'personWindowChooser[parentName=kunjunganLapangan] button[action=save]':{
                    click:this.choosePerson
                },

                //segala hal yang berhubungan dengan tabel TrDokKunjLap
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] dokumenKunjunganLapanganGridPanel':{
                    selectionchange:this.dokumenKunjunganLapanganGridSelectionChange
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] dokumenKunjunganLapanganGridPanel button[action=new]':{
                    click:this.createDokumenKunjunganLapangan
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] dokumenKunjunganLapanganGridPanel button[action=delete]':{
                    click:this.deleteDokumenKunjunganLapangan
                },
                'dokumenKunjunganLapanganWindow[parentName=kunjunganLapangan] button[action=save]':{
                    click:this.saveDokumenKunjunganLapangan
                },

                //segala hal yang berhubungan dengan tabel TrAgendaKunjungan
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel':{
                    selectionchange:this.agendaKunjunganLapanganGridSelectionChange
                },
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel agendaKunjunganLapanganGridPanel button[action=new]':{
                    click:this.createAgendaKunjunganLapangan
                },
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel agendaKunjunganLapanganGridPanel button[action=delete]':{
                    click:this.deleteAgendaKunjunganLapangan
                },
                'agendaKunjunganLapanganWindow button[action=save]':{
                    click:this.saveAgendaKunjunganLapangan
                },

                //segala hal yang berhubungan dengan tabel peserta TrAgendaKunjungan
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel pesertaKunjunganLapanganGridPanel':{
                    selectionchange:this.pesertaAgendaKunjunganLapanganGridSelectionChange
                },
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel pesertaKunjunganLapanganGridPanel button[action=new]':{
                    click:this.createPesertaAgendaKunjunganLapangan
                },
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel pesertaKunjunganLapanganGridPanel button[action=delete]':{
                    click:this.deletePesertaAgendaKunjunganLapangan
                },
                'pesertaKunjunganLapanganWindowChooser button[action=save]':{
                    click:this.savePesertaAgendaKunjunganLapangan
                }
            });
        } else {
            this.control({
                'kunjunganLapanganPanel':{
                    afterrender:function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
//                        panel.down("button[action=delete]").setDisabled(true);
                        panel.down("button[action=undang]").setDisabled(true);
                        panel.down("button[action=changestatus]").setDisabled(true);
                    }
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] pesertaKunjunganLapanganGridPanel':{
                    afterrender:function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'kunjunganLapanganPanel tabpanel kunjunganLapanganFormPanel panel[groupField=gridList] dokumenKunjunganLapanganGridPanel':{
                    afterrender:function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'kunjunganLapanganPanel tabpanel agendaKunjunganLapanganPanel agendaKunjunganLapanganGridPanel':{
                    afterrender:function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'agendaKunjunganLapanganWindow':{
                    show:function (window) {
                        window.down("button[action=save]").setDisabled(true);
                    }
                }
            });
        }
    },
    //---- FUNCTION PESERTA AGENDA KUNJUNGAN LAPANGAN ------------------------------------------------------------------

    pesertaAgendaKunjunganLapanganGridSelectionChange:function (sel, selected) {
        if (this.allowWrite && selected[0]) {
            this._togglePesertaAgendaKunjunganLapanganDeleteButton(true);
        } else {
            this._togglePesertaAgendaKunjunganLapanganDeleteButton(false);
        }
    },

    deletePesertaAgendaKunjunganLapangan:function (button) {
        var recordPeserta = this.getPesertaAgendaKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        var recordAgenda = this.getAgendaKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (recordPeserta && recordAgenda) {
            Ext.Ajax.request({
                url:Ifuel.config.pesertaKunjunganUrl + recordPeserta.data.id + '/fromAgendaKunjungan/' + recordAgenda.data.id,
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                success:function (response, options) {
                    me.getPesertaAgendaKunjunganLapanganGridPanel().getStore().reload();
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Peserta Agenda Kunjungan Lapangan');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Peserta Agenda Kunjungan Lapangan');
                }
            });
        }
    },

    createPesertaAgendaKunjunganLapangan:function () {
        var record = this.getAgendaKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        if (record) {
            var personWindowChooser = Ext.widget('pesertaKunjunganLapanganWindowChooser', {parentName:'kunjunganLapangan'});
            personWindowChooser.setUrl(Ifuel.config.pesertaKunjunganUrl + '/byNotInAgendaKunjungan/' + record.data.id);
        }
    },

    savePesertaAgendaKunjunganLapangan:function () {
        var me = this;
        var agendaId = this.getAgendaKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0].data.id;
        var records = this.getPesertaKunjunganLapanganWindowChooser().down('pesertaKunjunganLapanganGridPanel').getSelectionModel().getSelection();
        var datas = [];
        Ext.Array.forEach(records, function (record, i) {
            var data = {
                id:record.data.id
            }
            datas.push(data);
        });

        this.getPesertaKunjunganLapanganWindowChooser().close();
        Ext.Ajax.request({
            url:Ifuel.config.pesertaKunjunganUrl + "/addAllToAgendaKunjungan/" + agendaId,
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            params:Ext.JSON.encode(datas),
            success:function (response, options) {
                me.getPesertaAgendaKunjunganLapanganGridPanel().getStore().reload();
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Peserta Agenda Kunjungan Lapangan');
            },
            failure:function (response, options) {
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Peserta Agenda Kunjungan Lapangan');
            }
        });
    },

    _togglePesertaAgendaKunjunganLapanganDeleteButton:function (enable) {
        if (enable) {
            this.getPesertaAgendaKunjunganLapanganGridPanel().down('button[action=delete]').enable();
        } else {
            this.getPesertaAgendaKunjunganLapanganGridPanel().down('button[action=delete]').disable();
        }
    },

    //---- FUNCTION AGENDA KUNJUNGAN LAPANGAN --------------------------------------------------------------------------

    deleteAgendaKunjunganLapangan:function (button) {
        var record = this.getAgendaKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url:Ifuel.config.agendaKunjunganUrl + record.data.id,
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                success:function (response, options) {
                    me.getAgendaKunjunganLapanganGridPanel().getStore().reload();
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Agenda Kunjungan Lapangan');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Agenda Kunjungan Lapangan');
                }
            });
        }
    },

    showAgendaKunjunganLapangan:function (grid, record) {
        var view = Ext.widget('agendaKunjunganLapanganWindow');
        view.down('form').loadRecord(record);
        var datefield = view.down('datefield[name=tanggalKunjungan]');
        datefield.setValue(record.data.waktuAwalKunjungan);
        datefield.setMinValue(this.getKunjunganLapanganFormPanelForm().down('datefield[name=tglAwalKunjungan]').getValue());
        datefield.setMaxValue(this.getKunjunganLapanganFormPanelForm().down('datefield[name=tglAkhirKunjungan]').getValue());
    },

    agendaKunjunganLapanganGridSelectionChange:function (sel, selected) {
        this._reloadPesertaAgendaKunjunganGrid(selected[0] ? selected[0].data.id : null);
        if (this.allowWrite && selected[0]) {
            this.getPesertaAgendaKunjunganLapanganGridPanel().down('button[action=new]').enable();
            this._toggleAgendaKunjunganLapanganDeleteButton(true);
        } else {
            this.getPesertaAgendaKunjunganLapanganGridPanel().down('button[action=new]').disable();
            this._toggleAgendaKunjunganLapanganDeleteButton(false);
        }
    },

    createAgendaKunjunganLapangan:function () {
        var view = Ext.widget('agendaKunjunganLapanganWindow', {dataKunjunganLapangan:this.data});
        var datefield = view.down('datefield[name=tanggalKunjungan]');
        datefield.setMinValue(this.getKunjunganLapanganFormPanelForm().down('datefield[name=tglAwalKunjungan]').getValue());
        datefield.setMaxValue(this.getKunjunganLapanganFormPanelForm().down('datefield[name=tglAkhirKunjungan]').getValue());
    },

    saveAgendaKunjunganLapangan:function () {
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
            id:record ? values.id : null,
            waktuAwalKunjungan:Ext.Date.format(waktuAwalKunjungan, 'c'),
            waktuAkhirKunjungan:Ext.Date.format(waktuAkhirKunjungan, 'c'),
            tujuanKunjungan:values.tujuanKunjungan,
            lokasiKunjungan:values.lokasiKunjungan,
            kegiatan:values.kegiatan,
            keterangan:values.keterangan,
            tambahSummary:false,
            trKunjunganLapangan:{
                id:this.getKunjunganLapanganFormPanelForm().down('hiddenfield[name=id]').getValue()
            }
        };

        if (form.getForm().isValid()) {
            if (data.id) {
                Ext.Ajax.request({
                    url:Ifuel.config.agendaKunjunganUrl + record.data.id,
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success:function (response, options) {
                        me.getAgendaKunjunganLapanganGridPanel().getStore().reload();
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Agenda Kunjungan Lapangan');
                    },
                    failure:function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Agenda Kunjungan Lapangan');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url:Ifuel.config.agendaKunjunganUrl,
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success:function (response, options) {
                        me.getAgendaKunjunganLapanganGridPanel().getStore().reload();
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Agenda Kunjungan Lapangan');
                    },
                    failure:function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Agenda Kunjungan Lapangan');
                    }
                });
            }
            this.getAgendaKunjunganLapanganWindow().close();
        }
    },

    _toggleAgendaKunjunganLapanganDeleteButton:function (enable) {
        if (enable) {
            this.getAgendaKunjunganLapanganGridPanel().down('button[action=delete]').enable();
        } else {
            this.getAgendaKunjunganLapanganGridPanel().down('button[action=delete]').disable();
        }
    },

    //---- FUNCTION DOKUMEN KUNJUNGAN LAPANGAN -------------------------------------------------------------------------

    dokumenKunjunganLapanganGridSelectionChange:function (sel, selected) {
        if (selected[0]) {
            this._toggleDokumenKunjunganLapanganDeleteButton(true);
        } else {
            this._toggleDokumenKunjunganLapanganDeleteButton(false);
        }
    },

    createDokumenKunjunganLapangan:function () {
        Ext.widget('dokumenKunjunganLapanganWindow', {parentName:'kunjunganLapangan'});
        var kunjunganLapanganId = this.getKunjunganLapanganFormPanelForm().down('hiddenfield[name=id]').getValue();
        this.getDokumenKunjunganLapanganWindow().down('hiddenfield[name=idTrKunjunganLapangan]').setValue(kunjunganLapanganId);
    },

    deleteDokumenKunjunganLapangan:function (button) {
        var record = this.getDokumenKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url:Ifuel.config.dokumenKunjunganLapanganUrl + record.data.id,
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                success:function (response, options) {
                    me.getDokumenKunjunganLapanganGridPanel().getStore().reload();
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Dokumen Kunjungan Lapangan');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Dokumen Kunjungan Lapangan');
                }
            });
        }
    },

    saveDokumenKunjunganLapangan:function (button) {
        var me = this;
        var form = this.getDokumenKunjunganLapanganWindow().down('form');

        if (form.getForm().isValid()) {
            form.submit({
                url:Ifuel.config.dokumenKunjunganLapanganUrl + 'upload',
                waitMsg:'Uploading your document...',
                success:function (form, action) {
                    me.getDokumenKunjunganLapanganGridPanel().getStore().reload();
                    //Changed by: Bagus Saptopo @ 22/10/2013. Reason: Merubah alert message.
                    Ext.Msg.alert('Success', 'Dokumen telah berhasil diunggah.');
                    me.getDokumenKunjunganLapanganWindow().close();
                },
                failure:function (form, action) {
                    //Ext.Msg.alert('Failed', action.result.msg);
                    //Changed by: Bagus Saptopo @ 22/10/2013. Reason: Merubah error message.
                    Ext.Msg.alert('Failed', 'Dokumen gagal diunggah karena melebihi batas maksimum 2 MB.')
                    me.getDokumenKunjunganLapanganWindow().close();
                }
            })
        }
    },

    showDokumenKunjunganLapangan:function (o, record) {
        window.open(Ifuel.config.dokumenKunjunganLapanganUrl + 'download/' + record.data.id);
    },

    _toggleDokumenKunjunganLapanganDeleteButton:function (enable) {
        if (enable) {
            this.getDokumenKunjunganLapanganGridPanel().down('button[action=delete]').enable();
        } else {
            this.getDokumenKunjunganLapanganGridPanel().down('button[action=delete]').disable();
        }
    },

    //---- FUNCTION PESERTA KUNJUNGAN LAPANGAN -------------------------------------------------------------------------

    pesertaKunjunganLapanganGridSelectionChange:function (sel, selected) {
        if (selected[0]) {
            this._togglePesertaKunjunganLapanganDeleteButton(true);
        } else {
            this._togglePesertaKunjunganLapanganDeleteButton(false);
        }
    },

    createPesertaKunjunganLapangan:function () {
        var form = this.getKunjunganLapanganFormPanelForm();
        var pemasokId = form.down('hiddenfield[name=pemasokId]').getValue();
        var kunjunganId = form.down('hiddenfield[name=id]').getValue();
        var personWindowChooser = Ext.widget('personWindowChooser', {parentName:'kunjunganLapangan'});
        personWindowChooser.setUrl(Ifuel.config.personUrl + '/byAllPln/byPemasok/' + pemasokId + '/byNotInKunjunganLapangan/' + kunjunganId);
    },

    deletePesertaKunjunganLapangan:function (button) {
        var record = this.getPesertaKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url:Ifuel.config.pesertaKunjunganUrl + record.data.id,
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                success:function (response, options) {
                    me.getPesertaKunjunganLapanganGridPanel().getStore().reload();
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Peserta Kunjungan Lapangan');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Peserta Kunjungan Lapangan');
                }
            });
        }
    },

    choosePerson:function () {
        var me = this;
        var kunjunganId = this.getKunjunganLapanganFormPanelForm().down('hiddenfield[name=id]').getValue();
        var records = this.getPersonWindowChooser().down('personGridPanel').getSelectionModel().getSelection();
        var datas = [];
        Ext.Array.forEach(records, function (record, i) {
            var data = {
                id:null,
                hadir:null,
                keterangan:null,
                tmPerson:{id:record.data.id},
                trKunjunganLapangan:{
                    id:kunjunganId
                }
            }
            datas.push(data);
        });

        this.getPersonWindowChooser().close();
        Ext.Ajax.request({
            url:Ifuel.config.pesertaKunjunganUrl + "/all/",
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            params:Ext.JSON.encode(datas),
            success:function (response, options) {
                me.getPesertaKunjunganLapanganGridPanel().getStore().reload();
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Peserta Kunjungan Lapangan');
            },
            failure:function (response, options) {
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'PesertaKunjungan Lapangan');
            }
        });
    },

    _togglePesertaKunjunganLapanganDeleteButton:function (enable) {
        if (enable) {
            this.getPesertaKunjunganLapanganGridPanel().down('button[action=delete]').enable();
        } else {
            this.getPesertaKunjunganLapanganGridPanel().down('button[action=delete]').disable();
        }
    },

    //---- FUNCTION KUNJUNGAN LAPANGAN ---------------------------------------------------------------------------------

    saveChangeStatusKunjunganLapangan:function () {
        var me = this;
        var form = this.getChangeStatusKunjunganLapanganWindow().down("form");
        var values = form.getValues();

        if (form.getForm().isValid()) {
            var record = this.getKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
            Ext.Ajax.request({
                url:Ifuel.config.kunjunganLapanganUrl + record.data.id + "/changeStatus/" + values.status,
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                timeout:120000,
                params:Ext.JSON.encode(values.name),
                success:function (response, options) {
                    me.getKunjunganLapanganGridPanel().getStore().reload();
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Kunjungan Lapangan');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Kunjungan Lapangan');
                }
            });
            this.getChangeStatusKunjunganLapanganWindow().close();
        }
    },

    changeStatusKunjunganLapangan:function () {
        var record = this.getKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(record.data);
        var window = Ext.widget('changeStatusKunjunganLapanganWindow', {
            parentName:'kunjunganLapangan', typeComboList:lastStatus == 'KUNJUNGAN' ? 0 : (lastStatus == 'LAPORAN' ? 1 : null)
        });
    },

    sendEmailUndanganKunjungan:function () {
        var me = this;
        var form = this.getSendEmailWindow().down("form");
        var values = form.getValues();

        if (form.getForm().isValid()) {
            var data = {
                subject:values.subject,
                to:values.to ? values.to.split(',') : null,
                cc:values.cc ? values.cc.split(',') : null,
                bcc:values.bcc ? values.bcc.split(',') : null,
                text:values.text
            }

            var record = this.getKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
            Ext.Ajax.request({
                url:Ifuel.config.kunjunganLapanganUrl + record.data.id + "/sendEmail/",
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                timeout:120000,
                params:Ext.JSON.encode(data),
                success:function (response, options) {
                    var responseText = Ext.JSON.decode(response.responseText);
                    me.getKunjunganLapanganGridPanel().getStore().reload();
                    me._showValueKunjunganLapangan(responseText);
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kirim Undangan Kunjungan Lapangan');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kirim Undangan Kunjungan Lapangan');
                }
            });
            this.getSendEmailWindow().close();
        }
    },

    undangKunjunganLapangan:function () {
        var me = this;
        var record = this.getKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        Ext.Ajax.request({
            url:Ifuel.config.kunjunganLapanganUrl + record.data.id + "/getDefaultMail/",
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            success:function (response, options) {
                var data = Ext.JSON.decode(response.responseText);
                var sendEmailWindow = Ext.widget('sendEmailWindow', {parentName:'kunjunganLapangan'});
                sendEmailWindow.down("hiddenfield[name=id]").setValue(record.data.id);
                sendEmailWindow.down("textfield[name=to]").setValue(data.to);
                sendEmailWindow.down("textfield[name=cc]").setValue(data.cc);
                sendEmailWindow.down("textfield[name=bcc]").setValue(data.bcc);
                sendEmailWindow.down("textfield[name=subject]").setValue(data.subject);
                sendEmailWindow.down("textfield[name=text]").setValue(data.text);
            },
            failure:function (response, options) {
            }
        });
    },

    idHiddenfieldChange:function (hiddenfield, newValue) {
        this.getPesertaKunjunganLapanganGridPanel().down("button[action=new]").disable();
        this.getAgendaKunjunganLapanganPanel().down("button[action=new]").disable();
        this.getDokumenKunjunganLapanganGridPanel().down("button[action=new]").disable();
        if (newValue) {
            this.getPesertaKunjunganLapanganGridPanel().down("button[action=new]").enable();
            this.getAgendaKunjunganLapanganGridPanel().down("button[action=new]").enable();
            this.getDokumenKunjunganLapanganGridPanel().down("button[action=new]").enable();
        }
    },

    changeTanggalAwalKunjungan:function (datefield, newValue) {
        this.getKunjunganLapanganFormPanelForm().down('datefield[name=tglAkhirKunjungan]').setMinValue(newValue);
    },

    kunjunganLapanganGridSelectionChange:function (sel, selected) {
        if (selected[0]) {
//            this._toggleKunjunganLapanganDeleteButton(true);
            var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(selected[0].data);
            if (lastStatus == "BARU") {
                this._toggleKunjunganLapanganUndangButton(true);
            } else {
                this._toggleKunjunganLapanganUndangButton(false);
            }
            if (lastStatus == "KUNJUNGAN" || lastStatus == "LAPORAN") {
                this._toggleKunjunganLapanganChangeStatusButton(true);
            } else {
                this._toggleKunjunganLapanganChangeStatusButton(false);
            }
        } else {
//            this._toggleKunjunganLapanganDeleteButton(false);
            this._toggleKunjunganLapanganUndangButton(false);
            this._toggleKunjunganLapanganChangeStatusButton(false);
        }

    },

    choosePotensiGas:function (grid, record) {
        this._showValuePotensiGas(record.data);
        this.getPotensiGasWindowChooser().close();
    },

    showPotensiGasWindowChooser:function () {
        var potensiGasWindowChooser = Ext.widget('potensiGasWindowChooser', {parentName:'kunjunganLapangan'});
    },

    createKunjunganLapangan:function () {
        this._clearValueKunjunganLapangan();
//        this._toggleKunjunganLapanganDeleteButton(false);
        this.activatedTabForm();
    },

    showKunjunganLapangan:function (grid, record) {
        this.activatedTabForm();
        var form = this.getKunjunganLapanganFormPanelForm();
        form.loadRecord(record);
        this._showValueKunjunganLapangan(record.data);
    },

//    deleteKunjunganLapangan:function (button) {
//        var record = this.getKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
//        var me = this;
//        if (record) {
//            Ext.Ajax.request({
//                url:Ifuel.config.kunjunganLapanganUrl + record.data.id,
//                method:'DELETE',
//                headers:{
//                    'Content-Type':'application/json'
//                },
//                success:function (response, options) {
//                    me.getKunjunganLapanganGridPanel().getStore().reload();
//                    me._clearValueKunjunganLapangan();
//                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Kunjungan Lapangan');
//                },
//                failure:function (response, options) {
//                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Kunjungan Lapangan');
//                }
//            });
//        }
//    },

    saveKunjunganLapangan:function (button) {
        this._saveKunjunganLapangan();
    },

    _saveKunjunganLapangan:function () {
        var me = this;
        var form = this.getKunjunganLapanganFormPanelForm();
        var values = form.getValues();
        var record = form.getRecord();

        var data = {
            id:record ? values.id : null,
            tglAwalKunjungan:Ext.Date.format(Ext.Date.parse(values.tglAwalKunjungan, 'd F Y'), 'c'),
            tglAkhirKunjungan:Ext.Date.format(Ext.Date.parse(values.tglAkhirKunjungan, 'd F Y'), 'c'),
            iterasiKunjungan:5,
            summaryKunjungan:this.getRangkumanKegiatanFormPanel().down('htmleditor').getValue(),
            trPotensiGas:{
                id:values.potensiGasId
            }
        };

        if (form.getForm().isValid()) {
            if (data.id) {
                Ext.Ajax.request({
                    url:Ifuel.config.kunjunganLapanganUrl + data.id,
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success:function (response, options) {
                        me.getKunjunganLapanganGridPanel().getStore().reload();
                        me._reshowValueKunjunganLapangan(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kunjungan Lapangan');
                    },
                    failure:function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kunjungan Lapangan');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url:Ifuel.config.kunjunganLapanganUrl,
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success:function (response, options) {
                        me.getKunjunganLapanganGridPanel().getStore().reload();
                        me._reshowValueKunjunganLapangan(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kunjungan Lapangan');
                    },
                    failure:function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kunjungan Lapangan');
                    }
                });
            }
        }
    },

    activatedTabGrid:function () {
        this.getKunjunganLapanganFormPanel().disable();
        this.getAgendaKunjunganLapanganPanel().disable();
        this.getRangkumanKegiatanFormPanel().disable();
        this.getKunjunganLapanganTabPanel().setActiveTab(this.getKunjunganLapanganGridPanel());

        this.getKunjunganLapanganTabPanel().down('button[action=save]').disable();
        if (this.allowWrite) {
            this.getKunjunganLapanganTabPanel().down('button[action=new]').enable();
        } else {
            this.getKunjunganLapanganTabPanel().down('button[action=new]').disable();
        }
    },

    activatedTabForm:function () {
        this.getKunjunganLapanganFormPanel().enable();
        this.getAgendaKunjunganLapanganPanel().enable();
        this.getKunjunganLapanganTabPanel().setActiveTab(this.getKunjunganLapanganFormPanel());

        //RangkumanKegiatan hanya bisa diisi atau dilihat ketika status sudah KUNJUNGAN
        this.getRangkumanKegiatanFormPanel().down('htmleditor').disable();
        var record = this.getKunjunganLapanganGridPanel().getSelectionModel().getSelection()[0];
        if(record){
            var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(record.data);
            if (lastStatus == "KUNJUNGAN" || lastStatus == "LAPORAN" || lastStatus == "DISETUJUI" || lastStatus == "KUNJUNGAN_LANJUTAN" || lastStatus == "DIBATALKAN") {
                this.getRangkumanKegiatanFormPanel().enable();
                if (lastStatus == "KUNJUNGAN" || lastStatus == "DISETUJUI" || lastStatus == "KUNJUNGAN_LANJUTAN" || lastStatus == "DIBATALKAN") {
                    this.getRangkumanKegiatanFormPanel().down('htmleditor').enable();
                }
            }
        }

        if (this.allowWrite) {
            this.getKunjunganLapanganTabPanel().down('button[action=new]').enable();
            this.getKunjunganLapanganTabPanel().down('button[action=save]').enable();
        } else {
            this.getKunjunganLapanganTabPanel().down('button[action=new]').disable();
            this.getKunjunganLapanganTabPanel().down('button[action=save]').disable();
        }
    },

    _reshowValueKunjunganLapangan:function (url) {
        var me = this;
        Ext.Ajax.request({
            url:url,
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            success:function (response, options) {
                var data = Ext.JSON.decode(response.responseText);
                data.tglAwalKunjungan = new Date(data.tglAwalKunjungan);
                data.tglAkhirKunjungan = new Date(data.tglAkhirKunjungan);
                me._showValueKunjunganLapangan(data);
            },
            failure:function (response, options) {
            }
        });
    },

    _showValueKunjunganLapangan:function (data) {
        var form = this.getKunjunganLapanganFormPanelForm();

        this._showValuePotensiGas(data.trPotensiGas);
        this._reloadGrid(data.id);

        form.down('textfield[name=noKunjunganLapangan]').setValue('KJ-' + data.trPotensiGas.id + '-' + data.iterasiKunjungan);
        form.down('hiddenfield[name=id]').setValue(data.id);

        form.down('datefield[name=tglAwalKunjungan]').setMinValue(data.tglAwalKunjungan);
        form.down('datefield[name=tglAkhirKunjungan]').setMinValue(data.tglAwalKunjungan);
        form.down('datefield[name=tglAwalKunjungan]').setValue(data.tglAwalKunjungan);
        form.down('datefield[name=tglAkhirKunjungan]').setValue(data.tglAkhirKunjungan);
        form.down('datefield[name=tglAwalKunjungan]').clearInvalid();
        form.down('datefield[name=tglAkhirKunjungan]').clearInvalid();

        this.getRangkumanKegiatanFormPanel().down('htmleditor').setValue(data.summaryKunjungan);

        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKunjunganLapangan(data);
        form.down('textfield[name=statusKunjungan]').setValue(lastStatus ? lastStatus.status : null);
    },

    _showValuePotensiGas:function (potensiGas) {
        var form = this.getKunjunganLapanganFormPanelForm();
        form.down('hiddenfield[name=potensiGasId]').setValue(potensiGas.id);
        form.down('textfield[name=potensiGas]').setValue(potensiGas.id);
        form.down('textfield[name=pembangkit]').setValue(potensiGas.tmPltgm.namaPltgm);
        form.down('textfield[name=sumberGas]').setValue(potensiGas.tmSumberGas.namaSumberGas);
        form.down('textfield[name=pemasok]').setValue(potensiGas.tmPemasok.namaPemasok);
        form.down('hiddenfield[name=pemasokId]').setValue(potensiGas.tmPemasok.id);
    },

    _clearValueKunjunganLapangan:function () {
        var form = this.getKunjunganLapanganFormPanelForm();
        form.down('hiddenfield[name=potensiGasId]').setValue(null);
        form.down('textfield[name=potensiGas]').setValue(null);
        form.down('textfield[name=pembangkit]').setValue(null);
        form.down('textfield[name=sumberGas]').setValue(null);
        form.down('textfield[name=pemasok]').setValue(null);
        form.down('hiddenfield[name=pemasokId]').setValue(null);

        form.down('hiddenfield[name=id]').setValue(null);
        form.down('textfield[name=noKunjunganLapangan]').setValue(null);
        form.down('textfield[name=statusKunjungan]').setValue(null);

        form.down('datefield[name=tglAwalKunjungan]').setMinValue(new Date());
        form.down('datefield[name=tglAkhirKunjungan]').setMinValue(new Date());
        form.down('datefield[name=tglAwalKunjungan]').setValue(null);
        form.down('datefield[name=tglAkhirKunjungan]').setValue(null);

        form.down('textfield[name=potensiGas]').clearInvalid();
        form.down('datefield[name=tglAwalKunjungan]').clearInvalid();
        form.down('datefield[name=tglAkhirKunjungan]').clearInvalid();
        this.getRangkumanKegiatanFormPanel().down('htmleditor').setValue(null);

        //ini adalah cara mengosongkan grid+Store -- mumet ndase
        this._reloadAgendaKunjunganGrid(null);
        this._reloadPesertaKunjunganGrid(null);
        this._reloadDokumenKunjunganGrid(null);
    },

    _reloadPesertaKunjunganGrid:function (kunjunganId) {
        var grid = this.getPesertaKunjunganLapanganGridPanel();
        var store = grid.getStore();
        if (kunjunganId) {
            var proxy = {
                type:'ajax',
                pageParam:'page.page',
                url:Ifuel.config.pesertaKunjunganUrl + 'byKunjunganLapangan/' + kunjunganId,
                reader:{
                    type:'json',
                    root:'content',
                    totalProperty:'totalElements'
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

    _reloadDokumenKunjunganGrid:function (kunjunganId) {
        var grid = this.getDokumenKunjunganLapanganGridPanel();
        var store = grid.getStore();
        if (kunjunganId) {
            var proxy = {
                type:'ajax',
                pageParam:'page.page',
                url:Ifuel.config.dokumenKunjunganLapanganUrl + 'byKunjunganLapangan/' + kunjunganId,
                reader:{
                    type:'json',
                    root:'content',
                    totalProperty:'totalElements'
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

    _reloadAgendaKunjunganGrid:function (kunjunganId) {
        var grid = this.getAgendaKunjunganLapanganGridPanel();
        var store = grid.getStore();
        if (kunjunganId) {
            var proxy = {
                type:'ajax',
                pageParam:'page.page',
                url:Ifuel.config.agendaKunjunganUrl + 'byKunjunganLapangan/' + kunjunganId,
                reader:{
                    type:'json',
                    root:'content',
                    totalProperty:'totalElements'
                }
            };
            store.setProxy(proxy);
            store.loadPage(1);
            grid.down('pagingtoolbar').enable();
        } else {
            grid.down('pagingtoolbar').disable();
            store.loadRawData([]);
        }
        this._reloadPesertaAgendaKunjunganGrid(null);
    },

    _reloadPesertaAgendaKunjunganGrid:function (agendaId) {
        var grid = this.getPesertaAgendaKunjunganLapanganGridPanel();
        var store = grid.getStore();
        if (agendaId) {
            var proxy = {
                type:'ajax',
                pageParam:'page.page',
                url:Ifuel.config.pesertaKunjunganUrl + 'byAgendaKunjungan/' + agendaId,
                reader:{
                    type:'json',
                    root:'content',
                    totalProperty:'totalElements'
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

    _reloadGrid:function (kunjunganId) {
        this._reloadPesertaKunjunganGrid(kunjunganId);
        this._reloadAgendaKunjunganGrid(kunjunganId);
        this._reloadDokumenKunjunganGrid(kunjunganId);
    },

//    _toggleKunjunganLapanganDeleteButton:function (enable) {
//        if (enable) {
//            this.getKunjunganLapanganTabPanel().down('button[action=delete]').enable();
//        } else {
//            this.getKunjunganLapanganTabPanel().down('button[action=delete]').disable();
//        }
//    },

    _toggleKunjunganLapanganUndangButton:function (enable) {
        if (enable) {
            this.getKunjunganLapanganTabPanel().down('button[action=undang]').enable();
        } else {
            this.getKunjunganLapanganTabPanel().down('button[action=undang]').disable();
        }
    },

    _toggleKunjunganLapanganChangeStatusButton:function (enable) {
        if (enable) {
            this.getKunjunganLapanganTabPanel().down('button[action=changestatus]').enable();
        } else {
            this.getKunjunganLapanganTabPanel().down('button[action=changestatus]').disable();
        }
    }
});


