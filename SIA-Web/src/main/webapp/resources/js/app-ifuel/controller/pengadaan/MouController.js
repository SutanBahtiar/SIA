Ext.define('Ifuel.controller.pengadaan.MouController', {
    extend: 'Ext.app.Controller',
//        allowWrite:Ifuel.util.SecurityHelper.isWriteAllowed("ANAK_PERUSAHAAN_WRITE"),
    allowWrite: true,
//    allowWrite: false,


    views: [
        "pengadaan.mou.MouPanel",
        "pengadaan.mou.MouChangeStatusWindow",
        "pengadaan.mou.MouCopyPasalWindow",
        "master.document.DocumentWindow"
    ],
    models: [],
    stores: [],

    /**
     * Field ini adalah data mou yang dipilih untuk ditampilkan di form.
     * Jika ada data pada grid panel di-double click, data tersebut di-assign ke field ini.
     * Jika setelah save data baru/update/change status, data yang disave akan diambil dari server dan di-assign ke field ini.
     * Field ini akan di-assign null jika: menekan tombol new.
     */
    data: null,

    refs: [
        //selector untuk bagian TrMou
        {
            ref: 'mouTabPanel',
            selector: 'mouPanel tabpanel'
        },
        {
            ref: 'mouGridPanel',
            selector: 'mouPanel tabpanel mouGridPanel'
        },
        {
            ref: 'mouFormPanel',
            selector: 'mouPanel tabpanel mouFormPanel'
        },
        {
            ref: 'mouFormPanelForm',
            selector: 'mouPanel tabpanel mouFormPanel form'
        },
        {
            ref: 'mouFormPanelFormCombobox',
            selector: 'mouPanel tabpanel mouFormPanel form combobox[name=bahasa]'
        },
        {
            ref: 'mouIdHiddenField',
            selector: 'mouPanel tabpanel mouFormPanel form hiddenfield[name=id]'
        },
        {
            ref: 'potensiGasWindowChooser',
            selector: 'potensiGasWindowChooser[parentName=mou]'
        },
        {
            ref: 'mouChangeStatusWindow',
            selector: 'mouChangeStatusWindow[parentName=mou]'
        },

        //Document
        {
            ref: 'documentGridPanel',
            selector: 'mouPanel tabpanel mouFormPanel documentGridPanel'
        },
        {
            ref: 'documentWindow',
            selector: 'documentWindow[parentName=mou]'
        },

        //salin pasal
        {
            ref: 'copyPasalWindow',
            selector: 'mouCopyPasalWindow[parentName=mou]'
        },
        {
            ref: 'copyPasalTab',
            selector: 'mouCopyPasalWindow[parentName=mou] tabpanel'
        },
        {
            ref: 'copyPasalMouGridPanel',
            selector: 'mouCopyPasalWindow[parentName=mou] mouGridPanel'
        },
        {
            ref: 'copyPasalPasalAyatPanel',
            selector: 'mouCopyPasalWindow[parentName=mou] simplePasalSimpleAyatPanel'
        },
        {
            ref: 'copyPasalPasalGridPanel',
            selector: 'mouCopyPasalWindow[parentName=mou] simplePasalSimpleAyatPanel simplePasalGridPanel'
        },
        {
            ref: 'copyPasalAyatGridPanel',
            selector: 'mouCopyPasalWindow[parentName=mou] simplePasalSimpleAyatPanel simpleAyatGridPanel'
        },

        //PASAL
        {
            ref: 'mouPasalAyatPanel',
            selector: 'mouPanel tabpanel simplePasalSimpleAyatPanel '
        },
        {
            ref: 'pasalGridPanel',
            selector: 'mouPanel tabpanel simplePasalSimpleAyatPanel simplePasalGridPanel'
        },
        {
            ref: 'pasalWindow',
            selector: 'pasalRiwayatPasalWindow[parentName=mou]'
        },

        //AYAT
        {
            ref: 'ayatGridPanel',
            selector: 'mouPanel tabpanel simplePasalSimpleAyatPanel simpleAyatGridPanel'
        },
        {
            ref: 'ayatWindow',
            selector: 'ayatRiwayatAyatWindow[parentName=mou]'
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
            'mouPanel tabpanel mouGridPanel': {
                itemdblclick: this.mouGridItemdblclick,
                show: this.mouGridShow
            },
            'mouPanel tabpanel mouFormPanel documentGridPanel': {
                itemdblclick: this.documentMouGridItemdblclick
            },
            'mouPanel tabpanel simplePasalSimpleAyatPanel simplePasalGridPanel': {
                itemdblclick: this.pasalMouGridItemdblclick,
                selectionchange: this.pasalMouGridSelectionChange
            },
            'mouPanel tabpanel simplePasalSimpleAyatPanel simpleAyatGridPanel': {
                itemdblclick: this.ayatMouGridItemdblclick
            }
        });
        if (this.allowWrite) {
            this.control({
                //segala hal yang berhubungan dengan tabel TrMou
                'mouPanel tabpanel mouGridPanel': {
                    selectionchange: this.mouGridSelectionChange
                },
                'mouPanel > tabpanel > toolbar button[action=new]': {
                    click: this.mouButtonNewClick
                },
                'mouPanel > tabpanel > toolbar button[action=save]': {
                    click: this.mouButtonSaveClick
                },
                'mouPanel > tabpanel > toolbar button[action=changestatus]': {
                    click: this.mouButtonChangestatusClick
                },
                'mouPanel tabpanel mouFormPanel form fieldcontainer[groupField=potensiGas] button[action=potensiGasSearch]': {
                    click: this.mouButtonPotensigasSearchClick
                },
                'mouPanel tabpanel mouFormPanel form combobox[name=bahasa]': {
                    change: this.onChangeBahasa
                },
                'potensiGasWindowChooser[parentName=mou] potensiGasGridPanel': {
                    itemdblclick: this.mouPotensiGasGridItemdblclick
                },
                'mouChangeStatusWindow[parentName=mou] button[action=save]': {
                    click: this.mouChangestatusButtonSaveClick
                },

                //document
                'mouPanel tabpanel mouFormPanel documentGridPanel': {
                    selectionchange: this.documentMouGridSelectionChange
                },
                'mouPanel tabpanel mouFormPanel documentGridPanel button[action=new]': {
                    click: this.documentMouButtonNewClick
                },
                'mouPanel tabpanel mouFormPanel documentGridPanel button[action=delete]': {
                    click: this.documentMouButtonDeleteClick
                },
                'documentWindow[parentName=mou] button[action=save]': {
                    click: this.documentMouWindowButtonSaveClick
                },

                //salin pasal
                'mouPanel > tabpanel > toolbar button[action=salin]': {
                    click: this.mouButtonSalinPasalClick
                },
                'mouCopyPasalWindow[parentName=mou] button[action=salin]': {
                    click: this.mouCopyPasalButtonSalinClick
                },
                'mouCopyPasalWindow[parentName=mou] mouGridPanel': {
                    itemdblclick: this.mouGridCopyPasalItemdblclick,
                    show: this.mouGridCopyPasalShow
                },

                //pasal
                'mouPanel tabpanel simplePasalSimpleAyatPanel simplePasalGridPanel': {
                },
                'mouPanel tabpanel simplePasalSimpleAyatPanel simplePasalGridPanel button[action=new]': {
                    click: this.pasalMouButtonNewClick
                },
                'mouPanel tabpanel simplePasalSimpleAyatPanel simplePasalGridPanel button[action=delete]': {
                    click: this.pasalMouButtonDeleteClick
                },
                'pasalRiwayatPasalWindow[parentName=mou] button[action=save]': {
                    click: this.pasalMouWindowButtonSaveClick
                },

                //ayat
                'mouPanel tabpanel simplePasalSimpleAyatPanel simpleAyatGridPanel': {
                    selectionchange: this.ayatMouGridSelectionChange
                },
                'mouPanel tabpanel simplePasalSimpleAyatPanel simpleAyatGridPanel button[action=new]': {
                    click: this.ayatMouButtonNewClick
                },
                'mouPanel tabpanel simplePasalSimpleAyatPanel simpleAyatGridPanel button[action=delete]': {
                    click: this.ayatMouButtonDeleteClick
                },
                'ayatRiwayatAyatWindow[parentName=mou] button[action=save]': {
                    click: this.ayatMouWindowButtonSaveClick
                }
            });
        } else {
            this.control({
                'mouPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=changestatus]").setDisabled(true);
                    }
                },
                'mouPanel tabpanel simplePasalSimpleAyatPanel simplePasalGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'mouPanel tabpanel simplePasalSimpleAyatPanel simpleAyatGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                }
            });
        }
    },

    //---- SALIN PASAL -----------------------------------

    mouButtonSalinPasalClick: function () {
        Ext.widget('mouCopyPasalWindow', {parentName: 'mou'});
        this.reloadCopyPasalMouGrid(this.data.trPotensiGas.tmPemasok.id);
    },

    mouGridCopyPasalItemdblclick: function (grid, record) {
        this.activatedTabPasalAyatCopyPasal();
    },

    mouCopyPasalButtonSalinClick: function () {
        var me = this;
        var records = this.getCopyPasalMouGridPanel().getSelectionModel().getSelection();
        if (records[0]) {
            Ext.Ajax.request({
                url: Ifuel.config.pasalUrl + "copy/mou/from/" + records[0].data.id + "/to/" + me.data.id,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getPasalGridPanel().getStore().reload();
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Salin Pasal Memorandum of Understanding');
                    me.getCopyPasalWindow().close();
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Salin Pasal Memorandum of Understanding');
                }
            });
        }
    },

    mouGridCopyPasalShow: function () {
        var mouGridPanel = this.getCopyPasalMouGridPanel();

        var mouPasalAyatPanel = this.getCopyPasalPasalAyatPanel();
        mouPasalAyatPanel.disable();
        this.getCopyPasalTab().setActiveTab(mouGridPanel);

        this.getCopyPasalWindow().down('button[action=salin]').disable();
    },

    activatedTabPasalAyatCopyPasal: function () {
        var mouGridPanel = this.getCopyPasalMouGridPanel();

        var records = mouGridPanel.getSelectionModel().getSelection();
        this.reloadCopyPasalPasalGrid(records[0] ? records[0].data.id : null, records[0].data.bahasa);

        var mouPasalAyatPanel = this.getCopyPasalPasalAyatPanel();
        mouPasalAyatPanel.enable();
        this.getCopyPasalTab().setActiveTab(mouPasalAyatPanel);

        this.getCopyPasalWindow().down('button[action=salin]').enable();
    },

    reloadCopyPasalMouGrid: function (pemasokId) {
        var grid = this.getCopyPasalMouGridPanel();
        var store = grid.getStore();
        if (pemasokId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.mouUrl + 'byPemasok/' + pemasokId + '/byStatus/DISETUJUI',
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

    reloadCopyPasalPasalGrid: function (mouId, bahasa) {
        var grid = this.getCopyPasalPasalGridPanel();
        var store = grid.getStore();
        if (mouId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.pasalUrl + '/simple/byMou/' + mouId,
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
        
        var gridAyat = this.getCopyPasalAyatGridPanel();

        if(bahasa==="INDONESIA") {
            grid.columns[2].setVisible(false);
            grid.columns[4].setVisible(false);
            
            gridAyat.columns[2].setVisible(false);
        } else {
            grid.columns[2].setVisible(true);
            grid.columns[4].setVisible(true);
            
            gridAyat.columns[2].setVisible(true);
        }
        
    },

    //---- FUNCTION AYAT MOU ----------------------------------------------------------------------------

    ayatMouGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusMou(this.data);
        if ('DRAFT' == lastStatus && selected[0]) {
            this.toggleAyatMouDeleteButton(true);
        } else {
            this.toggleAyatMouDeleteButton(false);
        }
    },

    ayatMouButtonNewClick: function () {
        var pasalRecord = this.getPasalGridPanel().getSelectionModel().getSelection()[0];
        var formWindow = Ext.widget('ayatRiwayatAyatWindow', {parentName: 'mou', hiddenRiwayatAyat: true});
        formWindow.down("hiddenfield[name=pasalId]").setValue(pasalRecord.data.id);
        formWindow.down("numberfield[name=pasal]").setValue(pasalRecord.data.pasal);

        formWindow.down("button[action=save]").enable();
    },

    ayatMouButtonDeleteClick: function (button) {
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
                    
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Ayat Memorandum of Understanding');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Ayat Memorandum of Understanding');
                }
            });
        }
    },

    ayatMouWindowButtonSaveClick: function (button) {
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
                    
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Ayat Memorandum of Understanding');
                    me.getAyatWindow().close();
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Ayat Memorandum of Understanding');
                }
            });
        }
    },

    ayatMouGridItemdblclick: function (o, record) {
        var formWindow = Ext.widget('ayatRiwayatAyatWindow', {parentName: 'mou', hiddenRiwayatAyat: false});
        formWindow.down("form").loadRecord(record);
        formWindow.down("hiddenfield[name=pasalId]").setValue(record.data.tmPasal.id);
        formWindow.down("numberfield[name=pasal]").setValue(record.data.tmPasal.pasal);
        formWindow.setUrl(Ifuel.config.riwayatAyatUrl + "byAyat/" + record.data.id + "?page.size=1&page.page=1&page.sort=createdAt&page.sort.dir=desc");

        var lastStatus = Ifuel.util.SystemUtil.getLastStatusMou(this.data);
        if (this.allowWrite && ("DRAFT" == lastStatus || "DRAFT_FINAL" == lastStatus)) {
            formWindow.down("button[action=save]").enable();
        }
        
        var form = this.getMouFormPanelForm();
        var bahasa = form.down('combobox[name=bahasa]').getValue();
	var gridRiwayatAyat = formWindow.down("riwayatAyatGridPanel");
		
        if(bahasa==="INDONESIA") {
            formWindow.down('textarea[name=textEnglish]').hide();
			
            gridRiwayatAyat.columns[2].setVisible(false);
        } else {
            formWindow.down('textarea[name=textEnglish]').show();
			
            gridRiwayatAyat.columns[2].setVisible(true);
        }
    },

    toggleAyatMouDeleteButton: function (enable) {
        if (enable) {
            this.getAyatGridPanel().down('button[action=delete]').enable();
        } else {
            this.getAyatGridPanel().down('button[action=delete]').disable();
        }
    },

    //---- FUNCTION PASAL MOU ----------------------------------------------------------------------------

    pasalMouGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusMou(this.data);
        this.togglePasalMouDeleteButton(false);
        if (this.allowWrite && selected[0]) {
            if ('DRAFT' == lastStatus) {
                this.togglePasalMouDeleteButton(true);
            }
        }
    },

    pasalMouButtonNewClick: function () {
        var formWindow = Ext.widget('pasalRiwayatPasalWindow', {parentName: 'mou', hiddenRiwayatPasal: true});
        formWindow.down("button[action=save]").enable();
    },

    pasalMouButtonDeleteClick: function (button) {
        var record = this.getPasalGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.pasalUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getPasalGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Pasal Memorandum of Understanding');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Pasal Memorandum of Understanding');
                }
            });
        }
    },

    pasalMouWindowButtonSaveClick: function (button) {
        var me = this;
        var form = this.getPasalWindow().down('form');

        var values = form.form.getValues();
        if (form.getForm().isValid()) {
            Ext.Ajax.request({
                url: Ifuel.config.pasalUrl + "simple/toMou/" + me.data.id,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode(values),
                success: function (response, options) {
                    me.getPasalGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pasal Memorandum of Understanding');
                    me.getPasalWindow().close();
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pasal Memorandum of Understanding');
                }
            });
        }
    },

    pasalMouGridItemdblclick: function (o, record) {
        var formWindow = Ext.widget('pasalRiwayatPasalWindow', {parentName: 'mou', hiddenRiwayatPasal: false});
        formWindow.down("form").loadRecord(record);
        formWindow.setUrl(Ifuel.config.riwayatPasalUrl + "byPasal/" + record.data.id + "?page.size=1&page.page=1&page.sort=createdAt&page.sort.dir=desc");

        var lastStatus = Ifuel.util.SystemUtil.getLastStatusMou(this.data);
        if (this.allowWrite && ("DRAFT" == lastStatus || "DRAFT_FINAL" == lastStatus)) {
            formWindow.down("button[action=save]").enable();
        }
        
        var form = this.getMouFormPanelForm();
        var bahasa = form.down('combobox[name=bahasa]').getValue();
        var gridRiwayatPasal = formWindow.down("riwayatPasalGridPanel");
        
        if(bahasa==="INDONESIA") {
            formWindow.down('textarea[name=judulEnglish]').hide();
            formWindow.down('textarea[name=textEnglish]').hide();
            
            gridRiwayatPasal.columns[2].setVisible(false);
        } else {
            formWindow.down('textarea[name=judulEnglish]').show();
            formWindow.down('textarea[name=textEnglish]').show();
            
            gridRiwayatPasal.columns[2].setVisible(true);
        }
    },

    togglePasalMouDeleteButton: function (enable) {
        if (enable) {
            this.getPasalGridPanel().down('button[action=delete]').enable();
        } else {
            this.getPasalGridPanel().down('button[action=delete]').disable();
        }
    },

    //---- FUNCTION DOCUMENT MOU -------------------------------------------------------------------------

    documentMouGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusMou(this.data);
        if ('DRAFT' == lastStatus && selected[0]) {
            this.toggleDocumentMouDeleteButton(true);
        } else {
            this.toggleDocumentMouDeleteButton(false);
        }
    },

    documentMouButtonNewClick: function () {
        Ext.widget('documentWindow', {parentName: 'mou'});
        this.getDocumentWindow().down('hiddenfield[name=parentId]').setValue(this.data.id);
    },

    documentMouButtonDeleteClick: function (button) {
        var record = this.getDocumentGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.documentUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getDocumentGridPanel().getStore().reload();
                    
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Document Memorandum of Understanding');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Document Memorandum of Understanding');
                }
            });
        }
    },

    documentMouWindowButtonSaveClick: function (button) {
        var me = this;
        var form = this.getDocumentWindow().down('form');

        if (form.getForm().isValid()) {
            form.submit({
                url: Ifuel.config.documentUrl + 'upload/toMou/' + me.data.id,
                waitMsg: 'Uploading your document...',
                success: function (form, action) {
                    me.getDocumentGridPanel().getStore().reload();
                    Ext.Msg.alert('Success', 'Document telah uploaded.');
                    me.getDocumentWindow().close();
                },
                failure: function (form, action) {
                    Ext.Msg.alert('Failed', action.result.msg);
                    me.getDocumentWindow().close();
                }
            })
        }
    },

    documentMouGridItemdblclick: function (o, record) {
        window.open(Ifuel.config.documentUrl + 'download/' + record.data.id);
    },

    toggleDocumentMouDeleteButton: function (enable) {
        if (enable) {
            this.getDocumentGridPanel().down('button[action=delete]').enable();
        } else {
            this.getDocumentGridPanel().down('button[action=delete]').disable();
        }
    },

    // ---- MoU ----------------------------------------------------------------------------------------

    mouGridShow: function () {
        var mouGridPanel = this.getMouGridPanel();
        this.getMouFormPanel().disable();
        this.getMouPasalAyatPanel().disable();
        this.getMouTabPanel().setActiveTab(mouGridPanel);
        this.getMouTabPanel().down("toolbar").down("button[action=salin]").disable();

        var records = mouGridPanel.getSelectionModel().getSelection();
        if (!Ext.isEmpty(records[0])) {
            this.setData(records[0].data);
        } else {
            this.setData(null);
        }
    },

    mouGridSelectionChange: function (sel, selected) {
        if (!this.getMouGridPanel().isHidden()) {
            if (selected[0]) {
                this.setData(selected[0].data);
            } else {
                this.setData(null);
            }
        }
    },

    mouButtonNewClick: function () {
        this.activatedTabForm();  //jangan dibalik
        this.setData(null);
    },

    mouGridItemdblclick: function (grid, record) {
        this.activatedTabForm(); //jangan dibalik
        this.setData(record.data);
    },

    mouButtonPotensigasSearchClick: function () {
        var potensiGasWindowChooser = Ext.widget('potensiGasWindowChooser', {parentName: 'mou'});
        potensiGasWindowChooser.setUrl(Ifuel.config.potensiGasUrl + '/MOU');
        potensiGasWindowChooser.show();
    },

    mouPotensiGasGridItemdblclick: function (grid, record) {
        this.showValuePotensiGas(record.data);
        this.getPotensiGasWindowChooser().close();
    },

    mouButtonSaveClick: function () {
        var me = this;
        var form = this.getMouFormPanelForm();
        var values = form.getValues();

        var bahasa = values.bahasa.replace("-", "_");
        
        var mou = {
            id: !Ext.isEmpty(values.id) ? values.id : null,
            nomor: values.nomor,
            judulIndonesia: values.judulIndonesia,
            judulEnglish: values.judulEnglish,
            pembukaanIndonesia: values.pembukaanIndonesia,
            pembukaanEnglish: values.pembukaanEnglish,
            instansiPihak3: values.instansiPihak3,
            penanggungJawabPihak3: values.penanggungJawabPihak3,
            tglMou: Ext.isEmpty(values.tglMou) ? null : Ext.Date.format(Ext.Date.parse(values.tglMou, 'd F Y'), 'c'),
            disetujuiOleh: values.disetujuiOleh,
            jabatanPersetujuan: values.jabatanPersetujuan,
            keteranganPersetujuan: values.keteranganPersetujuan,
            waktuPengingat: Ext.isEmpty(values.waktuPengingat) ? null : Ext.Date.format(Ext.Date.parse(values.waktuPengingat, 'd F Y'), 'c'),
            trPotensiGas: {
                id: values.potensiGasId
            },
            bahasa: bahasa 
        };

        if (form.getForm().isValid()) {
            if (mou.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.mouUrl + mou.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(mou),
                    success: function (response, options) {
                        me.getMouGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        me.reshowValueMou(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Memorandum of Understanding');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Memorandum of Understanding');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.mouUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(mou),
                    success: function (response, options) {
                        me.getMouGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        me.reshowValueMou(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Memorandum of Understanding');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Memorandum of Understanding');
                    }
                });
            }
        }
    },

    mouButtonChangestatusClick: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusMou(this.data);
        var window = Ext.widget('mouChangeStatusWindow', {
            parentName: 'mou',
            typeComboList: lastStatus == 'DRAFT' ? 0 : (lastStatus == 'DRAFT_DISETUJUI' ? 1 : null)
        });
        
        if(lastStatus==='DRAFT_FINAL') {
            var form = this.getMouFormPanelForm();
            var nomor = form.down('textfield[name=nomor]').getValue();
            if(nomor==='') {
                window.down("button[action=save]").disable();
            } else {
                window.down("button[action=save]").enable();
            }
        }
    },

    mouChangestatusButtonSaveClick: function () {
        var me = this;
        var formStatus = this.getMouChangeStatusWindow().down("form[groupField=status]");
        var valuesStatus = formStatus.getValues();

        if (formStatus.getForm().isValid()) {

            /**
             * Jika status adalah DISETUJUI harus menyertakan nilai persetujuan pada body.
             */

            var formPersetujuan = this.getMouChangeStatusWindow().down("form[groupField=persetujuan]");
            var valuesPersetujuan = null;
            var isRequest = true; // status apapun akan melakukan request, kecuali untuk DISETUJUI harus diisi form->persetujuan
            if ('DISETUJUI' == valuesStatus.status) { //jika status adalah disetujui, ambil nilai form->persetujuan
                if (formPersetujuan.getForm().isValid()) {
                    valuesPersetujuan = formPersetujuan.getValues();
                    valuesPersetujuan.tglMou = Ext.isEmpty(valuesPersetujuan.tglMou) ? null : Ext.Date.format(Ext.Date.parse(valuesPersetujuan.tglMou, 'd F Y'), 'c');
                    valuesPersetujuan.waktuPengingat = Ext.isEmpty(valuesPersetujuan.waktuPengingat) ? null : Ext.Date.format(Ext.Date.parse(valuesPersetujuan.waktuPengingat, 'd F Y'), 'c');
                } else {
                    isRequest = false;
                }
            }
            if (isRequest) { //jika bisa melakukan request
                Ext.Ajax.request({
                    url: Ifuel.config.mouUrl + me.data.id + "/changeStatus/" + valuesStatus.status,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 120000,
                    params: Ext.JSON.encode(valuesPersetujuan),
                    success: function (response, options) {
                        me.reshowValueMou(Ifuel.config.mouUrl + me.data.id); //bagian ini jangan terbalik
                        me.getMouGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Memorandum of Understanding');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Memorandum of Understanding');
                    }
                });
                this.getMouChangeStatusWindow().close();
            }
        }
    },

    reshowValueMou: function (url) {
        var me = this;
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response, options) {
                var responseData = Ext.JSON.decode(response.responseText);
                responseData.tglMou = Ext.isEmpty(responseData.tglMou) ? null : new Date(responseData.tglMou);
                responseData.waktuPengingat = Ext.isEmpty(responseData.waktuPengingat) ? null : new Date(responseData.waktuPengingat);
                me.setData(responseData);
            },
            failure: function (response, options) {
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Memorandum of Understanding');
            }
        });
    },

    /**
     * memberikan nilai pada data untuk controller ini yang sedang aktif.
     * dipanggil ketika grid mou di click/dblclick, sukses update data(reshowValueMou(url)),
     * dan ketika tombol new mou ditekan(membuat mou baru -- data adalah null).
     * @param newData
     */
    setData: function (newData) {
        this.data = newData;

        this.buttonDataChange();

        if (this.getMouGridPanel().isHidden()) {
            this.formDataChange();
            if (!Ext.isEmpty(this.data)) {//jika grid click/dblclick atau update data(reshowValueMou(url))
                this.showValueMou();
            } else {//jika data kosong atau buat data baru (tombol new mou ditekan)
                this.clearValueMou();
            }
        }
    },

    buttonDataChange: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusMou(this.data);
        var mouTabPanel = this.getMouTabPanel();
        var mouGridPanel = this.getMouGridPanel();
        var documentGridPanel = this.getDocumentGridPanel();
        var pasalGridPanel = this.getPasalGridPanel();
        var ayatGridPanel = this.getAyatGridPanel();

        mouTabPanel.down('button[action=changestatus]').disable();
        mouTabPanel.down('button[action=save]').disable();
        mouTabPanel.down("toolbar").down("button[action=salin]").disable();
        documentGridPanel.down("button[action=new]").disable();
        pasalGridPanel.down("button[action=new]").disable();
        ayatGridPanel.down("button[action=new]").disable();

        if (this.allowWrite) {
            if (Ext.isEmpty(this.data)) {//jika buat data baru
                if (mouGridPanel.isHidden()) {
                    mouTabPanel.down('button[action=save]').enable();
                }
            }

            if ('DRAFT' == lastStatus || 'DRAFT_FINAL' == lastStatus || 'DRAFT_DISETUJUI' == lastStatus) {
                mouTabPanel.down('button[action=changestatus]').enable();
                documentGridPanel.down("button[action=new]").enable();
                pasalGridPanel.down("button[action=new]").enable();
                ayatGridPanel.down("button[action=new]").enable();

                if ('DRAFT' == lastStatus) {
                    this.getMouTabPanel().down("toolbar").down("button[action=salin]").enable();
                }

                if (mouGridPanel.isHidden()) {//jika update data pas status DRAFT / DRAFT_FINAL
                    mouTabPanel.down('button[action=save]').enable();
                }
            }
        }
    },

    formDataChange: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusMou(this.data);
        var form = this.getMouFormPanelForm();

        form.down('textfield[name=nomor]').setReadOnly(true);

        form.down('textarea[name=judulIndonesia]').setReadOnly(true);
        form.down('textarea[name=judulEnglish]').setReadOnly(true);

        form.down('textfield[name=instansiPihak3]').setReadOnly(true);
        form.down('textfield[name=penanggungJawabPihak3]').setReadOnly(true);

        form.down('textarea[name=pembukaanIndonesia]').setReadOnly(true);
        form.down('textarea[name=pembukaanEnglish]').setReadOnly(true);

        if (this.allowWrite) {
            if (Ext.isEmpty(lastStatus) || 'DRAFT' == lastStatus) {
                form.down('textfield[name=nomor]').setReadOnly(false);

                form.down('textarea[name=judulIndonesia]').setReadOnly(false);
                form.down('textarea[name=judulEnglish]').setReadOnly(false);

                form.down('textfield[name=instansiPihak3]').setReadOnly(false);
                form.down('textfield[name=penanggungJawabPihak3]').setReadOnly(false);

                form.down('textarea[name=pembukaanIndonesia]').setReadOnly(false);
                form.down('textarea[name=pembukaanEnglish]').setReadOnly(false);
            }
            
            if (Ext.isEmpty(lastStatus) || 'DRAFT_FINAL' === lastStatus) {
                form.down('textfield[name=nomor]').setReadOnly(false);
            }

        }
    },

    clearValueMou: function () {
        var form = this.getMouFormPanelForm();
        var now = new Date();

        form.getForm().reset();
        form.down('button[action=potensiGasSearch]').enable();

        this.reloadGrid(null);
    },

    showValueMou: function () {
        var form = this.getMouFormPanelForm();
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusMou(this.data);
        var now = new Date();

        form.loadRecord(new Ifuel.model.pengadaan.TrMou(this.data));

        this.showValuePotensiGas(this.data.trPotensiGas);
        this.reloadGrid(this.data.id);

        form.down('textfield[name=status]').setValue(lastStatus);
    },

    showValuePotensiGas: function (potensiGas) {
        var form = this.getMouFormPanelForm();
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusMou(this.data);

        form.down('hiddenfield[name=potensiGasId]').setValue(potensiGas.id);
        form.down('textfield[name=potensiGas]').setValue(potensiGas.id);
        form.down('textfield[name=pembangkit]').setValue(potensiGas.tmPltgm.namaPltgm);
        form.down('textfield[name=sumberGas]').setValue(potensiGas.tmSumberGas.namaSumberGas);
        form.down('textfield[name=instansiPihak1]').setValue('PLN');
        form.down('textfield[name=instansiPihak2]').setValue(potensiGas.tmPemasok.namaPemasok);

        form.down('button[action=potensiGasSearch]').disable();
        if ('DRAFT' == lastStatus) {
            form.down('button[action=potensiGasSearch]').enable();
        }
    },

    reloadGrid: function (mouId) {
        this.reloadPasalMouGrid(mouId);
        this.reloadDocumentMouGrid(mouId);
    },

    reloadDocumentMouGrid: function (mouId) {
        var grid = this.getDocumentGridPanel();
        var store = grid.getStore();
        if (mouId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.documentUrl + 'byMou/' + mouId,
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

    reloadPasalMouGrid: function (mouId) {
        var grid = this.getPasalGridPanel();
        var store = grid.getStore();
        if (mouId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.pasalUrl + 'simple/byMou/' + mouId,
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
        
        var form = this.getMouFormPanelForm();
        var bahasa = form.down('combobox[name=bahasa]').getValue();

        var gridAyat = this.getAyatGridPanel();
        
        if(bahasa==="INDONESIA") {
            grid.columns[2].setVisible(false);
            grid.columns[4].setVisible(false);
            
            gridAyat.columns[2].setVisible(false);
        } else {
            grid.columns[2].setVisible(true);
            grid.columns[4].setVisible(true);
            
            gridAyat.columns[2].setVisible(true);
        }

    },

    activatedTabForm: function () {
        var moutFormPanel = this.getMouFormPanel();
        moutFormPanel.enable();
        this.getMouTabPanel().setActiveTab(moutFormPanel);

        this.getMouPasalAyatPanel().enable();
    },
           
     onChangeBahasa: function (field, value, options) {
        var form = this.getMouFormPanelForm();
        var gridPasal = this.getPasalGridPanel();
        var gridAyat = this.getAyatGridPanel();
       
        if(value==="INDONESIA") {
            form.down('textarea[name=judulEnglish]').hide();
            form.down('textarea[name=pembukaanEnglish]').hide();
            
            gridPasal.columns[2].setVisible(false);
            gridPasal.columns[4].setVisible(false);
            
            gridAyat.columns[2].setVisible(false);
        } else {
            form.down('textarea[name=judulEnglish]').show();
            form.down('textarea[name=pembukaanEnglish]').show();
            
            gridPasal.columns[2].setVisible(true);
            gridPasal.columns[4].setVisible(true);
            
            gridAyat.columns[2].setVisible(true);
        }
    }
    
});


