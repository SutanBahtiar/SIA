Ext.define('Ifuel.controller.pengadaan.KeytermsController', {
    extend: 'Ext.app.Controller',
//        allowWrite:Ifuel.util.SecurityHelper.isWriteAllowed("ANAK_PERUSAHAAN_WRITE"),
    allowWrite: true,
//    allowWrite: false,

    views: [
        "pengadaan.keyterms.KeytermsPanel",
        "pengadaan.mou.MouWindowChooser",
        "pengadaan.isuKeyterms.IsuKeytermsWindow",
        "pengadaan.keyterms.KeytermsChangeStatusWindow"
    ],
    models: [],
    stores: [],

    /**
     * Field ini adalah data keyterms yang dipilih untuk ditampilkan di form.
     * Jika ada data pada grid panel di-double click, data tersebut di-assign ke field ini.
     * Jika setelah save data baru/update/change status, data yang disave akan diambil dari server dan di-assign ke field ini.
     * Field ini akan di-assign null jika: menekan tombol new.
     */
    data: null,

    refs: [
        //selector untuk bagian TrKeyterms
        {
            ref: 'keytermsTabPanel',
            selector: 'keytermsPanel tabpanel'
        },
        {
            ref: 'keytermsGridPanel',
            selector: 'keytermsPanel tabpanel keytermsGridPanel'
        },
        {
            ref: 'keytermsFormPanel',
            selector: 'keytermsPanel tabpanel keytermsFormPanel'
        },
        {
            ref: 'keytermsFormPanelForm',
            selector: 'keytermsPanel tabpanel keytermsFormPanel form'
        },
        {
            ref: 'keytermsIdHiddenField',
            selector: 'keytermsPanel tabpanel keytermsFormPanel form hiddenfield[name=id]'
        },
        {
            ref: 'mouWindowChooser',
            selector: 'mouWindowChooser[parentName=keyterms]'
        },
        {
            ref: 'keytermsChangeStatusWindow',
            selector: 'keytermsChangeStatusWindow[parentName=keyterms]'
        },

        //Isu keyterms
        {
            ref: 'isuKeytermsGridPanel',
            selector: 'keytermsPanel tabpanel keytermsFormPanel simpleIsuKeytermsGridPanel'
        },
        {
            ref: 'isuKeytermsWindow',
            selector: 'isuKeytermsWindow[parentName=keyterms]'
        },
        
        //POTENSI GAS
        {
            ref:'statusPotensiGasGridPanel',
            selector:'pengadaanPotensiGasPanel tabpanel statusPotensiGasGridPanel'
        }
    ],

    init: function () {
        var me = this;
        this.control({
            'keytermsPanel tabpanel keytermsGridPanel': {
                itemdblclick: this.keytermsGridItemdblclick,
                show: this.keytermsGridShow
            },
            'keytermsPanel tabpanel keytermsFormPanel simpleIsuKeytermsGridPanel': {
                itemdblclick: this.isuKeytermsGridItemdblclick
            }
        });
        if (this.allowWrite) {
            this.control({
                //segala hal yang berhubungan dengan tabel TrKeyterms
                'keytermsPanel tabpanel keytermsGridPanel': {
                    selectionchange: this.keytermsGridSelectionChange
                },
                'keytermsPanel > tabpanel > toolbar button[action=new]': {
                    click: this.keytermsButtonNewClick
                },
                'keytermsPanel > tabpanel > toolbar button[action=save]': {
                    click: this.keytermsButtonSaveClick
                },
                'keytermsPanel > tabpanel > toolbar button[action=changestatus]': {
                    click: this.keytermsButtonChangestatusClick
                },
                'keytermsPanel tabpanel keytermsFormPanel form button[action=mouSearch]': {
                    click: this.keytermsButtonMouSearchClick
                },
                'mouWindowChooser[parentName=keyterms] mouGridPanel': {
                    itemdblclick: this.keytermsMouGridItemdblclick
                },
                'keytermsChangeStatusWindow[parentName=keyterms] button[action=save]': {
                    click: this.keytermsChangestatusButtonSaveClick
                },

                //isu keyterms
                'keytermsPanel tabpanel keytermsFormPanel simpleIsuKeytermsGridPanel': {
                    selectionchange: this.isuKeytermsGridSelectionChange
                },
                'keytermsPanel tabpanel keytermsFormPanel simpleIsuKeytermsGridPanel button[action=new]': {
                    click: this.isuKeytermsButtonNewClick
                },
                'keytermsPanel tabpanel keytermsFormPanel simpleIsuKeytermsGridPanel button[action=delete]': {
                    click: this.isuKeytermsButtonDeleteClick
                },
                'isuKeytermsWindow[parentName=keyterms] button[action=save]': {
                    click: this.isuKeytermsWindowButtonSaveClick
                }
            });
        } else {
            this.control({
                'keytermsPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=changestatus]").setDisabled(true);
                    }
                },
                'keytermsPanel tabpanel keytermsFormPanel simpleIsuKeytermsGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                }
            });
        }
    },

    // ---- Isu Keyterms ------------------------------------------------------------------------------------

    isuKeytermsGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKeyterms(this.data);
        if ('DRAFT' == lastStatus && selected[0]) {
            this.toggleIsuKeytermsDeleteButton(true);
        } else {
            this.toggleIsuKeytermsDeleteButton(false);
        }
    },

    isuKeytermsButtonDeleteClick: function (button) {
        var record = this.getIsuKeytermsGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.isuKeytermsUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getIsuKeytermsGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Isu Keyterms of Agreement');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Isu Keyterms of Agreement');
                }
            });
        }
    },

    isuKeytermsGridItemdblclick: function (o, record) {
        var formWindow = Ext.widget('isuKeytermsWindow', {
            parentName: 'keyterms', hiddenRiwayatIsu: false, hiddenFinalisasi: false
        });
        formWindow.down("form").loadRecord(record);
        formWindow.setUrl(Ifuel.config.riwayatIsuKeytermsUrl + "byIsuKeyterms/" + record.data.id + "?page.size=1&page.page=1&page.sort=createdAt&page.sort.dir=desc");

        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKeyterms(this.data);
        if (this.allowWrite && ("DRAFT" == lastStatus || "DRAFT_FINAL" == lastStatus)) {
            formWindow.down("button[action=save]").enable();
        }
    },

    isuKeytermsButtonNewClick: function () {
        Ext.widget('isuKeytermsWindow', {parentName: 'keyterms', hiddenRiwayat:true, hiddenFinalisasi: true});
    },

    isuKeytermsWindowButtonSaveClick: function (button) {
        var me = this;
        var form = this.getIsuKeytermsWindow().down('form');
        
        var values = form.getForm().getValues();
        
        var status;
        if(values.status==='') {
            status = null;
        } else {
            status = values.status;
        }
      
        values.status = status;
        values.trKeyterms = {id: this.data.id};
        if (form.getForm().isValid()) {
            if (values.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.isuKeytermsUrl + "simple/" + values.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(values),
                    success: function (response, options) {
                        me.getIsuKeytermsGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Isu Keyterms of Agreement');
                        me.getIsuKeytermsWindow().close();
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Isu Keyterms of Agreement');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.isuKeytermsUrl + "simple/",
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(values),
                    success: function (response, options) {
                        me.getIsuKeytermsGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Isu Keyterms of Agreement');
                        me.getIsuKeytermsWindow().close();
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Isu Keyterms of Agreement');
                    }
                });
            }
        }
    },

    toggleIsuKeytermsDeleteButton: function (enable) {
        if (enable) {
            this.getIsuKeytermsGridPanel().down('button[action=delete]').enable();
        } else {
            this.getIsuKeytermsGridPanel().down('button[action=delete]').disable();
        }
    },

    // ---- Keyterms ----------------------------------------------------------------------------------------

    keytermsGridShow: function () {
        var keytermsGridPanel = this.getKeytermsGridPanel();
        this.getKeytermsFormPanel().disable();
        this.getKeytermsTabPanel().setActiveTab(keytermsGridPanel);

        var records = keytermsGridPanel.getSelectionModel().getSelection();
        if (!Ext.isEmpty(records[0])) {
            this.setData(records[0].data);
        } else {
            this.setData(null);
        }
    },

    keytermsGridSelectionChange: function (sel, selected) {
        if (!this.getKeytermsGridPanel().isHidden()) {
            if (selected[0]) {
                this.setData(selected[0].data);
            } else {
                this.setData(null);
            }
        }
    },

    keytermsButtonNewClick: function () {
        this.activatedTabForm();  //jangan dibalik
        this.setData(null);
    },

    keytermsGridItemdblclick: function (grid, record) {
        this.activatedTabForm(); //jangan dibalik
        this.setData(record.data);
    },

    keytermsButtonMouSearchClick: function () {
        var mouWindowChooser = Ext.create('Ifuel.view.pengadaan.mou.MouWindowChooser', {parentName: 'keyterms'});
        mouWindowChooser.setUrl(Ifuel.config.mouUrl + '/NotHasKeyterms/byStatus/DISETUJUI');
        mouWindowChooser.show();
    },

    keytermsMouGridItemdblclick: function (grid, record) {
        this.showValueMou(record.data);
        this.getMouWindowChooser().close();
    },

    keytermsButtonSaveClick: function () {
        var me = this;
        var form = this.getKeytermsFormPanelForm();
        var values = form.getValues();

        var keyterms = {
            id: !Ext.isEmpty(values.id) ? values.id : null,
            tanggalPersetujuan: Ext.isEmpty(values.tanggalPersetujuan) ? null : Ext.Date.format(Ext.Date.parse(values.tanggalPersetujuan, 'd F Y'), 'c'),
            trMou: {
                id: values.mouId
            }
        };
        
        console.log(Ext.JSON.encode(keyterms));

        if (form.getForm().isValid()) {
            if (keyterms.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.keytermsUrl + keyterms.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(keyterms),
                    success: function (response, options) {
                        me.getKeytermsGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        me.reshowValueKeyterms(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Keyterms of Agreement');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Keyterms of Agreement');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.keytermsUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(keyterms),
                    success: function (response, options) {
                        me.getKeytermsGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        me.reshowValueKeyterms(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Keyterms of Agreement');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Keyterms of Agreement');
                    }
                });
            }
        }
    },

    keytermsButtonChangestatusClick: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKeyterms(this.data);
        var window = Ext.widget('keytermsChangeStatusWindow', {
            parentName: 'keyterms',
            typeComboList: lastStatus == 'DRAFT' ? 0 : (lastStatus == 'DRAFT_DISETUJUI' ? 1 : null)
        });
    },

    keytermsChangestatusButtonSaveClick: function () {
        var me = this;
        var form = this.getKeytermsChangeStatusWindow().down("form");
        var values = form.getValues();

        if (form.getForm().isValid()) {

            /**
             * Jika status adalah DISETUJUI harus menyertakan nilai persetujuan pada body.
             */

            var valuesPersetujuanKeyterms = null;
            var isRequest = true; // status apapun akan melakukan request, kecuali untuk DISETUJUI harus diisi form->persetujuan
            if ('DISETUJUI' == values.status) { //jika status adalah disetujui, ambil nilai form->persetujuan
                if (form.getForm().isValid()) {
                    valuesPersetujuanKeyterms = {
                        tanggalPersetujuan: Ext.isEmpty(values.tanggalPersetujuan) ? null : Ext.Date.format(Ext.Date.parse(values.tanggalPersetujuan, 'd F Y'), 'c')
                    };
                } else {
                    isRequest = false;
                }
            }
            if (isRequest) { //jika bisa melakukan request
                Ext.Ajax.request({
                    url: Ifuel.config.keytermsUrl + me.data.id + "/changeStatus/" + values.status,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 120000,
                    params: Ext.JSON.encode(valuesPersetujuanKeyterms),
                    success: function (response, options) {
                        me.reshowValueKeyterms(Ifuel.config.keytermsUrl + me.data.id); //bagian ini jangan terbalik
                        me.getKeytermsGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Keyterms of Agreement');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Keyterms of Agreement');
                    }
                });
                this.getKeytermsChangeStatusWindow().close();
            }
        }
    },

    reshowValueKeyterms: function (url) {
        var me = this;
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response, options) {
                var responseData = Ext.JSON.decode(response.responseText);
                responseData.tglKeyterms = Ext.isEmpty(responseData.tglKeyterms) ? null : new Date(responseData.tglKeyterms);
                responseData.waktuPengingat = Ext.isEmpty(responseData.waktuPengingat) ? null : new Date(responseData.waktuPengingat);
                me.setData(responseData);
            },
            failure: function (response, options) {
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Keyterms of Agreement');
            }
        });
    },

    /**
     * memberikan nilai pada data untuk controller ini yang sedang aktif.
     * dipanggil ketika grid keyterms di click/dblclick, sukses update data(reshowValueKeyterms(url)),
     * dan ketika tombol new keyterms ditekan(membuat keyterms baru -- data adalah null).
     * @param newData
     */
    setData: function (newData) {
        this.data = newData;

        this.buttonDataChange();

        if (this.getKeytermsGridPanel().isHidden()) {
            this.formDataChange();
            if (!Ext.isEmpty(this.data)) {//jika grid click/dblclick atau update data(reshowValueKeyterms(url))
                this.showValueKeyterms();
            } else {//jika data kosong atau buat data baru (tombol new keyterms ditekan)
                this.clearValueKeyterms();
            }
        }
    },

    buttonDataChange: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKeyterms(this.data);
        var keytermsTabPanel = this.getKeytermsTabPanel();
        var keytermsGridPanel = this.getKeytermsGridPanel();
        var isuKeytermsGridPanel = this.getIsuKeytermsGridPanel();

        keytermsTabPanel.down('button[action=changestatus]').disable();
        keytermsTabPanel.down('button[action=save]').disable();
        isuKeytermsGridPanel.down("button[action=new]").disable();

        if (this.allowWrite) {
            if (Ext.isEmpty(this.data)) {//jika buat data baru
                if (keytermsGridPanel.isHidden()) {
                    keytermsTabPanel.down('button[action=save]').enable();
                }
            }

            if ('DRAFT' == lastStatus || 'DRAFT_FINAL' == lastStatus || 'DRAFT_DISETUJUI' == lastStatus) {
                keytermsTabPanel.down('button[action=changestatus]').enable();
                isuKeytermsGridPanel.down("button[action=new]").enable();

                if (keytermsGridPanel.isHidden()) {//jika update data pas status DRAFT / DRAFT_FINAL
                    keytermsTabPanel.down('button[action=save]').enable();
                }
            }
        }
    },

    formDataChange: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKeyterms(this.data);
        var form = this.getKeytermsFormPanelForm();

//        form.down('textfield[name=nomor]').setReadOnly(true);

        if (this.allowWrite) {
            if (Ext.isEmpty(lastStatus) || 'DRAFT' == lastStatus) {
//                form.down('textfield[name=nomor]').setReadOnly(false);
            }
        }
    },

    clearValueKeyterms: function () {
        var form = this.getKeytermsFormPanelForm();

        form.getForm().reset();
        form.down('button[action=mouSearch]').enable();

        this.reloadGrid(null);
    },

    showValueKeyterms: function () {
        var form = this.getKeytermsFormPanelForm();
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKeyterms(this.data);

        form.loadRecord(new Ifuel.model.pengadaan.TrKeyterms(this.data));

        this.showValueMou(this.data.trMou);
        this.reloadGrid(this.data.id);

        form.down('textfield[name=status]').setValue(lastStatus);
        form.down('textfield[name=nomor]').setValue("KT-" + this.data.id);
    },

    showValueMou: function (mou) {
        var form = this.getKeytermsFormPanelForm();
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusKeyterms(this.data);
        var potensiGas = mou.trPotensiGas;

        form.down('hiddenfield[name=mouId]').setValue(mou.id);
        form.down('textfield[name=mou]').setValue(mou.judulIndonesia);
        form.down('textfield[name=pembangkit]').setValue(potensiGas.tmPltgm.namaPltgm);
        form.down('textfield[name=sumberGas]').setValue(potensiGas.tmSumberGas.namaSumberGas);
        form.down('textfield[name=pemasok]').setValue(potensiGas.tmPemasok.namaPemasok);

        form.down('button[action=mouSearch]').disable();
        if ('DRAFT' == lastStatus) {
            form.down('button[action=mouSearch]').enable();
        }
    },

    reloadGrid: function (keytermsId) {
        this.reloadIsuKeytermsGrid(keytermsId);
    },

    reloadIsuKeytermsGrid: function (keytermsId) {
        var grid = this.getIsuKeytermsGridPanel();
        var store = grid.getStore();
        if (keytermsId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.isuKeytermsUrl + 'simple/byKeyterms/' + keytermsId,
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
        var keytermsFormPanel = this.getKeytermsFormPanel();
        keytermsFormPanel.enable();
        this.getKeytermsTabPanel().setActiveTab(keytermsFormPanel);
    }
});


