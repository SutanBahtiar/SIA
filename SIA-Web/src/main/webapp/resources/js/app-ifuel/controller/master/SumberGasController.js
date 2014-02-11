/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 11/04/13
 * Time: 9:06
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.controller.master.SumberGasController', {
    extend: 'Ext.app.Controller',
    allowWrite: true,
    views: [
        'Ifuel.view.master.sumberGas.SumberGasPanel',
        'Ifuel.view.master.sumberGas.SumberGasGridPanel',
        'Ifuel.util.PDFViewerPanel'
    ],
    refs: [
        {
            ref: 'sumberGasTabPanel',
            selector: 'sumberGasPanel tabpanel'
        },
        {
            ref: 'sumberGasGridPanel',
            selector: 'sumberGasPanel tabpanel sumberGasGridPanel'
        },
        {
            ref: 'sumberGasFormPanel',
            selector: 'sumberGasPanel tabpanel sumberGasFormPanel'
        },
        {
            ref: 'sumberGasFormPanelForm',
            selector: 'sumberGasPanel tabpanel sumberGasFormPanel form'
        }
    ],
    init: function() {
        this.control({
            'sumberGasPanel tabpanel sumberGasGridPanel': {
                itemdblclick: this.showSumberGas,
                show: this.activatedTabGrid
            }
        });

        if (this.allowWrite) {
            this.control({
                'sumberGasPanel tabpanel sumberGasGridPanel': {
                    itemclick: this.enableButtonSumberGas,
                    selectionchange: this.sumberGasGridSelectionChange
                },
                'sumberGasPanel > tabpanel > toolbar button[action=new]': {
                    click: this.createSumberGas
                },
                'sumberGasPanel > tabpanel > toolbar button[action=save]': {
                    click: this.saveSumberGas
                },
                'sumberGasPanel > tabpanel > toolbar button[action=delete]': {
                    click: this.deleteSumberGas
                },
                'sumberGasPanel > tabpanel > toolbar button[action=print]': {
                    click: this.printSumberGas
                }
            });
        } else {
            this.control({
                'sumberGasPanel': {
                    afterrender: function(panel) {
                        panel.down('button[action=new]').setDisabled(true);
                        panel.down('button[action=delete]').setDisabled(true);
                    }
                }
            });
        }
    },
    showSumberGas: function(grid, record) {
        this.activatedTabForm();
        var form = this.getSumberGasFormPanelForm();
        form.loadRecord(record);
        this._showValueSumberGas(record.data);
    },
    activatedTabGrid: function() {
        this.getSumberGasFormPanel().disable();
        this.getSumberGasTabPanel().setActiveTab(this.getSumberGasGridPanel());

        this.getSumberGasTabPanel().down('button[action=save]').disable();
        this.getSumberGasTabPanel().down('button[action=print]').enable();

        if (this.allowWrite) {
            this.getSumberGasTabPanel().down('button[action=new]').enable();
        } else {
            this.getSumberGasTabPanel().down('button[action=new]').disable();
        }
    },
    activatedTabForm: function() {
        this.getSumberGasFormPanel().enable();
        this.getSumberGasTabPanel().setActiveTab(this.getSumberGasFormPanel());

        if (this.allowWrite) {
            this.getSumberGasTabPanel().down('button[action=new]').enable();
            this.getSumberGasTabPanel().down('button[action=save]').enable();
        } else {
            this.getSumberGasTabPanel().down('button[action=new]').disable();
            this.getSumberGasTabPanel().down('button[action=save]').disable();
        }
        this.getSumberGasTabPanel().down('button[action=print]').disable();
    },
    _showValueSumberGas: function(data) {
        var form = this.getSumberGasFormPanelForm();
        console.info('_showValueSumberGas', data);

        form.down('hiddenfield[name=id]').setValue(data.id);
    },
    enableButtonSumberGas: function(button, record) {
        this._toggleSumberGasDeleteButton(true);
    },
    sumberGasGridSelectionChange: function(sel, selected) {
        if (selected[0]) {
            this._toggleSumberGasDeleteButton(true);
        } else {
            this._toggleSumberGasDeleteButton(false);
        }
    },
    _toggleSumberGasDeleteButton: function(enable) {
        if (enable) {
            this.getSumberGasTabPanel().down('button[action=delete]').enable();
        } else {
            this.getSumberGasTabPanel().down('button[action=delete]').disable();
        }
    },
    createSumberGas: function() {
        this._clearValueSumberGas();
        this._toggleSumberGasDeleteButton(false);
        this.activatedTabForm();
    },
    _clearValueSumberGas: function() {
        var form = this.getSumberGasFormPanelForm();

        form.down('hiddenfield[name=id]').setValue(null);
        form.down('textfield[name=namaSumberGas]').setValue(null);
        form.down('textfield[name=lokasi]').setValue(null);
        form.down('textfield[name=jenisGas]').setValue(null);
        form.down('textfield[name=perkiraanVol]').setValue(null);
        form.down('textfield[name=longitude]').setValue(null);
        form.down('textfield[name=latitude]').setValue(null);
    },
    saveSumberGas: function() {
        var me = this;
        var form = this.getSumberGasFormPanelForm();
        var values = form.getValues();
        var record = form.getRecord();

        var data = {
            id: record ? values.id : null,
            namaSumberGas: values.namaSumberGas,
            lokasi: values.lokasi,
            jenisGas: values.jenisGas,
            perkiraanVol: values.perkiraanVol,
            longitude: values.longitude,
            latitude: values.latitude
        };

        if (form.getForm().isValid()) {
            if (data.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.sumberGasUrl + record.data.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function(response, options) {
                        me.getSumberGasGridPanel().getStore().reload();
                        console.info('ID Sumber Gas', record.data.id);
                        console.info(response.responseText);
//                        me._reshowValueSumberGas(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Sumber Gas');
                    },
                    failure: function(response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'SumberGas');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.sumberGasUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function(response, options) {
                        me.getSumberGasGridPanel().getStore().reload();
                        me._reshowValueSumberGas(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Sumber Gas');
                    },
                    failure: function(response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Sumber Gas');
                    }
                });
            }
        }
    },
    _reshowValueSumberGas: function(url) {
        var me = this;
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response, options) {
                var data = Ext.JSON.decode(response.responseText);
                me._showValueSumberGas(data);
            },
            failure: function(response, options) {

            }
        });
    },
    deleteSumberGas: function(button) {
        var record = this.getSumberGasGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.sumberGasUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function(response, options) {
                    me.getSumberGasGridPanel().getStore().reload();
                    me._clearValueSumberGas();
                    me.getSumberGasFormPanel().disable();
                    me.getSumberGasTabPanel().setActiveTab(me.getSumberGasGridPanel());
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Sumber Gas');
                },
                failure: function(response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Sumber Gas');
                }
            });
        }
    },
    printSumberGas: function() {
        var tab = this.getSumberGasTabPanel();
        if (tab.items.length > 2) {
            window.open(Ifuel.config.sumberGasReportUrl + "?type=pdf", "_blank");
        } else {
            tab.remove(2);
            var tabPrint = new Ifuel.util.PDFViewerPanel({
                src: Ifuel.config.sumberGasReportUrl + "?type=pdf"
            });
            tab.add(tabPrint);
            tab.setActiveTab(tabPrint);
        }
    }
})