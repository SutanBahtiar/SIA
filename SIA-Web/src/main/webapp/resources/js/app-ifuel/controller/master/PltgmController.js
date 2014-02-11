/**
 * Created with IntelliJ IDEA.
 * User: BayuFrioGS
 * Date: 08/05/13
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.controller.master.PltgmController', {
    extend: 'Ext.app.Controller',
    allowWrite: true,
    views: [
        'master.pltgm.PltgmPanel',
        'master.pltgm.PltgmGridPanel',
        'master.pltgm.PltgmFormPanel',
        'master.region.RegionGridPanel',
        'master.region.RegionWindowChooser',
        'Ifuel.util.PDFViewerPanel'
    ],
    models: [],
    stores: [],
    refs: [
        {
            ref: 'pltgmTabPanel',
            selector: 'pltgmPanel tabpanel'
        },
        {
            ref: 'pltgmGridPanel',
            selector: 'pltgmPanel tabpanel pltgmGridPanel'
        },
        {
            ref: 'pltgmFormPanel',
            selector: 'pltgmPanel tabpanel pltgmFormPanel'
        },
        {
            ref: 'pltgmFormPanelForm',
            selector: 'pltgmPanel tabpanel pltgmFormPanel form'
        },
        {
            ref: 'regionWindowChooser',
            selector: 'regionWindowChooser[parentName=region]'
        }
    ],
    init: function() {
        this.control({
            'pltgmPanel tabpanel pltgmGridPanel': {
                itemdblclick: this.showPltgm,
                show: this.activatedTabGrid
            }
        });

        if (this.allowWrite) {
            this.control({
                'pltgmPanel tabpanel pltgmGridPanel': {
                    itemclick: this.enableButtonPltgm,
                    selectionchange: this.pltgmGridSelectionChange
                },
                'pltgmPanel > tabpanel > toolbar button[action=new]': {
                    click: this.createPltgm
                },
                'pltgmPanel > tabpanel > toolbar button[action=save]': {
                    click: this.savePltgm
                },
                'pltgmPanel > tabpanel > toolbar button[action=delete]': {
                    click: this.deletePltgm
                },
                'pltgmPanel > tabpanel > toolbar button[action=print]': {
                    click: this.printPltgm
                },
                'regionWindowChooser[parentName=region] regionGridPanel': {
                    itemdblclick: this.chooseRegion
                },
                'pltgmPanel form fieldcontainer[groupField=grpRegion] button[action=searchRegion]': {
                    click: this.showRegion
                }
            });
        } else {
            this.control({
                'pltgmPanel': {
                    afterrender: function(panel) {
                        panel.down('button[action=new]').setDisabled(true);
                        panel.down('button[action=delete]').setDisabled(true);
                    }
                }
            });
        }
    },
    showRegion: function(button) {
        var form = button.up('form');
        var regionWindowChooser = Ext.widget('regionWindowChooser', {parentName: 'region', parentForm: form});
    },
    chooseRegion: function(grid, record) {
        var form = grid.up('regionWindowChooser').parentForm;
        this._showValueRegion(form, record.data);
        this.getRegionWindowChooser().close();
    },
    _showValueRegion: function(form, region) {
        form.down('hiddenfield[name=regionId]').setValue(region.id);
        form.down('textfield[name=region]').setValue(region.region);
    },
    showPltgm: function(grid, record) {
        this.activatedTabForm();
        var form = this.getPltgmFormPanelForm();
        form.loadRecord(record);
        this._showValuePltgm(record.data);
    },
    activatedTabGrid: function() {
        this.getPltgmFormPanel().disable();
        this.getPltgmTabPanel().setActiveTab(this.getPltgmGridPanel());

        this.getPltgmTabPanel().down('button[action=save]').disable();
        this.getPltgmTabPanel().down('button[action=print]').enable();

        if (this.allowWrite) {
            this.getPltgmTabPanel().down('button[action=new]').enable();
        } else {
            this.getPltgmTabPanel().down('button[action=new]').disable();
        }
    },
    activatedTabForm: function() {
        this.getPltgmFormPanel().enable();
        this.getPltgmTabPanel().setActiveTab(this.getPltgmFormPanel());

        if (this.allowWrite) {
            this.getPltgmTabPanel().down('button[action=new]').enable();
            this.getPltgmTabPanel().down('button[action=save]').enable();
        } else {
            this.getPltgmTabPanel().down('button[action=new]').disable();
            this.getPltgmTabPanel().down('button[action=save]').disable();
        }
        this.getPltgmTabPanel().down('button[action=print]').disable();
    },
    _showValuePltgm: function(data) {
        var form = this.getPltgmFormPanelForm();
        console.info('_showValuePerson', data);
        form.down('hiddenfield[name=id]').setValue(data.id);
        form.down('hiddenfield[name=regionId]').setValue(data.tmRegion.id);
        form.down('textfield[name=region]').setValue(data.tmRegion.region);
    },
    _togglePltgmDeleteButton: function(enable) {
        if (enable) {
            this.getPltgmTabPanel().down('button[action=delete]').enable();
        } else {
            this.getPltgmTabPanel().down('button[action=delete]').disable();
        }
    },
    enableButtonPltgm: function(button, record) {
        this._togglePltgmDeleteButton(true);
    },
    pltgmGridSelectionChange: function(sel, selected) {
        if (selected[0]) {
            this._togglePltgmDeleteButton(true);
        } else {
            this._togglePltgmDeleteButton(false);
        }
    },
    createPltgm: function() {
        this._clearValuePltgm();
        this._togglePltgmDeleteButton(false);
        this.activatedTabForm();
    },
    _clearValuePltgm: function() {
        var form = this.getPltgmFormPanelForm();

        form.down('hiddenfield[name=id]').setValue(null);
        form.down('textfield[name=namaPltgm]').setValue(null);
        form.down('combobox[name=jenisPltgm]').setValue('PLTG');
        form.down('textfield[name=kapasitasProd]').setValue(null);
        form.down('textfield[name=namaLokasi]').setValue(null);
        form.down('textfield[name=alamatPltgm]').setValue(null);
        form.down('textfield[name=kotaPltgm]').setValue(null);
        form.down('textfield[name=provinsiPltgm]').setValue(null);
        form.down('textfield[name=kodePosPltgm]').setValue(null);
        form.down('hiddenfield[name=regionId]').setValue(null);
        form.down('textfield[name=region]').setValue(null);
        form.down('textfield[name=namaGm]').setValue(null);
        
        form.down('datefield[name=periodeAkhirGm]').setValue(null);
        form.down('textfield[name=namaMbprod]').setValue(null);
        form.down('datefield[name=periodeAkhirMbprod]').setValue(null);
        form.down('textfield[name=namaDmkit]').setValue(null);
        form.down('datefield[name=periodeAkhirDmkit]').setValue(null);
        
    },
    savePltgm: function(button) {
        this._savePltgm();
    },
    _savePltgm: function() {
        var me = this;
        var form = this.getPltgmFormPanelForm();
        var values = form.getValues();
        var record = form.getRecord();

        var waktuPeriodeAkhirGm = Ext.Date.parse(values.periodeAkhirGm, 'd F Y');
        var waktuPeriodeAkhirDmkit = Ext.Date.parse(values.periodeAkhirDmkit, 'd F Y');
        var waktuPeriodeAkhirMbprod = Ext.Date.parse(values.periodeAkhirMbprod, 'd F Y');

        var data = {
            id: record ? values.id : null,
            namaPltgm: values.namaPltgm,
            jenisPltgm: values.jenisPltgm,
            kapasitasProd: values.kapasitasProd,
            cod: true,
//            tanggalCod:
            namaLokasi: values.namaLokasi,
            alamatPltgm: values.alamatPltgm,
            kotaPltgm: values.kotaPltgm,
            provinsiPltgm: values.provinsiPltgm,
            kodePosPltgm: values.kodePosPltgm,
            
            tmRegion:{
                id:values.regionId
            },
            
            namaGm: values.namaGm,
            namaMbprod: values.namaMbprod,
            namaDmkit: values.namaDmkit,
    
            periodeAkhirGm: Ext.Date.format(waktuPeriodeAkhirGm, 'c'),
            periodeAkhirDmkit: Ext.Date.format(waktuPeriodeAkhirDmkit, 'c'),
            periodeAkhirMbprod: Ext.Date.format(waktuPeriodeAkhirMbprod, 'c')
        };

        if (form.getForm().isValid()) {
            if (data.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.pltgmUrl + record.data.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function(response, options) {
                        me.getPltgmGridPanel().getStore().reload();
                        console.info('ID PLTGM', record.data.id);
                        console.info(response.responseText);
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pembangkit');
                    },
                    failure: function(response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pembangkit');
                    }
                });
            } else {
                console.info('_savePltgm', data);
                Ext.Ajax.request({
                    url: Ifuel.config.pltgmUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function(response, options) {
                        me.getPltgmGridPanel().getStore().reload();
                        me._reshowValuePltgm(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pembangkit');
                    },
                    failure: function(response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Pembangkit');
                    }
                });
            }
        }
    },
    _reshowValuePltgm: function(url) {
        var me = this;
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response, options) {
                var data = Ext.JSON.decode(response.responseText);
                me._showValuePltgm(data);
            },
            failure: function(response, options) {

            }
        });
    },
    printPltgm: function() {
        var tab = this.getPltgmTabPanel();
        if (tab.items.length > 2) {
            window.open(Ifuel.config.pltgmReportUrl + "?type=pdf", "_blank");
        } else {
            tab.remove(2);
            var tabPrint = new Ifuel.util.PDFViewerPanel({
                src: Ifuel.config.pltgmReportUrl + "?type=pdf"
            });
            tab.add(tabPrint);
            tab.setActiveTab(tabPrint);
        }
    },
    deletePltgm: function() {
        var record = this.getPltgmGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.pltgmUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function(response, options) {
                    me.getPltgmGridPanel().getStore().reload();
                    me._clearValuePltgm();
                    me.getPltgmFormPanel().disable();
                    me.getPltgmTabPanel().setActiveTab(me.getPltgmGridPanel());
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Pembangkit');
                },
                failure: function(response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Pembangkit');
                }
            });
        }
    }
});
