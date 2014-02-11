/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 10/04/13
 * Time: 9:56
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.controller.master.OrgPlnController', {
    extend: 'Ext.app.Controller',
    allowWrite: true,
    views: [
        'Ifuel.view.master.orgPln.OrgPlnPanel',
        'Ifuel.view.master.orgPln.OrgPlnGridPanel',
        'Ifuel.util.PDFViewerPanel'
    ],
    refs: [
        {
            ref: 'orgPlnTabPanel',
            selector: 'orgPlnPanel tabpanel'
        },
        {
            ref: 'orgPlnGridPanel',
            selector: 'orgPlnPanel tabpanel orgPlnGridPanel'
        },
        {
            ref: 'orgPlnFormPanel',
            selector: 'orgPlnPanel tabpanel orgPlnFormPanel'
        },
        {
            ref: 'orgPlnFormPanelForm',
            selector: 'orgPlnPanel tabpanel orgPlnFormPanel form'
        },
        {
            ref: 'orgPlnButton',
            selector: 'orgPlnPanel tabpanel #printButton'
        }
    ],
    init: function() {
        this.control({
            'orgPlnPanel tabpanel orgPlnGridPanel': {
                itemdblclick: this.showOrgPln,
                show: this.activatedTabGrid
            }
        });

        if (this.allowWrite) {
            this.control({
                'orgPlnPanel tabpanel orgPlnGridPanel': {
                    itemclick: this.enableButtonOrgPln,
                    selectionchange: this.orgPlnGridSelectionChange
                },
                'orgPlnPanel > tabpanel > toolbar button[action=new]': {
                    click: this.createOrgPln
                },
                'orgPlnPanel > tabpanel > toolbar button[action=save]': {
                    click: this.saveOrgPln
                },
                'orgPlnPanel > tabpanel > toolbar button[action=delete]': {
                    click: this.deleteOrgPln
                },
                'orgPlnPanel > tabpanel > toolbar button[action=print]': {
                    click: this.printOrgPln
                }
            });
        } else {
            this.control({
                'orgPlnPanel': {
                    afterrender: function(panel) {
                        panel.down('button[action=new]').setDisabled(true);
                        panel.down('button[action=delete]').setDisabled(true);
                    }
                }
            });
        }
    },
    showOrgPln: function(grid, record) {
        this.activatedTabForm();
        var form = this.getOrgPlnFormPanelForm();
        form.loadRecord(record);
        this._showValueOrgPln(record.data);
    },
    activatedTabGrid: function() {
        this.getOrgPlnFormPanel().disable();
        this.getOrgPlnTabPanel().setActiveTab(this.getOrgPlnGridPanel());

        this.getOrgPlnTabPanel().down('button[action=save]').disable();
        this.getOrgPlnTabPanel().down('button[action=print]').enable();
        if (this.allowWrite) {
            this.getOrgPlnTabPanel().down('button[action=new]').enable();
        } else {
            this.getOrgPlnTabPanel().down('button[action=new]').disable();
        }
    },
    activatedTabForm: function() {
        this.getOrgPlnFormPanel().enable();
        this.getOrgPlnTabPanel().setActiveTab(this.getOrgPlnFormPanel());

        if (this.allowWrite) {
            this.getOrgPlnTabPanel().down('button[action=new]').enable();
            this.getOrgPlnTabPanel().down('button[action=save]').enable();
        } else {
            this.getOrgPlnTabPanel().down('button[action=new]').disable();
            this.getOrgPlnTabPanel().down('button[action=save]').disable();
        }
        this.getOrgPlnTabPanel().down('button[action=print]').disable();
    },
    _showValueOrgPln: function(data) {
        var form = this.getOrgPlnFormPanelForm();
        console.info('_showValueOrgPln', data);

        form.down('hiddenfield[name=id]').setValue(data.id);
    },
    enableButtonOrgPln: function(button, record) {
        this._toggleOrgPlnDeleteButton(true);
    },
    orgPlnGridSelectionChange: function(sel, selected) {
        if (selected[0]) {
            this._toggleOrgPlnDeleteButton(true);
        } else {
            this._toggleOrgPlnDeleteButton(false);
        }
    },
    _toggleOrgPlnDeleteButton: function(enable) {
        if (enable) {
            this.getOrgPlnTabPanel().down('button[action=delete]').enable();
        } else {
            this.getOrgPlnTabPanel().down('button[action=delete]').disable();
        }
    },
    createOrgPln: function() {
        this._clearValueOrgPln();
        this._toggleOrgPlnDeleteButton(false);
        this.activatedTabForm();
    },
    _clearValueOrgPln: function() {
        var form = this.getOrgPlnFormPanelForm();

        form.down('hiddenfield[name=id]').setValue(null);
        form.down('textfield[name=unitPln]').setValue(null);
        form.down('textfield[name=inisialUnit]').setValue(null);
        form.down('textfield[name=noTelpUnit]').setValue(null);
        form.down('textfield[name=emailUnit]').setValue(null);
        form.down('textfield[name=faxUnit]').setValue(null);
        form.down('textfield[name=alamatUnit]').setValue(null);
        form.down('textfield[name=kotaUnit]').setValue(null);
        form.down('textfield[name=provinsiUnit]').setValue(null);
        form.down('textfield[name=kodeposUnit]').setValue(null);
        form.down('textfield[name=namaGm]').setValue(null);
    },
    saveOrgPln: function(button) {
        this._saveOrgPln();
    },
    _saveOrgPln: function() {
        var me = this;
        var form = this.getOrgPlnFormPanelForm();
        var values = form.getValues();
        var record = form.getRecord();

        var data = {
            id: record ? values.id : null,
            unitPln: values.unitPln,
            inisialUnit: values.inisialUnit,
            noTelpUnit: values.noTelpUnit,
            emailUnit: values.emailUnit,
            faxUnit: values.faxUnit,
            alamatUnit: values.alamatUnit,
            kotaUnit: values.kotaUnit,
            provinsiUnit: values.provinsiUnit,
            kodeposUnit: values.kodeposUnit,
            namaGm: values.namaGm
        };

        if (form.getForm().isValid()) {
            if (data.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.orgPlnUrl + record.data.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function(response, options) {
                        me.getOrgPlnGridPanel().getStore().reload();
                        console.info('ID OrgPln', record.data.id);
                        console.info(response.responseText);
//                        me._reshowValueOrgPln(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Unit PLN');
                    },
                    failure: function(response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Unit PLN');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.orgPlnUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function(response, options) {
                        me.getOrgPlnGridPanel().getStore().reload();
                        me._reshowValueOrgPln(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Unit PLN');
                    },
                    failure: function(response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Unit PLN');
                    }
                });
            }
        }
    },
    _reshowValueOrgPln: function(url) {
        var me = this;
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response, options) {
                var data = Ext.JSON.decode(response.responseText);
                me._showValueOrgPln(data);
            },
            failure: function(response, options) {

            }
        });
    },
    deleteOrgPln: function(button) {
        var record = this.getOrgPlnGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.orgPlnUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function(response, options) {
                    me.getOrgPlnGridPanel().getStore().reload();
                    me._clearValueOrgPln();
                    me.getOrgPlnFormPanel().disable();
                    me.getOrgPlnTabPanel().setActiveTab(me.getOrgPlnGridPanel());
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Unit PLN');
                },
                failure: function(response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Unit PLN');
                }
            });
        }
    },
    printOrgPln: function() {
        var tab = this.getOrgPlnTabPanel();
        if (tab.items.length > 2) {
            window.open(Ifuel.config.orgPlnReportUrl + "?type=pdf", "_blank");
        } else {
            tab.remove(2);
            var tabPrint = new Ifuel.util.PDFViewerPanel({
                src: Ifuel.config.orgPlnReportUrl + "?type=pdf"
            });
            tab.add(tabPrint);
            tab.setActiveTab(tabPrint);
        }
    }
});