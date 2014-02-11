Ext.define('Ifuel.controller.pengadaan.SkPanitiaController', {
    extend:'Ext.app.Controller',
//        allowWrite:Ifuel.util.SecurityHelper.isWriteAllowed("ANAK_PERUSAHAAN_WRITE"),
    allowWrite:true,

    views:[
        'pengadaan.skPanitia.SkPanitiaPanel',
        'pengadaan.skPanitia.SkPanitiaChangeStatusWindow',
        'pengadaan.personilPanitia.PersonilPanitiaWindowChooser'
    ],
    models:[],
    stores:[],

    refs:[
        //SK Panitia
        {
            ref:'skPanitiaTabPanel',
            selector:'skPanitiaPanel tabpanel'
        },
        {
            ref:'skPanitiaGridPanel',
            selector:'skPanitiaPanel tabpanel skPanitiaGridPanel'
        },
        {
            ref:'skPanitiaFormPanel',
            selector:'skPanitiaPanel tabpanel skPanitiaFormPanel'
        },
        {
            ref:'skPanitiaFormPanelForm',
            selector:'skPanitiaPanel tabpanel skPanitiaFormPanel form'
        },
        {
            ref:'potensiGasWindowChooser',
            selector:'potensiGasWindowChooser[parentName=skPanitia]'
        },
        {
            ref:'skPanitiaChangeStatusWindow',
            selector:'skPanitiaChangeStatusWindow[parentName=skPanitia]'
        },

        //Personil Panitia
        {
            ref:'personilPanitiaGridPanel',
            selector:'skPanitiaPanel tabpanel personilPanitiaGridPanel'
        },
        {
            ref:'personilPanitiaWindowChooser',
            selector:'personilPanitiaWindowChooser[parentName=skPanitia]'
        },
        
        //POTENSI GAS
        {
            ref:'statusPotensiGasGridPanel',
            selector:'pengadaanPotensiGasPanel tabpanel statusPotensiGasGridPanel'
        }
    ],

    init:function () {
        this.control({
            'skPanitiaPanel tabpanel skPanitiaGridPanel':{
                itemdblclick:this.showSkPanitia,
                show:this.activatedTabGrid
            }
        });
        if (this.allowWrite) {
            this.control({
                //SK Panitia
                'skPanitiaPanel tabpanel skPanitiaGridPanel':{
                    selectionchange:this.skPanitiaGridSelectionChange
                },
                'skPanitiaPanel > tabpanel > toolbar button[action=new]':{
                    click:this.createSkPanitia
                },
                'skPanitiaPanel > tabpanel > toolbar button[action=save]':{
                    click:this.saveSkPanitia
                },
//                'skPanitiaPanel > tabpanel > toolbar button[action=delete]':{
//                    click:this.deleteSkPanitia
//                },
                'skPanitiaPanel > tabpanel > toolbar button[action=changestatus]':{
                    click:this.changeStatusSkPanitia
                },
                'skPanitiaPanel tabpanel skPanitiaFormPanel form hiddenfield[name=id]':{
                    change:this.idHiddenfieldChange
                },
                'skPanitiaPanel tabpanel skPanitiaFormPanel form fieldcontainer[groupField=potensiGas] button[action=search]':{
                    click:this.showPotensiGasWindowChooser
                },
                'skPanitiaPanel tabpanel skPanitiaFormPanel form button[action=download]':{
                    click:this.showDokumenSkPanitia
                },
                'potensiGasWindowChooser[parentName=skPanitia] potensiGasGridPanel':{
                    itemdblclick:this.choosePotensiGas
                },
                'skPanitiaChangeStatusWindow[parentName=skPanitia] button[action=save]':{
                    click:this.saveChangeStatusSkPanitia
                },
                'skPanitiaChangeStatusWindow[parentName=skPanitia] combobox[name=status]':{
                    change:this.statusComboboxChange
                },

                //Personil Panitia
                'skPanitiaPanel personilPanitiaGridPanel':{
                    selectionchange:this.personilPanitiaGridSelectionChange
                },
                'skPanitiaPanel personilPanitiaGridPanel button[action=new]':{
                    click:this.createPersonilPanitia
                },
                'skPanitiaPanel personilPanitiaGridPanel button[action=delete]':{
                    click:this.deletePersonilPanitia
                },
                'personilPanitiaWindowChooser[parentName=skPanitia] button[action=save]':{
                    click:this.choosePersonilPanitia
                }
            });
        } else {
            this.control({
                'skPanitiaPanel':{
                    afterrender:function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
//                        panel.down("button[action=delete]").setDisabled(true);
                        panel.down("button[action=undang]").setDisabled(true);
                        panel.down("button[action=changestatus]").setDisabled(true);
                    }
                },
                'skPanitiaPanel personilPanitiaGridPanel':{
                    afterrender:function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                }
            });
        }
    },

    //---- FUNCTION PERSONIL PANITIA -----------------------------------------------------------------------------------

    personilPanitiaGridSelectionChange:function (sel, selected) {
        if (selected[0]) {
            this._togglePersonilPanitiaDeleteButton(true);
        } else {
            this._togglePersonilPanitiaDeleteButton(false);
        }
    },

    createPersonilPanitia:function () {
        var skPanitiaId = this.getSkPanitiaFormPanelForm().down('hiddenfield[name=id]').getValue();
        var personilWindow = Ext.widget('personilPanitiaWindowChooser', {parentName:'skPanitia'});
        personilWindow.setUrl(Ifuel.config.personUrl + '/byAllPln/byNotInSkPanitia/' + skPanitiaId);
    },

    deletePersonilPanitia:function (button) {
        var record = this.getPersonilPanitiaGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url:Ifuel.config.personilPanitiaUrl + record.data.id,
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                success:function (response, options) {
                    me.getPersonilPanitiaGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    me.getSkPanitiaGridPanel().getStore().reload();
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Personil Panitia');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Personil Panitia');
                }
            });
        }
    },

    choosePersonilPanitia:function () {
        var me = this;
        var personilPanitiaWindowChooser = this.getPersonilPanitiaWindowChooser();
        var form = personilPanitiaWindowChooser.down('form');
        var personGridPanel = personilPanitiaWindowChooser.down('personGridPanel');
        var values = form.getValues();

        if (form.getForm().isValid() && personGridPanel.getSelectionModel().hasSelection()) {
            var skPanitiaId = this.getSkPanitiaFormPanelForm().down('hiddenfield[name=id]').getValue();
            var records = personGridPanel.getSelectionModel().getSelection();

            var datas = [];
            Ext.Array.forEach(records, function (record, i) {
                var data = {
                    id:null,
                    tugas:values.tugas,
                    tmPerson:{id:record.data.id}
                }
                datas.push(data);
            });

            this.getPersonilPanitiaWindowChooser().close();
            Ext.Ajax.request({
                url:Ifuel.config.personilPanitiaUrl + "skPanitia/" + skPanitiaId + "/all/",
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(datas),
                success:function (response, options) {
                    me.getPersonilPanitiaGridPanel().getStore().reload();
                    me.getSkPanitiaGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Personil Panitia');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Personil Panitia');
                }
            });
        }
    },

    _togglePersonilPanitiaDeleteButton:function (enable) {
        if (enable) {
            this.getPersonilPanitiaGridPanel().down('button[action=delete]').enable();
        } else {
            this.getPersonilPanitiaGridPanel().down('button[action=delete]').disable();
        }
    },

    _reloadPersonilPanitiaGrid:function (skPanitiaId) {
        var grid = this.getPersonilPanitiaGridPanel();
        var store = grid.getStore();
        if (skPanitiaId) {
            var proxy = {
                type:'ajax',
                pageParam:'page.page',
                url:Ifuel.config.personilPanitiaUrl + 'bySkPanitia/' + skPanitiaId,
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

    //---- FUNCTION SK PANITIA -----------------------------------------------------------------------------------------

    statusComboboxChange:function (combobox, newValue, oldValue) {
        if (newValue == 'DISETUJUI') {
            this.getSkPanitiaChangeStatusWindow().down('sendEmailForm').show();
        } else {
            this.getSkPanitiaChangeStatusWindow().down('sendEmailForm').hide();
        }
    },

    saveChangeStatusSkPanitia:function () {
        var me = this;
        var form = this.getSkPanitiaChangeStatusWindow().down("form");
        var values = form.getValues();

        var box = Ext.MessageBox.wait('Email Sedang Di Kirim...', 'Loading');

        var record = this.getSkPanitiaGridPanel().getSelectionModel().getSelection()[0];
        if (values.status == 'DISETUJUI') {
            var sendEmailForm = this.getSkPanitiaChangeStatusWindow().down("sendEmailForm");
            if (form.getForm().isValid() && sendEmailForm.getForm().isValid()) {
                var emailValues = sendEmailForm.getValues();
                var data = {
                    subject:emailValues.subject,
                    to:emailValues.to ? emailValues.to.split(',') : null,
                    cc:emailValues.cc ? emailValues.cc.split(',') : null,
                    bcc:emailValues.bcc ? emailValues.bcc.split(',') : null,
                    text:emailValues.text,
                    fileName:emailValues.fileName,
                    url:emailValues.url
                }

                Ext.Ajax.request({
                    url:Ifuel.config.skPanitiaUrl + record.data.id + "/sendEmail/",
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
//                    waitMsg: 'Uploading...',
                    timeout:120000,
                    params:Ext.JSON.encode(data),
                    success:function (response, options) {
                        box.hide();
                        var responseText = Ext.JSON.decode(response.responseText);
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        me.getSkPanitiaGridPanel().getStore().reload();
                        me._showValueSkPanitia(responseText);
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status SK Panitia dan Kirim Email');
                    },
                    failure:function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status SK Panitia dan Kirim Email');
                    }
                });
                this.getSkPanitiaChangeStatusWindow().close();
            }
        } else if (values.status = 'DIBATALKAN') {
            if (form.getForm().isValid()) {
                var data = record.data;
                data.status = values.status;
                Ext.Ajax.request({
                    url:Ifuel.config.skPanitiaUrl + data.id,
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success:function (response, options) {
                        me.getSkPanitiaGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        me._reshowValueSkPanitia(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'SK Panitia');
                    },
                    failure:function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'SK Panitia');
                    }
                });
            }
            this.getSkPanitiaChangeStatusWindow().close();
        }

    },

    changeStatusSkPanitia:function () {
        var record = this.getSkPanitiaGridPanel().getSelectionModel().getSelection()[0];
        var window = Ext.widget('skPanitiaChangeStatusWindow', {
            parentName:'skPanitia'
        });
        Ext.Ajax.request({
            url:Ifuel.config.skPanitiaUrl + record.data.id + "/getDefaultMail/",
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            success:function (response, options) {
                var data = Ext.JSON.decode(response.responseText);
                window.down("textfield[name=to]").setValue(data.to);
                window.down("textfield[name=cc]").setValue(data.cc);
                window.down("textfield[name=bcc]").setValue(data.bcc);
                window.down("textfield[name=subject]").setValue(data.subject);
                window.down("textfield[name=text]").setValue(data.text);
                window.down("textfield[name=fileName]").setValue(record.data.dokumen);
                window.down("hiddenfield[name=url]").setValue(location.protocol + '//' + location.host + Ifuel.config.skPanitiaUrl + 'download/' + record.data.id);
                console.log("URL " + location.protocol + '//' + location.host + Ifuel.config.skPanitiaUrl + 'download/' + record.data.id);
            },
            failure:function (response, options) {
            }
        });
    },

    showDokumenSkPanitia:function () {
        var hiddenfield = this.getSkPanitiaFormPanelForm().down('hiddenfield[name=id]');
        window.open(Ifuel.config.skPanitiaUrl + 'download/' + hiddenfield.getValue());
    },

    showSkPanitia:function (grid, record) {
        var form = this.getSkPanitiaFormPanelForm();

        this._clearValueSkPanitia();
        form.down('filefield[name=uploadedfiles]').allowBlank = true;
        form.down('button[action=download]').enable();
        this.activatedTabForm();

        form.loadRecord(record);
        this._showValueSkPanitia(record.data);
    },

    idHiddenfieldChange:function (hiddenfield, newValue) {
        this.getPersonilPanitiaGridPanel().down("button[action=new]").disable();
        if (newValue) {
            this.getPersonilPanitiaGridPanel().down("button[action=new]").enable();
        }
    },

    showPotensiGasWindowChooser:function () {
        var potensiGasWindowChooser = Ext.widget('potensiGasWindowChooser', {parentName:'skPanitia'});
        potensiGasWindowChooser.setUrl(Ifuel.config.potensiGasUrl + '/SKPanitia');
        potensiGasWindowChooser.show();
    },

    choosePotensiGas:function (grid, record) {
        this._showValuePotensiGas(record.data);
        this.getPotensiGasWindowChooser().close();
    },

    saveSkPanitia:function (button) {
        var me = this;
        var form = this.getSkPanitiaFormPanelForm();
        var filefield = form.down('filefield');
        var values = form.getValues();

        if (form.getForm().isValid()) {
            //create atau update dengan upload file
            if (!Ext.isEmpty(filefield.getValue())) {
                form.submit({                       //jika id kosong berarti ke url create, jika ada id ke url update
                    url:Ifuel.config.skPanitiaUrl + (Ext.isEmpty(values.id) ? '' : values.id + '/') + 'upload/',
                    waitMsg:'Uploading your document...',
                    success:function (form, action) {
                        var data = Ext.JSON.decode(action.response.responseText).data;
                        me._showValueSkPanitia(data);
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        me.getSkPanitiaGridPanel().getStore().reload();
                        Ext.Msg.alert('Success', 'Dokumen telah uploaded.');
                    },
                    failure:function (form, action) {
                        Ext.Msg.alert('Failed', action.result.msg);
                    }
                })
            }
            //update tanpa reupload file
            else {
                var data = {
                    id:values.id,
                    nomor:values.nomor,
                    status:values.status,
                    trPotensiGas:{
                        id:values.potensiGasId
                    }
                };
                Ext.Ajax.request({
                    url:Ifuel.config.skPanitiaUrl + values.id,
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success:function (response, options) {
                        me.getSkPanitiaGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        me._reshowValueSkPanitia(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'SK Panitia');
                    },
                    failure:function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'SK Panitia');
                    }
                });
            }
        }
    },

    skPanitiaGridSelectionChange:function (sel, selected) {
        if (selected[0]) {
//            this._toggleSkPanitiaDeleteButton(true);
            if (selected[0].data.status == "BARU") {
                this._toggleSkPanitiaChangeStatusButton(true);
            } else {
                this._toggleSkPanitiaChangeStatusButton(false);
            }
        } else {
//            this._toggleSkPanitiaDeleteButton(false);
            this._toggleSkPanitiaChangeStatusButton(false);
        }
    },

    createSkPanitia:function () {
        this._clearValueSkPanitia();
//        this._toggleSkPanitiaDeleteButton(false);
        this.activatedTabForm();
        var form = this.getSkPanitiaFormPanelForm();
        form.down('filefield[name=uploadedfiles]').allowBlank = false;
        form.down('button[action=download]').disable();
    },

    activatedTabGrid:function () {
        this.getSkPanitiaFormPanel().disable();
        this.getSkPanitiaTabPanel().setActiveTab(this.getSkPanitiaGridPanel());

        this.getSkPanitiaTabPanel().down('button[action=save]').disable();
        if (this.allowWrite) {
            this.getSkPanitiaTabPanel().down('button[action=new]').enable();
        } else {
            this.getSkPanitiaTabPanel().down('button[action=new]').disable();
        }
    },

    activatedTabForm:function () {
        this.getSkPanitiaFormPanel().enable();
        this.getSkPanitiaTabPanel().setActiveTab(this.getSkPanitiaFormPanel());

        if (this.allowWrite) {
            this.getSkPanitiaTabPanel().down('button[action=new]').enable();
            this.getSkPanitiaTabPanel().down('button[action=save]').enable();
        } else {
            this.getSkPanitiaTabPanel().down('button[action=new]').disable();
            this.getSkPanitiaTabPanel().down('button[action=save]').disable();
        }
    },

    _clearValueSkPanitia:function () {
        var form = this.getSkPanitiaFormPanelForm();
        form.down('hiddenfield[name=potensiGasId]').setValue(null);
        form.down('textfield[name=potensiGas]').setValue(null);
        form.down('textfield[name=pembangkit]').setValue(null);
        form.down('textfield[name=sumberGas]').setValue(null);
        form.down('textfield[name=pemasok]').setValue(null);

        form.down('hiddenfield[name=id]').setValue(null);
        form.down('textfield[name=nomor]').setValue(null);
        form.down('textfield[name=status]').setValue(null);
        form.down('filefield[name=uploadedfiles]').reset();

        form.down('filefield[name=uploadedfiles]').clearInvalid();
        form.down('textfield[name=nomor]').clearInvalid();
        form.down('textfield[name=potensiGas]').clearInvalid();

        //ini adalah cara mengosongkan grid+Store -- mumet ndase
        this._reloadPersonilPanitiaGrid(null);
    },


    _reshowValueSkPanitia:function (url) {
        var me = this;
        Ext.Ajax.request({
            url:url,
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            success:function (response, options) {
                var data = Ext.JSON.decode(response.responseText);
                me._showValueSkPanitia(data);
            },
            failure:function (response, options) {
            }
        });
    },

    _showValueSkPanitia:function (data) {
        var form = this.getSkPanitiaFormPanelForm();

        this._showValuePotensiGas(data.trPotensiGas);
        this._reloadPersonilPanitiaGrid(data.id);

        form.down('hiddenfield[name=id]').setValue(data.id);
        form.down('textfield[name=nomor]').setValue(data.nomor);
        form.down('textfield[name=status]').setValue(data.status);
        form.down('filefield[name=uploadedfiles]').setRawValue(data.dokumen);
    },

    _showValuePotensiGas:function (potensiGas) {
        var form = this.getSkPanitiaFormPanelForm();
        form.down('hiddenfield[name=potensiGasId]').setValue(potensiGas.id);
        form.down('textfield[name=potensiGas]').setValue(potensiGas.id);
        form.down('textfield[name=pembangkit]').setValue(potensiGas.tmPltgm.namaPltgm);
        form.down('textfield[name=sumberGas]').setValue(potensiGas.tmSumberGas.namaSumberGas);
        form.down('textfield[name=pemasok]').setValue(potensiGas.tmPemasok.namaPemasok);
    },

//    _toggleSkPanitiaDeleteButton:function (enable) {
//        if (enable) {
//            this.getSkPanitiaTabPanel().down('button[action=delete]').enable();
//        } else {
//            this.getSkPanitiaTabPanel().down('button[action=delete]').disable();
//        }
//    },

    _toggleSkPanitiaChangeStatusButton:function (enable) {
        if (enable) {
            this.getSkPanitiaTabPanel().down('button[action=changestatus]').enable();
        } else {
            this.getSkPanitiaTabPanel().down('button[action=changestatus]').disable();
        }
    }
});


