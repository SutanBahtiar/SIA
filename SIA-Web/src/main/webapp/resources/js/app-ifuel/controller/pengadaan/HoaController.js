Ext.define('Ifuel.controller.pengadaan.HoaController', {
    extend: 'Ext.app.Controller',
//        allowWrite:Ifuel.util.SecurityHelper.isWriteAllowed("ANAK_PERUSAHAAN_WRITE"),
    allowWrite: true,
//    allowWrite: false,

    views: [
        "pengadaan.hoa.HoaPanel",
        "pengadaan.hoa.HoaChangeStatusWindow",
        "pengadaan.hoa.HoaCopyPasalWindow",
        "pengadaan.mou.MouWindowChooser",
        "master.document.DocumentWindow",
        "master.pasal.PasalRiwayatPasalWindow",
        "master.ayat.AyatRiwayatAyatWindow"
    ],
    models: [],
    stores: [],

    /**
     * Field ini adalah data hoa yang dipilih untuk ditampilkan di form.
     * Jika ada data pada grid panel di-double click, data tersebut di-assign ke field ini.
     * Jika setelah save data baru/update/change status, data yang disave akan diambil dari server dan di-assign ke field ini.
     * Field ini akan di-assign null jika: menekan tombol new.
     */
    data: null,

    refs: [
        //selector untuk bagian TrHoa
        {
            ref: 'hoaTabPanel',
            selector: 'hoaPanel tabpanel'
        },
        {
            ref: 'hoaGridPanel',
            selector: 'hoaPanel tabpanel hoaGridPanel'
        },
        {
            ref: 'hoaFormPanel',
            selector: 'hoaPanel tabpanel hoaFormPanel'
        },
        {
            ref: 'hoaFormPanelForm',
            selector: 'hoaPanel tabpanel hoaFormPanel form'
        },
        {
            ref: 'hoaIdHiddenField',
            selector: 'hoaPanel tabpanel hoaFormPanel form hiddenfield[name=id]'
        },
        {
            ref: 'mouWindowChooser',
            selector: 'mouWindowChooser[parentName=hoa]'
        },
        {
            ref: 'hoaChangeStatusWindow',
            selector: 'hoaChangeStatusWindow[parentName=hoa]'
        },

        //Document
        {
            ref: 'documentGridPanel',
            selector: 'hoaPanel tabpanel hoaFormPanel documentGridPanel'
        },
        {
            ref: 'documentWindow',
            selector: 'documentWindow[parentName=hoa]'
        },

        //salin pasal
        {
            ref: 'copyPasalWindow',
            selector: 'hoaCopyPasalWindow[parentName=hoa]'
        },
        {
            ref: 'copyPasalTab',
            selector: 'hoaCopyPasalWindow[parentName=hoa] tabpanel'
        },
        {
            ref: 'copyPasalHoaGridPanel',
            selector: 'hoaCopyPasalWindow[parentName=hoa] hoaGridPanel'
        },
        {
            ref: 'copyPasalPasalAyatPanel',
            selector: 'hoaCopyPasalWindow[parentName=hoa] simplePasalSimpleAyatPanel'
        },
        {
            ref: 'copyPasalPasalGridPanel',
            selector: 'hoaCopyPasalWindow[parentName=hoa] simplePasalSimpleAyatPanel simplePasalGridPanel'
        },
        {
            ref: 'copyPasalAyatGridPanel',
            selector: 'hoaCopyPasalWindow[parentName=hoa] simplePasalSimpleAyatPanel simpleAyatGridPanel'
        },

        //PASAL
        {
            ref: 'hoaPasalAyatPanel',
            selector: 'hoaPanel tabpanel simplePasalSimpleAyatPanel '
        },
        {
            ref: 'pasalGridPanel',
            selector: 'hoaPanel tabpanel simplePasalSimpleAyatPanel simplePasalGridPanel'
        },
        {
            ref: 'pasalWindow',
            selector: 'pasalRiwayatPasalWindow[parentName=hoa]'
        },

        //AYAT
        {
            ref: 'ayatGridPanel',
            selector: 'hoaPanel tabpanel simplePasalSimpleAyatPanel simpleAyatGridPanel'
        },
        {
            ref: 'ayatWindow',
            selector: 'ayatRiwayatAyatWindow[parentName=hoa]'
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
            'hoaPanel tabpanel hoaGridPanel': {
                itemdblclick: this.hoaGridItemdblclick,
                show: this.hoaGridShow
            },
            'hoaPanel tabpanel hoaFormPanel documentGridPanel': {
                itemdblclick: this.documentHoaGridItemdblclick
            },
            'hoaPanel tabpanel simplePasalSimpleAyatPanel simplePasalGridPanel': {
                itemdblclick: this.pasalHoaGridItemdblclick,
                selectionchange: this.pasalHoaGridSelectionChange
            },
            'hoaPanel tabpanel simplePasalSimpleAyatPanel simpleAyatGridPanel': {
                itemdblclick: this.ayatHoaGridItemdblclick
            }
        });
        if (this.allowWrite) {
            this.control({
                //segala hal yang berhubungan dengan tabel TrHoa
                'hoaPanel tabpanel hoaGridPanel': {
                    selectionchange: this.hoaGridSelectionChange
                },
                'hoaPanel > tabpanel > toolbar button[action=new]': {
                    click: this.hoaButtonNewClick
                },
                'hoaPanel > tabpanel > toolbar button[action=save]': {
                    click: this.hoaButtonSaveClick
                },
                'hoaPanel > tabpanel > toolbar button[action=changestatus]': {
                    click: this.hoaButtonChangestatusClick
                },
                'hoaPanel tabpanel hoaFormPanel form fieldcontainer[groupField=mou] button[action=mouSearch]': {
                    click: this.hoaButtonMouSearchClick
                },
                'hoaPanel tabpanel hoaFormPanel form combobox[name=bahasa]': {
                    change: this.onChangeBahasa
                },
                'mouWindowChooser[parentName=hoa] mouGridPanel': {
                    itemdblclick: this.hoaMouGridItemdblclick
                },
                'hoaChangeStatusWindow[parentName=hoa] button[action=save]': {
                    click: this.hoaChangestatusButtonSaveClick
                },

                //document
                'hoaPanel tabpanel hoaFormPanel documentGridPanel': {
                    selectionchange: this.documentHoaGridSelectionChange
                },
                'hoaPanel tabpanel hoaFormPanel documentGridPanel button[action=new]': {
                    click: this.documentHoaButtonNewClick
                },
                'hoaPanel tabpanel hoaFormPanel documentGridPanel button[action=delete]': {
                    click: this.documentHoaButtonDeleteClick
                },
                'documentWindow[parentName=hoa] button[action=save]': {
                    click: this.documentHoaWindowButtonSaveClick
                },

                //salin pasal
                'hoaPanel > tabpanel > toolbar button[action=salin]': {
                    click: this.hoaButtonSalinPasalClick
                },
                'hoaCopyPasalWindow[parentName=hoa] button[action=salin]': {
                    click: this.hoaCopyPasalButtonSalinClick
                },
                'hoaCopyPasalWindow[parentName=hoa] hoaGridPanel': {
                    itemdblclick: this.hoaGridCopyPasalItemdblclick,
                    show: this.hoaGridCopyPasalShow
                },

                //pasal
                'hoaPanel tabpanel simplePasalSimpleAyatPanel simplePasalGridPanel': {
                },
                'hoaPanel tabpanel simplePasalSimpleAyatPanel simplePasalGridPanel button[action=new]': {
                    click: this.pasalHoaButtonNewClick
                },
                'hoaPanel tabpanel simplePasalSimpleAyatPanel simplePasalGridPanel button[action=delete]': {
                    click: this.pasalHoaButtonDeleteClick
                },
                'pasalRiwayatPasalWindow[parentName=hoa] button[action=save]': {
                    click: this.pasalHoaWindowButtonSaveClick
                },

                //ayat
                'hoaPanel tabpanel simplePasalSimpleAyatPanel simpleAyatGridPanel': {
                    selectionchange: this.ayatHoaGridSelectionChange
                },
                'hoaPanel tabpanel simplePasalSimpleAyatPanel simpleAyatGridPanel button[action=new]': {
                    click: this.ayatHoaButtonNewClick
                },
                'hoaPanel tabpanel simplePasalSimpleAyatPanel simpleAyatGridPanel button[action=delete]': {
                    click: this.ayatHoaButtonDeleteClick
                },
                'ayatRiwayatAyatWindow[parentName=hoa] button[action=save]': {
                    click: this.ayatHoaWindowButtonSaveClick
                }
            });
        } else {
            this.control({
                'hoaPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=changestatus]").setDisabled(true);
                    }
                },
                'hoaPanel tabpanel hoaFormPanel documentGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'hoaPanel tabpanel simplePasalSimpleAyatPanel simplePasalGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                },
                'hoaPanel tabpanel simplePasalSimpleAyatPanel simpleAyatGridPanel': {
                    afterrender: function (panel) {
                        panel.down("button[action=new]").setDisabled(true);
                        panel.down("button[action=delete]").setDisabled(true);
                    }
                }
            });
        }
    },

    //---- SALIN PASAL -----------------------------------

    hoaButtonSalinPasalClick: function () {
        Ext.widget('hoaCopyPasalWindow', {parentName: 'hoa'});
        this.reloadCopyPasalHoaGrid(this.data.trMou.trPotensiGas.tmPemasok.id);
    },

    hoaGridCopyPasalItemdblclick: function (grid, record) {
        this.activatedTabPasalAyatCopyPasal();
    },

    hoaCopyPasalButtonSalinClick: function () {
        var me = this;
        var records = this.getCopyPasalHoaGridPanel().getSelectionModel().getSelection();
        if (records[0]) {
            Ext.Ajax.request({
                url: Ifuel.config.pasalUrl + "copy/hoa/from/" + records[0].data.id + "/to/" + me.data.id,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, options) {
                    me.getPasalGridPanel().getStore().reload();
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Salin Pasal Head of Agreement');
                    me.getCopyPasalWindow().close();
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Salin Pasal Head of Agreement');
                }
            });
        }
    },

    hoaGridCopyPasalShow: function () {
        var hoaGridPanel = this.getCopyPasalHoaGridPanel();

        var hoaPasalAyatPanel = this.getCopyPasalPasalAyatPanel();
        hoaPasalAyatPanel.disable();
        this.getCopyPasalTab().setActiveTab(hoaGridPanel);

        this.getCopyPasalWindow().down('button[action=salin]').disable();
    },

    activatedTabPasalAyatCopyPasal: function () {
        var hoaGridPanel = this.getCopyPasalHoaGridPanel();

        var records = hoaGridPanel.getSelectionModel().getSelection();
        this.reloadCopyPasalPasalGrid(records[0] ? records[0].data.id : null, records[0].data.bahasa);

        var hoaPasalAyatPanel = this.getCopyPasalPasalAyatPanel();
        hoaPasalAyatPanel.enable();
        this.getCopyPasalTab().setActiveTab(hoaPasalAyatPanel);

        this.getCopyPasalWindow().down('button[action=salin]').enable();
    },

    reloadCopyPasalHoaGrid: function (pemasokId) {
        var grid = this.getCopyPasalHoaGridPanel();
        var store = grid.getStore();
        if (pemasokId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.hoaUrl + 'byPemasok/' + pemasokId + '/byStatus/DISETUJUI',
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

    reloadCopyPasalPasalGrid: function (hoaId, bahasa) {
        var grid = this.getCopyPasalPasalGridPanel();
        var store = grid.getStore();
        if (hoaId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.pasalUrl + '/simple/byHoa/' + hoaId,
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

    //---- FUNCTION AYAT HOA ----------------------------------------------------------------------------

    ayatHoaGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusHoa(this.data);
        if ('DRAFT' == lastStatus && selected[0]) {
            this.toggleAyatHoaDeleteButton(true);
        } else {
            this.toggleAyatHoaDeleteButton(false);
        }
    },

    ayatHoaButtonNewClick: function () {
        var pasalRecord = this.getPasalGridPanel().getSelectionModel().getSelection()[0];
        var formWindow = Ext.widget('ayatRiwayatAyatWindow', {parentName: 'hoa', hiddenRiwayatAyat: true});
        formWindow.down("hiddenfield[name=pasalId]").setValue(pasalRecord.data.id);
        formWindow.down("numberfield[name=pasal]").setValue(pasalRecord.data.pasal);

        formWindow.down("button[action=save]").enable();
    },

    ayatHoaButtonDeleteClick: function (button) {
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
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Ayat Head of Agreement');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Ayat Head of Agreement');
                }
            });
        }
    },

    ayatHoaWindowButtonSaveClick: function (button) {
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
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Ayat Head of Agreement');
                    if(me.getStatusPotensiGasGridPanel !== null) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                    }
                    me.getAyatWindow().close();
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Ayat Head of Agreement');
                }
            });
        }
    },

    ayatHoaGridItemdblclick: function (o, record) {
        var formWindow = Ext.widget('ayatRiwayatAyatWindow', {parentName: 'hoa', hiddenRiwayatAyat: false});
        formWindow.down("form").loadRecord(record);
        formWindow.down("hiddenfield[name=pasalId]").setValue(record.data.tmPasal.id);
        formWindow.down("numberfield[name=pasal]").setValue(record.data.tmPasal.pasal);
        formWindow.setUrl(Ifuel.config.riwayatAyatUrl + "byAyat/" + record.data.id + "?page.size=1&page.page=1&page.sort=createdAt&page.sort.dir=desc");

        var lastStatus = Ifuel.util.SystemUtil.getLastStatusHoa(this.data);
        if (this.allowWrite && ("DRAFT" == lastStatus || "DRAFT_FINAL" == lastStatus)) {
            formWindow.down("button[action=save]").enable();
        }
        
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

    toggleAyatHoaDeleteButton: function (enable) {
        if (enable) {
            this.getAyatGridPanel().down('button[action=delete]').enable();
        } else {
            this.getAyatGridPanel().down('button[action=delete]').disable();
        }
    },

    //---- FUNCTION PASAL HOA ----------------------------------------------------------------------------

    pasalHoaGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusHoa(this.data);
        this.togglePasalHoaDeleteButton(false);
        if (this.allowWrite && selected[0]) {
            if ('DRAFT' == lastStatus) {
                this.togglePasalHoaDeleteButton(true);
            }
        }
    },

    pasalHoaButtonNewClick: function () {
        var formWindow = Ext.widget('pasalRiwayatPasalWindow', {parentName: 'hoa', hiddenRiwayatPasal: true});
        formWindow.down("button[action=save]").enable();
    },

    pasalHoaButtonDeleteClick: function (button) {
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
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Pasal Head of Agreement');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Pasal Head of Agreement');
                }
            });
        }
    },

    pasalHoaWindowButtonSaveClick: function (button) {
        var me = this;
        var form = this.getPasalWindow().down('form');

        var values = form.getForm().getValues();
        if (form.getForm().isValid()) {
            Ext.Ajax.request({
                url: Ifuel.config.pasalUrl + "simple/toHoa/" + me.data.id,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode(values),
                success: function (response, options) {
                    me.getPasalGridPanel().getStore().reload();
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pasal Head of Agreement');
                    me.getPasalWindow().close();
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pasal Head of Agreement');
                }
            });
        }
    },

    pasalHoaGridItemdblclick: function (o, record) {
        var formWindow = Ext.widget('pasalRiwayatPasalWindow', {parentName: 'hoa', hiddenRiwayatPasal: false});
        formWindow.down("form").loadRecord(record);
        formWindow.setUrl(Ifuel.config.riwayatPasalUrl + "byPasal/" + record.data.id + "?page.size=1&page.page=1&page.sort=createdAt&page.sort.dir=desc");

        var lastStatus = Ifuel.util.SystemUtil.getLastStatusHoa(this.data);
        if (this.allowWrite && ("DRAFT" == lastStatus || "DRAFT_FINAL" == lastStatus)) {
            formWindow.down("button[action=save]").enable();
        }
        
        var form = this.getHoaFormPanelForm();
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

    togglePasalHoaDeleteButton: function (enable) {
        if (enable) {
            this.getPasalGridPanel().down('button[action=delete]').enable();
        } else {
            this.getPasalGridPanel().down('button[action=delete]').disable();
        }
    },

    //---- FUNCTION DOCUMENT HOA -------------------------------------------------------------------------

    documentHoaGridSelectionChange: function (sel, selected) {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusHoa(this.data);
        if ('DRAFT' == lastStatus && selected[0]) {
            this.toggleDocumentHoaDeleteButton(true);
        } else {
            this.toggleDocumentHoaDeleteButton(false);
        }
    },

    documentHoaButtonNewClick: function () {
        Ext.widget('documentWindow', {parentName: 'hoa'});
        this.getDocumentWindow().down('hiddenfield[name=parentId]').setValue(this.data.id);
    },

    documentHoaButtonDeleteClick: function (button) {
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
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Document Head of Agreement');
                },
                failure: function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Document Head of Agreement');
                }
            });
        }
    },

    documentHoaWindowButtonSaveClick: function (button) {
        var me = this;
        var form = this.getDocumentWindow().down('form');

        if (form.getForm().isValid()) {
            form.submit({
                url: Ifuel.config.documentUrl + 'upload/toHoa/' + me.data.id,
                waitMsg: 'Uploading your document...',
                success:function (form, action) {
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

    documentHoaGridItemdblclick: function (o, record) {
        window.open(Ifuel.config.documentUrl + 'download/' + record.data.id);
    },

    toggleDocumentHoaDeleteButton: function (enable) {
        if (enable) {
            this.getDocumentGridPanel().down('button[action=delete]').enable();
        } else {
            this.getDocumentGridPanel().down('button[action=delete]').disable();
        }
    },

    // ---- HoA ----------------------------------------------------------------------------------------

    hoaGridShow: function () {
        var hoaGridPanel = this.getHoaGridPanel();
        this.getHoaFormPanel().disable();
        this.getHoaPasalAyatPanel().disable();
        this.getHoaTabPanel().setActiveTab(hoaGridPanel);
        this.getHoaTabPanel().down("toolbar").down("button[action=salin]").disable();

        var records = hoaGridPanel.getSelectionModel().getSelection();
        if (!Ext.isEmpty(records[0])) {
            this.setData(records[0].data);
        } else {
            this.setData(null);
        }
    },

    hoaGridSelectionChange: function (sel, selected) {
        if (!this.getHoaGridPanel().isHidden()) {
            if (selected[0]) {
                this.setData(selected[0].data);
            } else {
                this.setData(null);
            }
        }
    },

    hoaButtonNewClick: function () {
        this.activatedTabForm();  //jangan dibalik
        this.setData(null);
    },

    hoaGridItemdblclick: function (grid, record) {
        this.activatedTabForm(); //jangan dibalik
        this.setData(record.data);
    },

    hoaButtonMouSearchClick: function () {
        var mouWindowChooser = Ext.create('Ifuel.view.pengadaan.mou.MouWindowChooser', {parentName: 'hoa'});
        mouWindowChooser.setUrl(Ifuel.config.mouUrl + '/NotHasHoa/byStatus/DISETUJUI')
        mouWindowChooser.show();
    },

    hoaMouGridItemdblclick: function (grid, record) {
        this.showValueMou(record.data);
        this.getMouWindowChooser().close();
    },

    hoaButtonSaveClick: function () {
        var me = this;
        var form = this.getHoaFormPanelForm();
        var values = form.getValues();

        var bahasa = values.bahasa.replace("-", "_");

        var hoa = {
            id: !Ext.isEmpty(values.id) ? values.id : null,
            nomor: values.nomor,
            judulIndonesia: values.judulIndonesia,
            judulEnglish: values.judulEnglish,
            pembukaanIndonesia: values.pembukaanIndonesia,
            pembukaanEnglish: values.pembukaanEnglish,
            tglHoa: Ext.isEmpty(values.tglHoa) ? null : Ext.Date.format(Ext.Date.parse(values.tglHoa, 'd F Y'), 'c'),
            disetujuiOleh: values.disetujuiOleh,
            jabatanPersetujuan: values.jabatanPersetujuan,
            keteranganPersetujuan: values.keteranganPersetujuan,
            trMou: {
                id: values.mouId
            },
            bahasa: bahasa
        };

        if (form.getForm().isValid()) {
            if (hoa.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.hoaUrl + hoa.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(hoa),
                    success: function (response, options) {
                        me.getHoaGridPanel().getStore().reload();
                        me.reshowValueHoa(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Head of Agreement');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Head of Agreement');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.hoaUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(hoa),
                    success: function (response, options) {
                        me.getHoaGridPanel().getStore().reload();
                        me.reshowValueHoa(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Head of Agreement');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Head of Agreement');
                    }
                });
            }
        }
    },

    hoaButtonChangestatusClick: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusHoa(this.data);
        var window = Ext.widget('hoaChangeStatusWindow', {
            parentName: 'hoa',
            typeComboList: lastStatus == 'DRAFT' ? 0 : (lastStatus == 'DRAFT_DISETUJUI' ? 1 : null)
        });
    },

    hoaChangestatusButtonSaveClick: function () {
        var me = this;
        var formStatus = this.getHoaChangeStatusWindow().down("form[groupField=status]");
        var valuesStatus = formStatus.getValues();

        if (formStatus.getForm().isValid()) {

            /**
             * Jika status adalah DISETUJUI harus menyertakan nilai persetujuan pada body.
             */

            var formPersetujuan = this.getHoaChangeStatusWindow().down("form[groupField=persetujuan]");
            var valuesPersetujuan = null;
            var isRequest = true; // status apapun akan melakukan request, kecuali untuk DISETUJUI harus diisi form->persetujuan
            if ('DISETUJUI' == valuesStatus.status) { //jika status adalah disetujui, ambil nilai form->persetujuan
                if (formPersetujuan.getForm().isValid()) {
                    valuesPersetujuan = formPersetujuan.getValues();
                    valuesPersetujuan.tglHoa = Ext.isEmpty(valuesPersetujuan.tglHoa) ? null : Ext.Date.format(Ext.Date.parse(valuesPersetujuan.tglHoa, 'd F Y'), 'c');
                } else {
                    isRequest = false;
                }
            }
            if (isRequest) { //jika bisa melakukan request
                Ext.Ajax.request({
                    url: Ifuel.config.hoaUrl + me.data.id + "/changeStatus/" + valuesStatus.status,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 120000,
                    params: Ext.JSON.encode(valuesPersetujuan),
                    success: function (response, options) {
                        me.reshowValueHoa(Ifuel.config.hoaUrl + me.data.id); //bagian ini jangan terbalik
                        me.getHoaGridPanel().getStore().reload();
                        
                        if(me.getStatusPotensiGasGridPanel !== null) {
                            me.getStatusPotensiGasGridPanel().getStore().reload();
                        }
                        
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Head of Agreement');
                    },
                    failure: function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Head of Agreement');
                    }
                });
                this.getHoaChangeStatusWindow().close();
            }
        }
    },

    reshowValueHoa: function (url) {
        var me = this;
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response, options) {
                var responseData = Ext.JSON.decode(response.responseText);
                responseData.tglHoa = Ext.isEmpty(responseData.tglHoa) ? null : new Date(responseData.tglHoa);
                responseData.waktuPengingat = Ext.isEmpty(responseData.waktuPengingat) ? null : new Date(responseData.waktuPengingat);
                me.setData(responseData);
            },
            failure: function (response, options) {
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Head of Agreement');
            }
        });
    },

    /**
     * memberikan nilai pada data untuk controller ini yang sedang aktif.
     * dipanggil ketika grid hoa di click/dblclick, sukses update data(reshowValueHoa(url)),
     * dan ketika tombol new hoa ditekan(membuat hoa baru -- data adalah null).
     * @param newData
     */
    setData: function (newData) {
        this.data = newData;

        this.buttonDataChange();

        if (this.getHoaGridPanel().isHidden()) {
            this.formDataChange();
            if (!Ext.isEmpty(this.data)) {//jika grid click/dblclick atau update data(reshowValueHoa(url))
                this.showValueHoa();
            } else {//jika data kosong atau buat data baru (tombol new hoa ditekan)
                this.clearValueHoa();
            }
        }
    },

    buttonDataChange: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusHoa(this.data);
        var hoaTabPanel = this.getHoaTabPanel();
        var hoaGridPanel = this.getHoaGridPanel();
        var documentGridPanel = this.getDocumentGridPanel();
        var pasalGridPanel = this.getPasalGridPanel();
        var ayatGridPanel = this.getAyatGridPanel();

        hoaTabPanel.down('button[action=changestatus]').disable();
        hoaTabPanel.down('button[action=save]').disable();
        documentGridPanel.down("button[action=new]").disable();
        pasalGridPanel.down("button[action=new]").disable();
        ayatGridPanel.down("button[action=new]").disable();
        hoaTabPanel.down("toolbar").down("button[action=salin]").disable();

        if (this.allowWrite) {
            if (Ext.isEmpty(this.data)) {//jika buat data baru
                if (hoaGridPanel.isHidden()) {
                    hoaTabPanel.down('button[action=save]').enable();
                }
            }

            if ('DRAFT' == lastStatus || 'DRAFT_FINAL' == lastStatus || 'DRAFT_DISETUJUI' == lastStatus) {
                hoaTabPanel.down('button[action=changestatus]').enable();
                documentGridPanel.down("button[action=new]").enable();
                pasalGridPanel.down("button[action=new]").enable();
                ayatGridPanel.down("button[action=new]").enable();

                if ('DRAFT' == lastStatus) {
                    hoaTabPanel.down("toolbar").down("button[action=salin]").enable();
                }

                if (hoaGridPanel.isHidden()) {//jika update data pas status DRAFT / DRAFT_FINAL
                    hoaTabPanel.down('button[action=save]').enable();
                }
            }
        }
    },

    formDataChange: function () {
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusHoa(this.data);
        var form = this.getHoaFormPanelForm();

        form.down('textfield[name=nomor]').setReadOnly(true);

        form.down('textarea[name=judulIndonesia]').setReadOnly(true);
        form.down('textarea[name=judulEnglish]').setReadOnly(true);

        form.down('textarea[name=pembukaanIndonesia]').setReadOnly(true);
        form.down('textarea[name=pembukaanEnglish]').setReadOnly(true);

        if (this.allowWrite) {
            if (Ext.isEmpty(lastStatus) || 'DRAFT' == lastStatus) {
                form.down('textfield[name=nomor]').setReadOnly(false);

                form.down('textarea[name=judulIndonesia]').setReadOnly(false);
                form.down('textarea[name=judulEnglish]').setReadOnly(false);

                form.down('textarea[name=pembukaanIndonesia]').setReadOnly(false);
                form.down('textarea[name=pembukaanEnglish]').setReadOnly(false);
            }
        }
    },

    clearValueHoa: function () {
        var form = this.getHoaFormPanelForm();
        var now = new Date();

        form.getForm().reset();
        form.down('button[action=mouSearch]').enable();

        this.reloadGrid(null);
    },

    showValueHoa: function () {
        var form = this.getHoaFormPanelForm();
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusHoa(this.data);
        var now = new Date();

        form.loadRecord(new Ifuel.model.pengadaan.TrHoa(this.data));

        this.showValueMou(this.data.trMou);
        this.reloadGrid(this.data.id);

        form.down('textfield[name=status]').setValue(lastStatus);
    },

    showValueMou: function (mou) {
        var form = this.getHoaFormPanelForm();
        var lastStatus = Ifuel.util.SystemUtil.getLastStatusHoa(this.data);
        var potensiGas = mou.trPotensiGas;

        form.down('hiddenfield[name=mouId]').setValue(mou.id);
        form.down('textfield[name=mou]').setValue(mou.judulIndonesia);
        form.down('textfield[name=pembangkit]').setValue(potensiGas.tmPltgm.namaPltgm);
        form.down('textfield[name=sumberGas]').setValue(potensiGas.tmSumberGas.namaSumberGas);
        form.down('textfield[name=instansiPihak1]').setValue('PLN');
        form.down('textfield[name=instansiPihak2]').setValue(potensiGas.tmPemasok.namaPemasok);

        form.down('button[action=mouSearch]').disable();
        if ('DRAFT' == lastStatus) {
            form.down('button[action=mouSearch]').enable();
        }
    },

    reloadGrid: function (hoaId) {
        this.reloadPasalHoaGrid(hoaId);
        this.reloadDocumentHoaGrid(hoaId);
    },

    reloadDocumentHoaGrid: function (hoaId) {
        var grid = this.getDocumentGridPanel();
        var store = grid.getStore();
        if (hoaId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.documentUrl + 'byHoa/' + hoaId,
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

    reloadPasalHoaGrid: function (hoaId) {
        var grid = this.getPasalGridPanel();
        var store = grid.getStore();
        if (hoaId) {
            var proxy = {
                type: 'ajax',
                pageParam: 'page.page',
                url: Ifuel.config.pasalUrl + 'simple/byHoa/' + hoaId,
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
        
        var form = this.getHoaFormPanelForm();
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
        var hoaFormPanel = this.getHoaFormPanel();
        hoaFormPanel.enable();
        this.getHoaTabPanel().setActiveTab(hoaFormPanel);

        this.getHoaPasalAyatPanel().enable();
    },
            
    onChangeBahasa: function (field, value, options) {
        var form = this.getHoaFormPanelForm();
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


