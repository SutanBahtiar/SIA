/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 26/03/13
 * Time: 10:30
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.controller.master.PemasokController', {
    extend: 'Ext.app.Controller',
    allowWrite: true,
    views: [
        'Ifuel.view.master.pemasok.PemasokPanel',
        'Ifuel.view.master.pemasok.PemasokGridPanel',
        'Ifuel.util.PDFViewerPanel'
    ],
    refs: [
        {
            ref: 'pemasokTabPanel',
            selector: 'pemasokPanel tabpanel'
        },
        {
            ref: 'pemasokGridPanel',
            selector: 'pemasokPanel tabpanel pemasokGridPanel'
        },
        {
            ref: 'pemasokFormPanel',
            selector: 'pemasokPanel tabpanel pemasokFormPanel'
        },
        {
            ref: 'pemasokFormPanelForm',
            selector: 'pemasokPanel tabpanel pemasokFormPanel form'
        }
    ],
    init: function() {
        this.control({
            'pemasokPanel tabpanel pemasokGridPanel': {
                itemdblclick: this.showPemasok,
                show: this.activatedTabGrid
            }
        });

        if (this.allowWrite) {
            this.control({
                'pemasokPanel tabpanel pemasokGridPanel': {
                    itemclick: this.enableButtonPemasok,
                    selectionchange: this.pemasokGridSelectionChange
                },
                'pemasokPanel > tabpanel > toolbar button[action=new]': {
                    click: this.createPemasok
                },
                'pemasokPanel > tabpanel > toolbar button[action=save]': {
                    click: this.savePemasok
                },
                'pemasokPanel > tabpanel > toolbar button[action=delete]': {
                    click: this.deletePemasok
                },
                'pemasokPanel > tabpanel > toolbar button[action=print]': {
                    click: this.printPemasok
                }
            });
        } else {
            this.control({
                'pemasokPanel': {
                    afterrender: function(panel) {
                        panel.down('button[action=new]').setDisabled(true);
                        panel.down('button[action=delete]').setDisabled(true);
                    }
                }
            });
        }
    },
    //Function Pemasok

    showPemasok: function(grid, record) {
        this.activatedTabForm();
        var form = this.getPemasokFormPanelForm();
        form.loadRecord(record);
        this._showValuePemasok(record.data);
    },
    activatedTabGrid: function() {
        this.getPemasokFormPanel().disable();
        this.getPemasokTabPanel().setActiveTab(this.getPemasokGridPanel());

        this.getPemasokTabPanel().down('button[action=save]').disable();
        this.getPemasokTabPanel().down('button[action=print]').enable();
        if (this.allowWrite) {
            this.getPemasokTabPanel().down('button[action=new]').enable();
        } else {
            this.getPemasokTabPanel().down('button[action=new]').disable();
        }
    },
    activatedTabForm: function() {
        this.getPemasokFormPanel().enable();
        this.getPemasokTabPanel().setActiveTab(this.getPemasokFormPanel());

        if (this.allowWrite) {
            this.getPemasokTabPanel().down('button[action=new]').enable();
            this.getPemasokTabPanel().down('button[action=save]').enable();
        } else {
            this.getPemasokTabPanel().down('button[action=new]').disable();
            this.getPemasokTabPanel().down('button[action=save]').disable();
        }
        this.getPemasokTabPanel().down('button[action=print]').disable();
    },
    _showValuePemasok: function(data) {
        var form = this.getPemasokFormPanelForm();
        console.info('_showValuePemasok', data);

        form.down('hiddenfield[name=id]').setValue(data.id);
    },
    //Function button Pemasok

    enableButtonPemasok: function(button, record) {
        this._togglePemasokDeleteButton(true);
    },
    pemasokGridSelectionChange: function(sel, selected) {
        if (selected[0]) {
            this._togglePemasokDeleteButton(true);
        } else {
            this._togglePemasokDeleteButton(false);
        }
    },
    _togglePemasokDeleteButton: function(enable) {
        if (enable) {
            this.getPemasokTabPanel().down('button[action=delete]').enable();
        } else {
            this.getPemasokTabPanel().down('button[action=delete]').disable();
        }
    },
    //Function buat Pemasok Baru

    createPemasok: function() {
        this._clearValuePemasok();
        this._togglePemasokDeleteButton(false);
        this.activatedTabForm();
    },
    _clearValuePemasok: function() {
        var form = this.getPemasokFormPanelForm();

        //Left form
        form.down('hiddenfield[name=id]').setValue(null);
        form.down('textfield[name=namaPemasok]').setValue(null);
        form.down('textfield[name=inisialPemasok]').setValue(null);
        form.down('textfield[name=alamatPemasok]').setValue(null);
        form.down('textfield[name=kotaPemasok]').setValue(null);
        form.down('textfield[name=provinsiPemasok]').setValue(null);
        form.down('textfield[name=kodePosPemasok]').setValue(null);

        //Right form
        form.down('textfield[name=emailPemasok]').setValue(null);
        form.down('textfield[name=telpPemasok]').setValue(null);
        form.down('textfield[name=picPemasok]').setValue(null);
        form.down('textfield[name=emailPic]').setValue(null);
        form.down('textfield[name=faxPemasok]').setValue(null);
    },
    //Function save Pemasok

    savePemasok: function(button) {
        this._savePemasok();
    },
    _savePemasok: function() {
        var me = this;
        var form = this.getPemasokFormPanelForm();
        var values = form.getValues();
        var record = form.getRecord();

        var data = {
            id: record ? values.id : null,
            namaPemasok: values.namaPemasok,
            inisialPemasok: values.inisialPemasok,
            alamatPemasok: values.alamatPemasok,
            kotaPemasok: values.kotaPemasok,
            provinsiPemasok: values.provinsiPemasok,
            kodePosPemasok: values.kodePosPemasok,
            emailPemasok: values.emailPemasok,
            telpPemasok: values.telpPemasok,
            faxPemasok: values.faxPemasok,
            picPemasok: values.picPemasok,
            emailPic: values.emailPic
        };

        if (form.getForm().isValid()) {
            if (data.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.pemasokUrl + record.data.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function(response, options) {
                        me.getPemasokGridPanel().getStore().reload();
                        console.info('ID Pemasok', record.data.id);
                        console.info(response.responseText);
                        //Belum bisa reshow, response header location mengirimkan ID double
                        //me._reshowValuePemasok(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pemasok');
                    },
                    failure: function(response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pemasok');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.pemasokUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function(response, options) {
                        me.getPemasokGridPanel().getStore().reload();
                        //Belum bisa reshow, response header location mengirimkan ID double
                        //me._reshowValuePemasok(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pemasok');
                    },
                    failure: function(response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pemasok');
                    }
                });
            }
        }
    },
    _reshowValuePemasok: function(url) {
        var me = this;
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response, options) {
                var data = Ext.JSON.decode(response.responseText);
                me._showValuePemasok(data);
            },
            failure: function(response, options) {

            }
        });
    },
    //Function hapus pemasok

    deletePemasok: function(button) {
        var record = this.getPemasokGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.pemasokUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function(response, options) {
                    me.getPemasokGridPanel().getStore().reload();
                    me._clearValuePemasok();
                    me.getPemasokFormPanel().disable();
                    me.getPemasokTabPanel().setActiveTab(me.getPemasokGridPanel());
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Pemasok');
                },
                failure: function(response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Pemasok');
                }
            });
        }
    },
    printPemasok: function() {
        var tab = this.getPemasokTabPanel();
        if (tab.items.length > 2) {
            window.open(Ifuel.config.pemasokReportUrl + "?type=pdf", "_blank");
        } else {
            tab.remove(2);
            var tabPrint = new Ifuel.util.PDFViewerPanel({
                src: Ifuel.config.pemasokReportUrl + "?type=pdf"
            });
            tab.add(tabPrint);
            tab.setActiveTab(tabPrint);
        }
    }
});
