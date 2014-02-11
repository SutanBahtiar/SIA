Ext.define('Ifuel.controller.pengadaan.PjbgController', {
    extend: 'Ext.app.Controller',
//        allowWrite:Ifuel.util.SecurityHelper.isWriteAllowed("ANAK_PERUSAHAAN_WRITE"),
    allowWrite: true,
//    allowWrite: false,

    views: [
        "pengadaan.mou.MouWindowChooser",
        "pengadaan.pjbg.PjbgPanel",
        "pengadaan.pjbg.PjbgChangeStatusWindow",
        "pengadaan.pjbg.PjbgCopyPasalWindow",
        "pengadaan.hargaGasPjbg.HargaGasPjbgWindow",
        "pengadaan.specGasPjbg.SpecGasPjbgWindow",
        "pengadaan.pasalPjbg.PasalPjbgRiwayatPasalWindow"
    ],
    models: [],
    stores: [],

    /**
     * Field ini adalah data pjbg yang dipilih untuk ditampilkan di form.
     * Jika ada data pada grid panel di-double click, data tersebut di-assign ke field ini.
     * Jika setelah save data baru/update/change status, data yang disave akan diambil dari server dan di-assign ke field ini.
     * Field ini akan di-assign null jika: menekan tombol new.
     */
    data: null,

    refs: [
        //selector untuk bagian TrPjbg
        {
            ref: 'pjbgTabPanel',
            selector: 'pjbgPanel tabpanel'
        },
        {
            ref: 'pjbgGridPanel',
            selector: 'pjbgPanel tabpanel pjbgGridPanel'
        },
        {
            ref: 'pjbgFormPanel',
            selector: 'pjbgPanel tabpanel pjbgFormPanel'
        },
        {
            ref: 'pjbgFormPanelForm',
            selector: 'pjbgPanel tabpanel pjbgFormPanel form'
        },
        {
            ref: 'pjbgIdHiddenField',
            selector: 'pjbgPanel tabpanel pjbgFormPanel form hiddenfield[name=id]'
        },
        {
            ref: 'mouWindowChooser',
            selector: 'mouWindowChooser[parentName=pjbg]'
        },
        {
            ref: 'pjbgChangeStatusWindow',
            selector: 'pjbgChangeStatusWindow[parentName=pjbg]'
        },

        //spec gas
        {
            ref: 'specGasPjbgGridPanel',
            selector: 'pjbgPanel tabpanel specGasPjbgGridPanel'
        },
        {
            ref: 'specGasPjbgWindow',
            selector: 'specGasPjbgWindow[parentName=pjbg]'
        },

        //harga gas
        {
            ref: 'hargaGasPjbgGridPanel',
            selector: 'pjbgPanel tabpanel pjbgFormPanel hargaGasPjbgGridPanel'
        },
        {
            ref: 'hargaGasPjbgWindow',
            selector: 'hargaGasPjbgWindow[parentName=pjbg]'
        },

        //salin pasal
        {
            ref: 'copyPasalWindow',
            selector: 'pjbgCopyPasalWindow[parentName=pjbg]'
        },
        {
            ref: 'copyPasalTab',
            selector: 'pjbgCopyPasalWindow[parentName=pjbg] tabpanel'
        },
        {
            ref: 'copyPasalPjbgGridPanel',
            selector: 'pjbgCopyPasalWindow[parentName=pjbg] pjbgGridPanel'
        },
        {
            ref: 'copyPasalPasalPjbgAyatPanel',
            selector: 'pjbgCopyPasalWindow[parentName=pjbg] simplePasalPjbgSimpleAyatPanel'
        },
        {
            ref: 'copyPasalPasalPjbgGridPanel',
            selector: 'pjbgCopyPasalWindow[parentName=pjbg] simplePasalPjbgSimpleAyatPanel simplePasalPjbgGridPanel'
        },
        {
            ref: 'copyPasalAyatGridPanel',
            selector: 'pjbgCopyPasalWindow[parentName=pjbg] simplePasalPjbgSimpleAyatPanel simpleAyatGridPanel'
        },

        //pasal pjbg
        {
            ref: 'pasalPjbgAyatPanel',
            selector: 'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel'
        },
        {
            ref: 'pasalPjbgGridPanel',
            selector: 'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel simplePasalPjbgGridPanel'
        },
        {
            ref: 'pasalPjbgWindow',
            selector: 'pasalPjbgRiwayatPasalWindow[parentName=pjbg]'
        },
        {
            ref: 'isuKeytermsWindowChooser',
            selector: 'isuKeytermsWindowChooser[parentName=pjbg]'
        },

        //ayat pjbg
        {
            ref: 'ayatGridPanel',
            selector: 'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel simpleAyatGridPanel'
        },
        {
            ref: 'ayatWindow',
            selector: 'ayatRiwayatAyatWindow[parentName=pjbg]'
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
            'pjbgPanel tabpanel pjbgGridPanel': {
                itemdblclick: this.pjbgGridItemdblclick,
                show: this.pjbgGridShow
            },
            'pjbgPanel tabpanel pjbgFormPanel hargaGasPjbgGridPanel': {
                itemdblclick: this.hargaGasPjbgGridItemdblclick
            },
            'pjbgPanel tabpanel pjbgFormPanel specGasPjbgGridPanel': {
            },
            'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel simplePasalPjbgGridPanel': {
                itemdblclick: this.pasalPjbgGridItemdblclick,
                selectionchange: this.pasalPjbgGridSelectionChange
            },
            'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel simpleAyatGridPanel': {
                itemdblclick: this.ayatPjbgGridItemdblclick
            }
        });
        if (this.allowWrite) {
            this.control({
                //segala hal yang berhubungan dengan tabel TrPjbg
                'pjbgPanel tabpanel pjbgGridPanel': {
                    selectionchange: this.pjbgGridSelectionChange
                },
                'pjbgPanel > tabpanel > toolbar button[action=new]': {
                    click: this.pjbgButtonNewClick
                },
                'pjbgPanel > tabpanel > toolbar button[action=save]': {
                    click: this.pjbgButtonSaveClick
                },
                'pjbgPanel tabpanel pjbgFormPanel form button[action=mouSearch]': {
                    click: this.pjbgButtonMouSearchClick
                },
                'mouWindowChooser[parentName=pjbg] mouGridPanel': {
                    itemdblclick: this.pjbgMouGridItemdblclick
                },
                'pjbgPanel > tabpanel > toolbar button[action=changestatus]': {
                    click: this.pjbgButtonChangestatusClick
                },
                'pjbgChangeStatusWindow[parentName=pjbg] button[action=save]': {
                    click: this.pjbgChangestatusButtonSaveClick
                },

                //harga gas
                'pjbgPanel tabpanel pjbgFormPanel hargaGasPjbgGridPanel': {
                    selectionchange: this.hargaGasPjbgGridSelectionChange
                },
                'pjbgPanel tabpanel pjbgFormPanel hargaGasPjbgGridPanel button[action=new]': {
                    click: this.hargaGasPjbgButtonNewClick
                },
                'pjbgPanel tabpanel pjbgFormPanel hargaGasPjbgGridPanel button[action=delete]': {
                    click: this.hargaGasPjbgButtonDeleteClick
                },
                'hargaGasPjbgWindow[parentName=pjbg] button[action=save]': {
                    click: this.hargaGasPjbgWindowButtonSaveClick
                },

                //spec gas
                'pjbgPanel tabpanel pjbgFormPanel specGasPjbgGridPanel': {
                    selectionchange: this.specGasPjbgGridSelectionChange,
                    edit: this.specGasPjbgGridEdit
                },
                'pjbgPanel tabpanel pjbgFormPanel specGasPjbgGridPanel button[action=new]': {
                    click: this.specGasPjbgButtonNewClick
                },
                'pjbgPanel tabpanel pjbgFormPanel specGasPjbgGridPanel button[action=delete]': {
                    click: this.specGasPjbgButtonDeleteClick
                },
                'specGasPjbgWindow[parentName=pjbg] button[action=save]': {
                    click: this.specGasPjbgWindowButtonSaveClick
                },

                //salin pasal
                'pjbgPanel > tabpanel > toolbar button[action=salin]': {
                    click: this.pjbgButtonSalinPasalClick
                },
                'pjbgCopyPasalWindow[parentName=pjbg] button[action=salin]': {
                    click: this.pjbgCopyPasalButtonSalinClick
                },
                'pjbgCopyPasalWindow[parentName=pjbg] pjbgGridPanel': {
                    itemdblclick: this.pjbgGridCopyPasalItemdblclick,
                    show: this.pjbgGridCopyPasalShow
                },

                //pasal
                'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel simplePasalPjbgGridPanel': {
                },
                'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel simplePasalPjbgGridPanel button[action=new]': {
                    click: this.pasalPjbgButtonNewClick
                },
                'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel simplePasalPjbgGridPanel button[action=delete]': {
                    click: this.pasalPjbgButtonDeleteClick
                },
                'pasalPjbgRiwayatPasalWindow[parentName=pjbg] button[action=isuSearch]': {
                    click: this.pjbgButtonIsuSearchClick
                },
                'isuKeytermsWindowChooser[parentName=pjbg] simpleIsuKeytermsGridPanel': {
                    itemdblclick: this.pjbgIsuGridItemdblclick
                },
                'pasalPjbgRiwayatPasalWindow[parentName=pjbg] button[action=save]': {
                    click: this.pasalPjbgWindowButtonSaveClick
                },

                //ayat
                'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel simpleAyatGridPanel': {
                    selectionchange: this.ayatPjbgGridSelectionChange
                },
                'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel simpleAyatGridPanel button[action=new]': {
                    click: this.ayatPjbgButtonNewClick
                },
                'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel simpleAyatGridPanel button[action=delete]': {
                    click: this.ayatPjbgButtonDeleteClick
                },
                'ayatRiwayatAyatWindow[parentName=pjbg] button[action=save]': {
                    click: this.ayatPjbgWindowButtonSaveClick
                }
            });
        } else {
            this.control({
                'pjbgPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=changestatus]").setDisabled(true);
                    }
                },
                'pjbgPanel tabpanel pjbgFormPanel hargaGasPjbgGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'pjbgPanel tabpanel specGasPjbgGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel simplePasalPjbgGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'pjbgPanel tabpanel simplePasalPjbgSimpleAyatPanel simpleAyatGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                }
            });
        }
    },

    //---- SALIN PASAL -----------------------------------

    pjbgButtonSalinPasalClick: function () {
        Ext.widget('pjbgCopyPasalWindow', {parentName: 'pjbg'});
        this.reloadCopyPasalPjbgGrid(this.data.trMou.trPotensiGas.tmPemasok.id);
    },

    pjbgGridCopyPasalItemdblclick: function (grid, record) {
        this.activatedTabPasalAyatCopyPasal();
    },

    pjbgCopyPasalButtonSalinClick: function () {
        var me = this;
        var records = this.getCopyPasalPjbgGridPanel().getSelectionModel().getSelection();
        if (records[0]) {
            Ext.Ajax.request({
                url: Ifuel.config.pasalPjbgUrl + "copy/pjbg/from/" + records[0].data.id + "/to/" + me.data.id,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getPasalPjbgGridPanel().getStore().reload();
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Salin Pasal PJBG');
                    me.getCopyPasalWindow().close();
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Salin Pasal PJBG');
                }
            });
        }
    },

    pjbgGridCopyPasalShow: function () {
        var pjbgGridPanel = this.getCopyPasalPjbgGridPanel();

        var pjbgPasalAyatPanel = this.getCopyPasalPasalPjbgAyatPanel();
        pjbgPasalAyatPanel.disable();
        this.getCopyPasalTab().setActiveTab(pjbgGridPanel);

        this.getCopyPasalWindow().down('button[action=salin]').disable();
    },

    activatedTabPasalAyatCopyPasal: function () {
        var pjbgGridPanel = this.getCopyPasalPjbgGridPanel();

        var records = pjbgGridPanel.getSelectionModel().getSelection();
        this.reloadCopyPasalPasalGrid(records[0] ? records[0].data.id : null);

        var pjbgPasalAyatPanel = this.getCopyPasalPasalPjbgAyatPanel();
        pjbgPasalAyatPanel.enable();
        this.getCopyPasalTab().setActiveTab(pjbgPasalAyatPanel);

        this.getCopyPasalWindow().down('button[action=salin]').enable();
    },

    reloadCopyPasalPjbgGrid: function (pemasokId) {
        var grid = this.getCopyPasalPjbgGridPanel();
        var store = grid.getStore();
        if (pemasokId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.pjbgUrl + 'byPemasok/' + pemasokId + '/byStatus/DISETUJUI',
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

    reloadCopyPasalPasalGrid: function (pjbgId) {
        var grid = this.getCopyPasalPasalPjbgGridPanel();
        var store = grid.getStore();
        if (pjbgId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.pasalPjbgUrl + '/simple/byPjbg/' + pjbgId,
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

    //---- FUNCTION AYAT PJBG ----------------------------------------------------------------------------

    ayatPjbgGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusPjbg(this.data);
        if ('DRAFT' == lastStatus && selected[0]) {
            this.toggleAyatPjbgDeleteButton(true);
        } else {
            this.toggleAyatPjbgDeleteButton(false);
        }
    },

    ayatPjbgButtonNewClick: function () {
        var pasalRecord = this.getPasalPjbgGridPanel().getSelectionModel().getSelection()[0];
        var formWindow = Ext.widget('ayatRiwayatAyatWindow', {parentName: 'pjbg', hiddenRiwayatAyat: true});
        formWindow.down("hiddenfield[name=pasalId]").setValue(pasalRecord.data.id);
        formWindow.down("numberfield[name=pasal]").setValue(pasalRecord.data.pasal);

        formWindow.down("button[action=save]").enable();
    },

    ayatPjbgButtonDeleteClick: function (button) {
        var record = this.getAyatGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.ayatUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getAyatGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Ayat PJBG');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Ayat PJBG');
                }
            });
        }
    },

    ayatPjbgWindowButtonSaveClick: function (button) {
        var me = this;
        var form = this.getAyatWindow().down('form');
        var values = form.form.getValues();

        var data = {
            id: values.id,
            ayat: values.ayat,
            tmPasal: {id: values.pasalId},
            textIndonesia: values.textIndonesia,
            textEnglish: values.textEnglish
        };

        if (form.getForm().isValid()) {
            Ext.Ajax.request({
                url: Ifuel.config.ayatUrl + "simple/toPasal/" + values.pasalId,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode(data),
                success: function (response, options) {
                    me.getAyatGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Ayat PJBG');
                    me.getAyatWindow().close();
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Ayat PJBG');
                }
            });
        }
    },

    ayatPjbgGridItemdblclick: function (o, record) {
        var formWindow = Ext.widget('ayatRiwayatAyatWindow', {parentName: 'pjbg', hiddenRiwayatAyat: false});
        formWindow.down("form").loadRecord(record);
        formWindow.down("hiddenfield[name=pasalId]").setValue(record.data.tmPasal.id);
        formWindow.down("numberfield[name=pasal]").setValue(record.data.tmPasal.pasal);
        formWindow.setUrl(Ifuel.config.riwayatAyatUrl + "byAyat/" + record.data.id + "?page.size=1&page.page=1&page.sort=createdAt&page.sort.dir=desc");

        var lastStatus = Ifuel.util.SystemUtil.getLastStatusPjbg(this.data);
        if (this.allowWrite && ("DRAFT" == lastStatus || "DRAFT_FINAL" == lastStatus)) {
            formWindow.down("button[action=save]").enable();
        }
    },

    toggleAyatPjbgDeleteButton: function (enable) {
        if (enable) {
            this.getAyatGridPanel().down('button[action=delete]').enable();
        } else {
            this.getAyatGridPanel().down('button[action=delete]').disable();
        }
    },

    //---- FUNCTION PASAL PJBG ----------------------------------------------------------------------------

    pjbgButtonIsuSearchClick: function () {
        var windowChooser = Ext.create('Ifuel.view.pengadaan.isuKeyterms.IsuKeytermsWindowChooser', {parentName: 'pjbg'});
        windowChooser.setUrl(Ifuel.config.isuKeytermsUrl + '/simple/byMou/' + this.data.trMou.id);
        windowChooser.show();
    },

    pjbgIsuGridItemdblclick: function (grid, record) {
        this.showValueIsu(record.data);
        this.getIsuKeytermsWindowChooser().close();
    },

    showValueIsu: function (isu) {
        var form = this.getPasalPjbgWindow().down('form');
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusPjbg(this.data);

        if (!Ext.isEmpty(isu)) {
            form.down('hiddenfield[name=isuKeytermsId]').setValue(isu.id);
            form.down('textfield[name=isu]').setValue(isu.isu);
        }

        form.down('button[action=isuSearch]').disable();
        if ('DRAFT' == lastStatus) {
            form.down('button[action=isuSearch]').enable();
        }
    },

    pasalPjbgGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusPjbg(this.data);
        this.togglePasalPjbgDeleteButton(false);
        if (this.allowWrite && selected[0]) {
            if ('DRAFT' == lastStatus) {
                this.togglePasalPjbgDeleteButton(true);
            }
        }
    },

    pasalPjbgButtonNewClick: function () {
        var formWindow = Ext.widget('pasalPjbgRiwayatPasalWindow', {parentName: 'pjbg', hiddenRiwayatPasal: true});
        formWindow.down("button[action=save]").enable();
    },

    pasalPjbgButtonDeleteClick: function (button) {
        var record = this.getPasalPjbgGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.pasalPjbgUrl + record.data.pasalPjbgId,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getPasalPjbgGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Pasal PJBG');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Pasal PJBG');
                }
            });
        }
    },

    pasalPjbgWindowButtonSaveClick: function (button) {
        var me = this;
        var form = this.getPasalPjbgWindow().down('form');

        var values = form.form.getValues();
        values.trPjbg = {id: this.data.id};
        values.trIsuKeyterms = {id: values.isuKeytermsId};

        delete values.isuKeytermsId;
        delete values.isu;

        if (form.getForm().isValid()) {
            Ext.Ajax.request({
                url: Ifuel.config.pasalPjbgUrl + "simple/",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode(values),
                success: function (response, options) {
                    me.getPasalPjbgGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pasal PJBG');
                    me.getPasalPjbgWindow().close();
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pasal PJBG');
                }
            });
        }
    },

    pasalPjbgGridItemdblclick: function (o, record) {
        var formWindow = Ext.widget('pasalPjbgRiwayatPasalWindow', {parentName: 'pjbg', hiddenRiwayatPasal: false});
        formWindow.down("form").loadRecord(record);
        formWindow.setUrl(Ifuel.config.riwayatPasalUrl + "byPasal/" + record.data.id + "?page.size=1&page.page=1&page.sort=createdAt&page.sort.dir=desc");

        var lastStatus = Ifuel.util.SystemUtil.getLastStatusPjbg(this.data);
        if (this.allowWrite && ("DRAFT" == lastStatus || "DRAFT_FINAL" == lastStatus)) {
            formWindow.down("button[action=save]").enable();
        }
        this.showValueIsu(record.data.trIsuKeyterms);
    },

    togglePasalPjbgDeleteButton: function (enable) {
        if (enable) {
            this.getPasalPjbgGridPanel().down('button[action=delete]').enable();
        } else {
            this.getPasalPjbgGridPanel().down('button[action=delete]').disable();
        }
    },

    // ---- Spec gas Pjbg ---------------------------------------------------------------------------------------------

    specGasPjbgGridEdit: function (editor, o) {
        var me = this;
        var values = o.record.data;
        values.createdAt = null;

        Ext.Ajax.request({
            url: Ifuel.config.specGasPjbgUrl + values.id,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode(values),
            success: function (response, options) {
                me.getSpecGasPjbgGridPanel().getStore().reload();
                
                if(me.getStatusPotensiGasGridPanel !== null) {
                    me.getStatusPotensiGasGridPanel().getStore().reload();
                }
                
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Spesifikasi Gas PJBG');
            },
            failure: function (response, options) {
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Spesifikasi Gas PJBG');
            }
        });
    },

    specGasPjbgGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusPjbg(this.data);
        if ('DRAFT' == lastStatus && selected[0]) {
            this.toggleSpecGasPjbgDeleteButton(true);
        } else {
            this.toggleSpecGasPjbgDeleteButton(false);
        }
    },

    specGasPjbgButtonDeleteClick: function (button) {
        var record = this.getSpecGasPjbgGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.specGasPjbgUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getSpecGasPjbgGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Spesifikasi Gas PJBG');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Spesifikasi Gas PJBG');
                }
            });
        }
    },

    specGasPjbgButtonNewClick: function () {
        Ext.widget('specGasPjbgWindow', {parentName: 'pjbg'});
    },

    specGasPjbgWindowButtonSaveClick: function (button) {
        var me = this;
        var form = this.getSpecGasPjbgWindow().down('form');

        var values = form.getForm().getValues();
        values.trPjbg = {id: this.data.id};

        if (form.getForm().isValid()) {
            if (values.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.specGasPjbgUrl + values.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(values),
                    success: function (response, options) {
                        me.getSpecGasPjbgGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Spesifikasi Gas PJBG');
                        me.getSpecGasPjbgWindow().close();
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Spesifikasi Gas PJBG');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.specGasPjbgUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(values),
                    success: function (response, options) {
                        me.getSpecGasPjbgGridPanel().getStore().reload();
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Spesifikasi Gas PJBG');
                        me.getSpecGasPjbgWindow().close();
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Spesifikasi Gas PJBG');
                    }
                });
            }
        }
    },

    toggleSpecGasPjbgDeleteButton: function (enable) {
        if (enable) {
            this.getSpecGasPjbgGridPanel().down('button[action=delete]').enable();
        } else {
            this.getSpecGasPjbgGridPanel().down('button[action=delete]').disable();
        }
    },

    // ---- Harga gas Pjbg ---------------------------------------------------------------------------------------------

    hargaGasPjbgGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusPjbg(this.data);
        if ('DRAFT' == lastStatus && selected[0]) {
            this.toggleHargaGasPjbgDeleteButton(true);
        } else {
            this.toggleHargaGasPjbgDeleteButton(false);
        }
    },

    hargaGasPjbgButtonDeleteClick: function (button) {
        var record = this.getHargaGasPjbgGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.hargaGasPjbgUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getHargaGasPjbgGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Harga Gas PJBG');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Harga Gas PJBG');
                }
            });
        }
    },

    hargaGasPjbgGridItemdblclick: function (o, record) {
        var formWindow = Ext.widget('hargaGasPjbgWindow', {
            parentName: 'pjbg'
        });
        formWindow.down("form").loadRecord(record);
    },

    hargaGasPjbgButtonNewClick: function () {
        Ext.widget('hargaGasPjbgWindow', {parentName: 'pjbg'});
    },

    hargaGasPjbgWindowButtonSaveClick: function (button) {
        var me = this;
        var form = this.getHargaGasPjbgWindow().down('form');

        var values = form.getForm().getValues();
        values.periodeAwal = Ext.isEmpty(values.periodeAwal) ? null : Ext.Date.format(Ext.Date.parse(values.periodeAwal, 'd F Y'), 'c'),
            values.periodeAkhir = Ext.isEmpty(values.periodeAkhir) ? null : Ext.Date.format(Ext.Date.parse(values.periodeAkhir, 'd F Y'), 'c'),
            values.trPjbg = {id: this.data.id};

        if (form.getForm().isValid()) {
            if (values.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.hargaGasPjbgUrl + values.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(values),
                    success: function (response, options) {
                        me.getHargaGasPjbgGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Harga Gas PJBG');
                        me.getHargaGasPjbgWindow().close();
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Harga Gas PJBG');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.hargaGasPjbgUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(values),
                    success: function (response, options) {
                        me.getHargaGasPjbgGridPanel().getStore().reload();
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Harga Gas PJBG');
                        me.getHargaGasPjbgWindow().close();
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Harga Gas PJBG');
                    }
                });
            }
        }
    },

    toggleHargaGasPjbgDeleteButton: function (enable) {
        if (enable) {
            this.getHargaGasPjbgGridPanel().down('button[action=delete]').enable();
        } else {
            this.getHargaGasPjbgGridPanel().down('button[action=delete]').disable();
        }
    },

    // ---- Pjbg -------------------------------------------------------------------------------------------------------

    pjbgGridShow: function () {
        var pjbgGridPanel = this.getPjbgGridPanel();
        this.getPjbgFormPanel().disable();
        this.getPasalPjbgAyatPanel().disable();
        this.getPjbgTabPanel().setActiveTab(pjbgGridPanel);
        this.getSpecGasPjbgGridPanel().disable();

        var records = pjbgGridPanel.getSelectionModel().getSelection();
        if (!Ext.isEmpty(records[0])) {
            this.setData(records[0].data);
        } else {
            this.setData(null);
        }
    },

    pjbgGridSelectionChange: function (sel, selected) {
        if (!this.getPjbgGridPanel().isHidden()) {
            if (selected[0]) {
                this.setData(selected[0].data);
            } else {
                this.setData(null);
            }
        }
    },

    pjbgButtonNewClick: function () {
        this.activatedTabForm();  //jangan dibalik
        this.setData(null);
    },

    pjbgGridItemdblclick: function (grid, record) {
        this.activatedTabForm(); //jangan dibalik
        this.setData(record.data);
    },

    pjbgButtonMouSearchClick: function () {
        var mouWindowChooser = Ext.create('Ifuel.view.pengadaan.mou.MouWindowChooser', {parentName: 'pjbg'});
        mouWindowChooser.setUrl(Ifuel.config.mouUrl + '/NotHasPjbg/byStatus/DISETUJUI');
        mouWindowChooser.show();
    },

    pjbgMouGridItemdblclick: function (grid, record) {
        this.showValueMou(record.data);
        this.getMouWindowChooser().close();
    },

    pjbgButtonSaveClick: function () {
        var me = this;
        var form = this.getPjbgFormPanelForm();
        var values = form.getValues();

        var pjbg = {
            id: !Ext.isEmpty(values.id) ? values.id : null,
            nomor: values.nomor,
            judul: values.judul,
            tanggalPersetujuan: Ext.isEmpty(values.tanggalPersetujuan) ? null : Ext.Date.format(Ext.Date.parse(values.tanggalPersetujuan, 'd F Y'), 'c'),
            tanggalMulai: Ext.isEmpty(values.tanggalMulai) ? null : Ext.Date.format(Ext.Date.parse(values.tanggalMulai, 'd F Y'), 'c'),
            tanggalBerakhir: Ext.isEmpty(values.tanggalBerakhir) ? null : Ext.Date.format(Ext.Date.parse(values.tanggalBerakhir, 'd F Y'), 'c'),
            jenisGas: values.jenisGas,
            jenisKontrakPjbg: values.jenisKontrakPjbg,
            volumeTotal: values.volumeTotal,
            volumeSisa: values.volumeSisa,
            trMou: {
                id: values.mouId
            }
        };

        if (form.getForm().isValid()) {
            if (pjbg.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.pjbgUrl + pjbg.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(pjbg),
                    success: function (response, options) {
                        me.getPjbgGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        me.reshowValuePjbg(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'PJBG');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'PJBG');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.pjbgUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(pjbg),
                    success: function (response, options) {
                        me.getPjbgGridPanel().getStore().reload();
                        me.reshowValuePjbg(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'PJBG');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'PJBG');
                    }
                });
            }
        }
    },

    pjbgButtonChangestatusClick: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusPjbg(this.data);
        var window = Ext.widget('pjbgChangeStatusWindow', {
            parentName: 'pjbg',
            typeComboList: lastStatus == 'DRAFT' ? 0 : (lastStatus == 'DRAFT_DISETUJUI' ? 1 : null)
        });
    },

    pjbgChangestatusButtonSaveClick: function () {
        var me = this;
        var form = this.getPjbgChangeStatusWindow().down("form");
        var values = form.getValues();

        if (form.getForm().isValid()) {

            /**
             * Jika status adalah DISETUJUI harus menyertakan nilai persetujuan pada body.
             */

            var valuesPersetujuanPjbg = null;
            var isRequest = true; // status apapun akan melakukan request, kecuali untuk DISETUJUI harus diisi form->persetujuan
            if ('DISETUJUI' == values.status) { //jika status adalah disetujui, ambil nilai form->persetujuan
                if (form.getForm().isValid()) {
                    valuesPersetujuanPjbg = {
                        tanggalPersetujuan: Ext.isEmpty(values.tanggalPersetujuan) ? null : Ext.Date.format(Ext.Date.parse(values.tanggalPersetujuan, 'd F Y'), 'c')
                    };
                } else {
                    isRequest = false;
                }
            }
            if (isRequest) { //jika bisa melakukan request
                Ext.Ajax.request({
                    url: Ifuel.config.pjbgUrl + me.data.id + "/changeStatus/" + values.status,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 120000,
                    params: Ext.JSON.encode(valuesPersetujuanPjbg),
                    success: function (response, options) {
                        me.reshowValuePjbg(Ifuel.config.pjbgUrl + me.data.id); //bagian ini jangan terbalik
                        me.getPjbgGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Pjbg of Agreement');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Pjbg of Agreement');
                    }
                });
                this.getPjbgChangeStatusWindow().close();
            }
        }
    },

    reshowValuePjbg: function (url) {
        var me = this;
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response, options) {
                var responseData = Ext.JSON.decode(response.responseText);
                responseData.tanggalPersetujuan = Ext.isEmpty(responseData.tanggalPersetujuan) ? null : new Date(responseData.tanggalPersetujuan);
                responseData.tanggalMulai = Ext.isEmpty(responseData.tanggalMulai) ? null : new Date(responseData.tanggalMulai);
                responseData.tanggalBerakhir = Ext.isEmpty(responseData.tanggalBerakhir) ? null : new Date(responseData.tanggalBerakhir);
                me.setData(responseData);
            },
            failure: function (response, options) {
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'PJBG');
            }
        });
    },

    /**
     * memberikan nilai pada data untuk controller ini yang sedang aktif.
     * dipanggil ketika grid pjbg di click/dblclick, sukses update data(reshowValuePjbg(url)),
     * dan ketika tombol new pjbg ditekan(membuat pjbg baru -- data adalah null).
     * @param newData
     */
    setData: function (newData) {
        this.data = newData;

        this.buttonDataChange();

        if (this.getPjbgGridPanel().isHidden()) {
            this.formDataChange();
            if (!Ext.isEmpty(this.data)) {//jika grid click/dblclick atau update data(reshowValuePjbg(url))
                this.showValuePjbg();
            } else {//jika data kosong atau buat data baru (tombol new pjbg ditekan)
                this.clearValuePjbg();
            }
        }
    },

    buttonDataChange: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusPjbg(this.data);
        var pjbgTabPanel = this.getPjbgTabPanel();
        var pjbgGridPanel = this.getPjbgGridPanel();
        var hargaGasPjbg = this.getHargaGasPjbgGridPanel();
        var specGasPjbg = this.getSpecGasPjbgGridPanel();
        var pasalGridPanel = this.getPasalPjbgGridPanel();
        var ayatGridPanel = this.getAyatGridPanel();

        pjbgTabPanel.down('button[action=changestatus]').disable();
        pjbgTabPanel.down('button[action=save]').disable();
        pjbgTabPanel.down("toolbar").down("button[action=salin]").disable();
        hargaGasPjbg.down('button[action=new]').disable();
        specGasPjbg.down('button[action=new]').disable();
        pasalGridPanel.down("button[action=new]").disable();
        ayatGridPanel.down("button[action=new]").disable();

        if (this.allowWrite) {
            if (Ext.isEmpty(this.data)) {//jika buat data baru
                if (pjbgGridPanel.isHidden()) {
                    pjbgTabPanel.down('button[action=save]').enable();
                }
            }

            if ('DRAFT' == lastStatus || 'DRAFT_FINAL' == lastStatus || 'DRAFT_DISETUJUI' == lastStatus) {
                pjbgTabPanel.down('button[action=changestatus]').enable();
                hargaGasPjbg.down('button[action=new]').enable();
                specGasPjbg.down('button[action=new]').enable();
                pasalGridPanel.down("button[action=new]").enable();
                ayatGridPanel.down("button[action=new]").enable();

                if ('DRAFT' == lastStatus) {
                    pjbgTabPanel.down("toolbar").down("button[action=salin]").enable();
                }

                if (pjbgGridPanel.isHidden()) {//jika update data pas status DRAFT / DRAFT_FINAL
                    pjbgTabPanel.down('button[action=save]').enable();
                }
            }
        }
    },

    formDataChange: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusPjbg(this.data);
        var form = this.getPjbgFormPanelForm();

        form.down('textfield[name=nomor]').setReadOnly(true);
        form.down('textfield[name=judul]').setReadOnly(true);
        form.down('combobox[name=jenisKontrakPjbg]').setReadOnly(true);
        form.down('combobox[name=jenisGas]').setReadOnly(true);
        form.down('datefield[name=tanggalMulai]').setReadOnly(true);
        form.down('datefield[name=tanggalBerakhir]').setReadOnly(true);
        form.down('numberfield[name=volumeTotal]').setReadOnly(true);
        form.down('numberfield[name=volumeSisa]').setReadOnly(true);

        if (this.allowWrite) {
            if (Ext.isEmpty(lastStatus) || 'DRAFT' == lastStatus) {
                form.down('textfield[name=nomor]').setReadOnly(false);
                form.down('textfield[name=judul]').setReadOnly(false);
                form.down('combobox[name=jenisKontrakPjbg]').setReadOnly(false);
                form.down('combobox[name=jenisGas]').setReadOnly(false);
                form.down('datefield[name=tanggalMulai]').setReadOnly(false);
                form.down('datefield[name=tanggalBerakhir]').setReadOnly(false);
                form.down('numberfield[name=volumeTotal]').setReadOnly(false);
                form.down('numberfield[name=volumeSisa]').setReadOnly(false);
            }
        }
    },

    clearValuePjbg: function () {
        var form = this.getPjbgFormPanelForm();

        form.getForm().reset();
        form.down('button[action=mouSearch]').enable();

        this.reloadGrid(null);
    },

    showValuePjbg: function () {
        var form = this.getPjbgFormPanelForm();
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusPjbg(this.data);

        form.loadRecord(new Ifuel.model.pengadaan.TrPjbg(this.data));

        this.showValueMou(this.data.trMou);
        this.reloadGrid(this.data.id);

        form.down('textfield[name=status]').setValue(lastStatus);
    },

    showValueMou: function (mou) {
        var form = this.getPjbgFormPanelForm();
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusPjbg(this.data);
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

    reloadGrid: function (pjbgId) {
        this.reloadSpecGasPjbgGrid(pjbgId);
        this.reloadHargaGasPjbgGrid(pjbgId);
        this.reloadPasalPjbgGrid(pjbgId);
    },

    reloadSpecGasPjbgGrid: function (pjbgId) {
        var grid = this.getSpecGasPjbgGridPanel();
        var store = grid.getStore();
        if (pjbgId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.specGasPjbgUrl + 'byPjbg/' + pjbgId,
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

    reloadHargaGasPjbgGrid: function (pjbgId) {
        var grid = this.getHargaGasPjbgGridPanel();
        var store = grid.getStore();
        if (pjbgId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.hargaGasPjbgUrl + 'byPjbg/' + pjbgId,
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

    reloadPasalPjbgGrid: function (pjbgId) {
        var grid = this.getPasalPjbgGridPanel();
        var store = grid.getStore();
        if (pjbgId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.pasalPjbgUrl + 'simple/byPjbg/' + pjbgId,
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
        var pjbgFormPanel = this.getPjbgFormPanel();
        pjbgFormPanel.enable();
        this.getSpecGasPjbgGridPanel().enable();
        this.getPasalPjbgAyatPanel().enable();
        this.getPjbgTabPanel().setActiveTab(pjbgFormPanel);
    }
});


