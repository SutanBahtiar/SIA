Ext.define('Ifuel.controller.pengadaan.KomController', {
    extend:'Ext.app.Controller',
//        allowWrite:Ifuel.util.SecurityHelper.isWriteAllowed("KOM_WRITE"),
    allowWrite:true,
    
    views:[
        "pengadaan.kom.KomPanel",
        "Ifuel.view.pengadaan.dokumenKom.DokumenKomWindow",
        "Ifuel.view.pengadaan.kom.ChangeStatusKomWindow"
    ],
    models:[],
    stores:[],
    data: null,
    refs:[
        //selector untuk bagian TrKom
        {
            ref:'komTabPanel',
            selector:'komPanel tabpanel'
        },
        {
            ref:'komGridPanel',
            selector:'komPanel tabpanel komGridPanel'
        },
        {
            ref:'komFormPanel',
            selector:'komPanel tabpanel komFormPanel'
        },
        {
            ref:'komFormPanelForm',
            selector:'komPanel tabpanel komFormPanel form'
        },
        {
            ref:'komIdHiddenField',
            selector:'komPanel tabpanel komFormPanel form hiddenfield[name=id]'
        },
        {
            ref:'hasilKomFormPanel',
            selector:'komPanel tabpanel hasilKomFormPanel'
        },
        {
            ref:'potensiGasWindowChooser',
            selector:'potensiGasWindowChooser[parentName=kom]'
        },
        {
            ref:'sendEmailWindow',
            selector:'sendEmailWindow[parentName=kom]'
        },
        {
            ref:'changeStatusKomWindow',
            selector:'changeStatusKomWindow[parentName=kom]'
        },

        //selector untuk bagian TrPesertaKom
        {
            ref:'pesertaKomGridPanel',
            selector:'komPanel > tabpanel > komFormPanel > panel[groupField=gridList] > pesertaKomGridPanel'
        },
        {
            ref:'personWindowChooser',
            selector:'personWindowChooser[parentName=kom]'
        },

        //selector untuk bagian TrDokKunjLap
        {
            ref:'dokumenKomGridPanel',
            selector:'komPanel tabpanel komFormPanel panel[groupField=gridList] dokumenKomGridPanel'
        },
        {
            ref:'dokumenKomWindow',
            selector:'dokumenKomWindow[parentName=kom]'
        },
        
        //POTENSI GAS
        {
            ref:'statusPotensiGasGridPanel',
            selector:'pengadaanPotensiGasPanel tabpanel statusPotensiGasGridPanel'
        }
    ],

    init:function () {
        this.control({
            'komPanel tabpanel komGridPanel':{
                itemdblclick:this.showKom,
                show:this.activatedTabGrid
            },
            'komPanel tabpanel komFormPanel panel[groupField=gridList] dokumenKomGridPanel':{
                itemdblclick:this.showDokumenKom
            }
        });
        if (this.allowWrite) {
            this.control({
                //segala hal yang berhubungan dengan tabel Trkom
                'komPanel tabpanel komGridPanel':{
                    selectionchange:this.komGridSelectionChange
                },
                'komPanel > tabpanel > toolbar button[action=new]':{
                    click:this.createKom
                },
                'komPanel > tabpanel > toolbar button[action=save]':{
                    click:this.saveKom
                },
//                'komPanel > tabpanel > toolbar button[action=delete]':{
//                    click:this.deletekom
//                },
                'komPanel > tabpanel > toolbar button[action=undang]':{
                    click:this.undangKom
                },
                'komPanel > tabpanel > toolbar button[action=changestatus]':{
                    click:this.changeStatusKom
                },
                'komPanel tabpanel komFormPanel form hiddenfield[name=id]':{
                    change:this.idHiddenfieldChange
                },
                'komPanel tabpanel komFormPanel form textfield[name=status]':{
                    change:this.statusTextfieldChange
                },
                'komPanel tabpanel komFormPanel form fieldcontainer[groupField=potensiGas] button[action=search]':{
                    click:this.showPotensiGasWindowChooser
                },
                'potensiGasWindowChooser[parentName=kom] potensiGasGridPanel':{
                    itemdblclick:this.choosePotensiGas
                },
                'sendEmailWindow[parentName=kom] button[action=send]':{
                    click:this.sendEmailUndanganKom
                },
                'changeStatusKomWindow[parentName=kom] button[action=save]':{
                    click:this.saveChangeStatusKom
                },

                //segala hal yang berhubungan dengan tabel TrPesertaKom
                'komPanel tabpanel komFormPanel panel[groupField=gridList] > pesertaKomGridPanel':{
                    selectionchange:this.pesertaKomGridSelectionChange
                },
                'komPanel tabpanel komFormPanel panel[groupField=gridList] > pesertaKomGridPanel button[action=new]':{
                    click:this.createPesertaKom
                },
                'komPanel tabpanel komFormPanel panel[groupField=gridList] > pesertaKomGridPanel button[action=delete]':{
                    click:this.deletePesertaKom
                },
                'personWindowChooser[parentName=kom] button[action=save]':{
                    click:this.choosePerson
                },

                //segala hal yang berhubungan dengan tabel TrDokKunjLap
                'komPanel tabpanel komFormPanel panel[groupField=gridList] dokumenKomGridPanel':{
                    selectionchange:this.dokumenKomGridSelectionChange
                },
                'komPanel tabpanel komFormPanel panel[groupField=gridList] dokumenKomGridPanel button[action=new]':{
                    click:this.createDokumenKom
                },
                'komPanel tabpanel komFormPanel panel[groupField=gridList] dokumenKomGridPanel button[action=delete]':{
                    click:this.deleteDokumenKom
                },
                'dokumenKomWindow[parentName=kom] button[action=save]':{
                    click:this.saveDokumenKom
                }
            });
        } else {
            this.control({
                'komPanel':{
                    afterrender:function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
//                        panel.down("button[action=delete]").setDisabled(true);
                        panel.down("button[action=undang]").setDisabled(true);
                        panel.down("button[action=changestatus]").setDisabled(true);
                    }
                },
                'komPanel tabpanel komFormPanel panel[groupField=gridList] pesertakomGridPanel':{
                    afterrender:function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'komPanel tabpanel komFormPanel panel[groupField=gridList] dokumenkomGridPanel':{
                    afterrender:function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                }
            });
        }
    },

    //---- FUNCTION DOKUMEN KOM ----------------------------------------------------------------------------------------

    dokumenKomGridSelectionChange:function (sel, selected) {
        var status = this.getKomFormPanelForm().down('textfield[name=status]').getValue();
        if (selected[0] && (status == 'BARU' || status == 'RAPAT')) {
            this._toggleDokumenKomDeleteButton(true);
        } else {
            this._toggleDokumenKomDeleteButton(false);
        }
    },

    createDokumenKom:function () {
        console.info('createDokumenKom');
        Ext.widget('dokumenKomWindow', {parentName:'kom'});
        var komId = this.getKomFormPanelForm().down('hiddenfield[name=id]').getValue();
        this.getDokumenKomWindow().down('hiddenfield[name=idTrKom]').setValue(komId);
    },

    deleteDokumenKom:function (button) {
        var record = this.getDokumenKomGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url:Ifuel.config.dokKomUrl + record.data.id,
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                success:function (response, options) {
                    me.getDokumenKomGridPanel().getStore().reload();
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Dokumen Kick-off Meeting');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Dokumen Kick-off Meeting');
                }
            });
        }
    },

    saveDokumenKom:function (button) {
        var me = this;
        var form = this.getDokumenKomWindow().down('form');
        if (form.getForm().isValid()) {
            form.submit({
                url:Ifuel.config.dokKomUrl + 'upload',
                waitMsg:'Uploading your document...',
                success:function (form, action) {
                    me.getDokumenKomGridPanel().getStore().reload();
                    Ext.Msg.alert('Success', 'Dokumen telah uploaded.');
                    me.getDokumenKomWindow().close();
                },
                failure:function (form, action) {
                    Ext.Msg.alert('Failed', action.result.msg);
                    me.getDokumenKomWindow().close();
                }
            })
        }
    },

    showDokumenKom:function (o, record) {
        window.open(Ifuel.config.dokKomUrl + 'download/' + record.data.id);
    },

    _toggleDokumenKomDeleteButton:function (enable) {
        if (enable) {
            this.getDokumenKomGridPanel().down('button[action=delete]').enable();
        } else {
            this.getDokumenKomGridPanel().down('button[action=delete]').disable();
        }
    },
    
    //---- FUNCTION PESERTA KOM ----------------------------------------------------------------------------------------

    pesertaKomGridSelectionChange:function (sel, selected) {
        var status = this.getKomFormPanelForm().down('textfield[name=status]').getValue();
        if (selected[0] && (status == 'BARU' || status == 'RAPAT')) {
            this._togglePesertaKomDeleteButton(true);
        } else {
            this._togglePesertaKomDeleteButton(false);
        }
    },

    createPesertaKom:function () {
        var form = this.getKomFormPanelForm();
        var pemasokId = form.down('hiddenfield[name=pemasokId]').getValue();
        var komId = form.down('hiddenfield[name=id]').getValue();
        var personWindowChooser = Ext.widget('personWindowChooser', {parentName:'kom'});
        personWindowChooser.setUrl(Ifuel.config.personUrl + '/byAllPln/byPemasok/' + pemasokId + '/byNotInKom/' + komId);
    },

    deletePesertaKom:function (button) {
        var record = this.getPesertaKomGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url:Ifuel.config.pesertaKomUrl + record.data.id,
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                success:function (response, options) {
                    me.getPesertaKomGridPanel().getStore().reload();
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Peserta Kick-off Meeting');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Peserta Kick-off Meeting');
                }
            });
        }
    },

    choosePerson:function () {
        var me = this;
        var komId = this.getKomFormPanelForm().down('hiddenfield[name=id]').getValue();
        var records = this.getPersonWindowChooser().down('personGridPanel').getSelectionModel().getSelection();
        var datas = [];
        Ext.Array.forEach(records, function (record, i) {
            var data = {
                id:null,
                hadir:null,
                keterangan:null,
                tmPerson:{id:record.data.id},
                trKom:{
                    id:komId
                }
            }
            datas.push(data);
        });

        this.getPersonWindowChooser().close();
        Ext.Ajax.request({
            url:Ifuel.config.pesertaKomUrl + "/all/",
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            params:Ext.JSON.encode(datas),
            success:function (response, options) {
                me.getPesertaKomGridPanel().getStore().reload();
                
                if(me.getStatusPotensiGasGridPanel !== null) {
                    me.getStatusPotensiGasGridPanel().getStore().reload();
                }
                
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Peserta Kick-off Meeting');
            },
            failure:function (response, options) {
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Peserta Kick-off Meeting');
            }
        });
    },

    _togglePesertaKomDeleteButton:function (enable) {
        if (enable) {
            this.getPesertaKomGridPanel().down('button[action=delete]').enable();
        } else {
            this.getPesertaKomGridPanel().down('button[action=delete]').disable();
        }
    },

    // -- Kick-off Meeting ---------------------------------------------------------------------------------------------

    saveChangeStatusKom:function () {
        var me = this;
        var form = this.getChangeStatusKomWindow().down("form");
        var values = form.getValues();

        if (form.getForm().isValid()) {
            //TODO this is a bug
            var record = this.getKomGridPanel().getSelectionModel().getSelection()[0];
            Ext.Ajax.request({
                url:Ifuel.config.komUrl + record.data.id + "/changeStatus/" + values.status,
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                timeout:120000,
                params:Ext.JSON.encode(values.name),
                success:function (response, options) {
                    me.getKomGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Kick-off Meeting');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Kick-off Meeting');
                }
            });
            this.getChangeStatusKomWindow().close();
        }
    },

    changeStatusKom:function () {
//        var window = Ext.widget('changeStatusKomWindow', {
//            parentName:'kom'
//        });
        var lastStatus = this.data;
        console.log(this.data);
        console.log(lastStatus);
        var window = Ext.widget('changeStatusKomWindow', {
            parentName: 'kom', typeComboList: lastStatus == 'RAPAT' ? 0 : (lastStatus == 'LAPORAN_RAPAT' ? 1 : null)
        });
    },

    sendEmailUndanganKom:function () {
        var me = this;
        var form = this.getSendEmailWindow().down("form");
        var values = form.getValues();

        var box = Ext.MessageBox.wait('Email Sedang Di Kirim...', 'Loading');

        if (form.getForm().isValid()) {
            var data = {
                subject:values.subject,
                to:values.to ? values.to.split(',') : null,
                cc:values.cc ? values.cc.split(',') : null,
                bcc:values.bcc ? values.bcc.split(',') : null,
                text:values.text
            }

            //TODO this is a bug
            var record = this.getKomGridPanel().getSelectionModel().getSelection()[0];
            Ext.Ajax.request({
                url:Ifuel.config.komUrl + record.data.id + "/sendEmail/",
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                timeout:120000,
                params:Ext.JSON.encode(data),
                success:function (response, options) {
                    box.hide();
                    me.getHasilKomFormPanel().enable();
                    me.getHasilKomFormPanel().down('htmleditor').enable();
                    var responseText = Ext.JSON.decode(response.responseText);
                    me.getKomGridPanel().getStore().reload();
                    me._showValueKom(responseText);
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kirim Undangan Kick-off Meeting');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kirim Undangan Kick-off Meeting');
                }
            });
            this.getSendEmailWindow().close();
        }
    },

    undangKom:function () {
        var me = this;
        var record = this.getKomGridPanel().getSelectionModel().getSelection()[0];
        Ext.Ajax.request({
            url:Ifuel.config.komUrl + record.data.id + "/getDefaultMail/",
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            success:function (response, options) {
                var data = Ext.JSON.decode(response.responseText);
                var sendEmailWindow = Ext.widget('sendEmailWindow', {parentName:'kom'});
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
        this.getPesertaKomGridPanel().down("button[action=new]").disable();
        this.getDokumenKomGridPanel().down("button[action=new]").disable();
        if (newValue) {
            this.getPesertaKomGridPanel().down("button[action=new]").enable();
            this.getDokumenKomGridPanel().down("button[action=new]").enable();
        }
    },

    statusTextfieldChange:function (hiddenfield, newValue) {
        var form = this.getKomFormPanelForm();
        form.down('textfield[name=nomor]').setReadOnly(true);
        form.down('textfield[name=lokasi]').setReadOnly(true);
        form.down('datefield[name=waktuPelaksanaan]').setReadOnly(true);
        form.down('timefield[name=waktuPelaksanaan]').setReadOnly(true);

        this.getPesertaKomGridPanel().down("button[action=new]").disable();
        this.getDokumenKomGridPanel().down("button[action=new]").disable();

        if(Ext.isEmpty(newValue) || 'BARU' == newValue){
            form.down('textfield[name=nomor]').setReadOnly(false);
            form.down('textfield[name=lokasi]').setReadOnly(false);
            form.down('datefield[name=waktuPelaksanaan]').setReadOnly(false);
            form.down('timefield[name=waktuPelaksanaan]').setReadOnly(false);
        }
        if ('BARU' == newValue || 'RAPAT' == newValue) {
            this.getPesertaKomGridPanel().down("button[action=new]").enable();
            this.getDokumenKomGridPanel().down("button[action=new]").enable();
        }

    },

    komGridSelectionChange:function (sel, selected) {
        if (selected[0]) {
//            this._toggleKomDeleteButton(true);
            var lastStatus = Ifuel.util.SystemUtil.getLastStatusKom(selected[0].data);
            if (lastStatus == "BARU") {
                this._toggleKomUndangButton(true);
            } else {
                this._toggleKomUndangButton(false);
            }
            if (lastStatus == "RAPAT" || lastStatus == "LAPORAN_RAPAT") {
                this._toggleKomChangeStatusButton(true);
            } else {
                this._toggleKomChangeStatusButton(false);
            }
            
            console.log(lastStatus);
            this.setData(lastStatus);
        } else {
//            this._toggleKomDeleteButton(false);
            this._toggleKomUndangButton(false);
            this._toggleKomChangeStatusButton(false);
            this.setData(null);
        }
    },
            
    setData: function (newData) {
        this.data = newData;
    },

    choosePotensiGas:function (grid, record) {
        this._showValuePotensiGas(record.data);
        this.getPotensiGasWindowChooser().close();
    },

    showPotensiGasWindowChooser:function () {
        var potensiGasWindowChooser = Ext.widget('potensiGasWindowChooser', {parentName:'kom'});
        potensiGasWindowChooser.setUrl(Ifuel.config.potensiGasUrl + '/KickOffMeeting');
        potensiGasWindowChooser.show();
    },

    createKom:function () {
        this._clearValueKom();
//        this._toggleKomDeleteButton(false);
        this.activatedTabForm();
        
        this.enableDisableHasilKomFormPanel(false);
	this._toggleKomUndangButton(false);
    },

    showKom:function (grid, record) {
        this.activatedTabForm();
        var form = this.getKomFormPanelForm();
        form.loadRecord(record);
        this._showValueKom(record.data);
    },

//    deleteKom:function (button) {
//        var record = this.getKomGridPanel().getSelectionModel().getSelection()[0];
//        var me = this;
//        if (record) {
//            Ext.Ajax.request({
//                url:Ifuel.config.komUrl + record.data.id,
//                method:'DELETE',
//                headers:{
//                    'Content-Type':'application/json'
//                },
//                success:function (response, options) {
//                    me.getKomGridPanel().getStore().reload();
//                    me._clearValueKom();
//                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Kom Lapangan');
//                },
//                failure:function (response, options) {
//                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Kom Lapangan');
//                }
//            });
//        }
//    },

    saveKom:function () {
        var me = this;
        var form = this.getKomFormPanelForm();
        var values = form.getValues();
        var record = form.getRecord();

        var waktuPelaksanaan = Ext.Date.parse(values.waktuPelaksanaan[0], 'd F Y');
        var jamPelaksanaan = values.waktuPelaksanaan[1].split(':');
        waktuPelaksanaan.setHours(new Number(jamPelaksanaan[0]), new Number(jamPelaksanaan[1]));

        var data = {
            id:record ? values.id : null,
            agenda:values.agenda,
            nomor:values.nomor,
            lokasi:values.lokasi,
            waktuPelaksanaan:Ext.Date.format(waktuPelaksanaan, 'c'),
            hasilPembahasan:this.getHasilKomFormPanel().down('htmleditor').getValue(),
            trPotensiGas:{
                id:values.potensiGasId
            }
        };

        if (form.getForm().isValid()) {
            if (data.id) {
                Ext.Ajax.request({
                    url:Ifuel.config.komUrl + data.id,
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success:function (response, options) {
                        me.getKomGridPanel().getStore().reload();
                        me._reshowValueKom(response.getResponseHeader('Location'));
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kick-off Meeting');
                    },
                    failure:function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kick-off Meeting');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url:Ifuel.config.komUrl,
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success:function (response, options) {
                        me.getKomGridPanel().getStore().reload();
                        me._reshowValueKom(response.getResponseHeader('Location'));
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kick-off Meeting');
                    },
                    failure:function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Kick-off Meeting');
                    }
                });
            }
        }
    },

    activatedTabGrid:function () {
        this.getKomFormPanel().disable();
        this.getHasilKomFormPanel().disable();
        this.getKomTabPanel().setActiveTab(this.getKomGridPanel());

        this.getKomTabPanel().down('button[action=save]').disable();
        if (this.allowWrite) {
            this.getKomTabPanel().down('button[action=new]').enable();
        } else {
            this.getKomTabPanel().down('button[action=new]').disable();
        }
    },

    activatedTabForm:function () {
        this.getKomFormPanel().enable();
        this.getKomTabPanel().setActiveTab(this.getKomFormPanel());

        this.getHasilKomFormPanel().disable();
        this.getHasilKomFormPanel().down('htmleditor').disable();
        var record = this.getKomGridPanel().getSelectionModel().getSelection()[0];
        if (record) {
            var lastStatus = Ifuel.util.SystemUtil.getLastStatusKom(record.data);
            if (lastStatus == "RAPAT" || lastStatus == "RAPAT_LANJUTAN" || lastStatus == "DISETUJUI" || lastStatus == "KUNJUNGAN_LANJUTAN" || lastStatus == "DIBATALKAN") {
                this.getHasilKomFormPanel().enable();
                if (lastStatus == "RAPAT") {
                    this.getHasilKomFormPanel().down('htmleditor').enable();
                }
            }
        }

        if (this.allowWrite) {
            this.getKomTabPanel().down('button[action=new]').enable();
            this.getKomTabPanel().down('button[action=save]').enable();
        } else {
            this.getKomTabPanel().down('button[action=new]').disable();
            this.getKomTabPanel().down('button[action=save]').disable();
        }
    },

    _reshowValueKom:function (url) {
        var me = this;
        Ext.Ajax.request({
            url:url,
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            success:function (response, options) {
                var data = Ext.JSON.decode(response.responseText);
                data.waktuPelaksanaan = new Date(data.waktuPelaksanaan);
                me._showValueKom(data);
            },
            failure:function (response, options) {
            }
        });
    },

    _showValueKom:function (data) {
        var form = this.getKomFormPanelForm();
        this._showValuePotensiGas(data.trPotensiGas);
        this._reloadGrid(data.id);

        form.down('hiddenfield[name=id]').setValue(data.id);
        form.down('textfield[name=nomor]').setValue(data.nomor);

        form.down('datefield[name=waktuPelaksanaan]').setMinValue(data.waktuPelaksanaan);
        form.down('datefield[name=waktuPelaksanaan]').setValue(data.waktuPelaksanaan);
        form.down('datefield[name=waktuPelaksanaan]').clearInvalid();

        form.down('timefield[name=waktuPelaksanaan]').setValue(data.waktuPelaksanaan);
        form.down('timefield[name=waktuPelaksanaan]').clearInvalid();

        this.getHasilKomFormPanel().down('htmleditor').setValue(data.hasilPembahasan);

        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKom(data);
        form.down('textfield[name=status]').setValue(lastStatus ? lastStatus : null);
    },

    _showValuePotensiGas:function (potensiGas) {
        var form = this.getKomFormPanelForm();
        form.down('hiddenfield[name=potensiGasId]').setValue(potensiGas.id);
        form.down('textfield[name=potensiGas]').setValue(potensiGas.id);
        form.down('textfield[name=pembangkit]').setValue(potensiGas.tmPltgm.namaPltgm);
        form.down('textfield[name=sumberGas]').setValue(potensiGas.tmSumberGas.namaSumberGas);
        form.down('textfield[name=pemasok]').setValue(potensiGas.tmPemasok.namaPemasok);
        form.down('hiddenfield[name=pemasokId]').setValue(potensiGas.tmPemasok.id);
    },

    _clearValueKom:function () {
        var form = this.getKomFormPanelForm();
        form.down('hiddenfield[name=potensiGasId]').setValue(null);
        form.down('textfield[name=potensiGas]').setValue(null);
        form.down('textfield[name=pembangkit]').setValue(null);
        form.down('textfield[name=sumberGas]').setValue(null);
        form.down('textfield[name=pemasok]').setValue(null);
        form.down('hiddenfield[name=pemasokId]').setValue(null);

        form.down('hiddenfield[name=id]').setValue(null);
        form.down('textfield[name=nomor]').setValue(null);
        form.down('textfield[name=status]').setValue(null);
        form.down('textfield[name=lokasi]').setValue(null);
        form.down('textarea[name=agenda]').setValue(null);

        form.down('datefield[name=waktuPelaksanaan]').setMinValue(new Date());
        form.down('datefield[name=waktuPelaksanaan]').setValue(null);

        form.down('timefield[name=waktuPelaksanaan]').setValue(null);

        form.down('textfield[name=nomor]').clearInvalid();
        form.down('timefield[name=waktuPelaksanaan]').clearInvalid();
        form.down('textfield[name=potensiGas]').clearInvalid();
        form.down('datefield[name=waktuPelaksanaan]').clearInvalid();
        this.getHasilKomFormPanel().down('htmleditor').setValue(null);

        //ini adalah cara mengosongkan grid+Store -- mumet ndase
        this._reloadPesertaKomGrid(null);
        this._reloadDokumenKomGrid(null);
    },

    _reloadPesertaKomGrid:function (komId) {
        var grid = this.getPesertaKomGridPanel();
        var store = grid.getStore();
        if (komId) {
            var proxy = {
                type:'ajax',
                pageParam:'page.page',
                url:Ifuel.config.pesertaKomUrl + 'byKom/' + komId,
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

    _reloadDokumenKomGrid:function (komId) {
        var grid = this.getDokumenKomGridPanel();
        var store = grid.getStore();
        if (komId) {
            var proxy = {
                type:'ajax',
                pageParam:'page.page',
                url:Ifuel.config.dokKomUrl + 'byKom/' + komId,
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

    _reloadGrid:function (komId) {
        this._reloadPesertaKomGrid(komId);
        this._reloadDokumenKomGrid(komId);
    },

//    _toggleKomDeleteButton:function (enable) {
//        if (enable) {
//            this.getKomTabPanel().down('button[action=delete]').enable();
//        } else {
//            this.getKomTabPanel().down('button[action=delete]').disable();
//        }
//    },

    _toggleKomUndangButton:function (enable) {
        if (enable) {
            this.getKomTabPanel().down('button[action=undang]').enable();
        } else {
            this.getKomTabPanel().down('button[action=undang]').disable();
        }
    },

    _toggleKomChangeStatusButton:function (enable) {
        if (enable) {
            this.getKomTabPanel().down('button[action=changestatus]').enable();
        } else {
            this.getKomTabPanel().down('button[action=changestatus]').disable();
        }
    },
            
    enableDisableHasilKomFormPanel:function(enable) {
        if (enable) {
            this.getHasilKomFormPanel().enable();
            this.getHasilKomFormPanel().down('htmleditor').enable();
        } else {
            this.getHasilKomFormPanel().disable();
            this.getHasilKomFormPanel().down('htmleditor').disable();
        }
    }        

});


