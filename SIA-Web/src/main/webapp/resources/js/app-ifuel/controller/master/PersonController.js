/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 15/04/13
 * Time: 11:16
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.controller.master.PersonController', {
    extend: 'Ext.app.Controller',
    allowWrite: true,
    views: [
        'Ifuel.view.master.person.PersonPanel',
        'Ifuel.view.master.person.PersonGridPanel',
        'Ifuel.view.master.person.PersonFormPanel',
        'Ifuel.view.master.orgPln.OrgPlnWindowChooser',
        'Ifuel.view.master.pemasok.PemasokWindowChooser',
        'Ifuel.util.PDFViewerPanel'
    ],
    refs: [
        {
            ref: 'personTabPanel',
            selector: 'personPanel tabpanel'
        },
        {
            ref: 'personGridPanel',
            selector: 'personPanel tabpanel personGridPanel'
        },
        {
            ref: 'personFormPanel',
            selector: 'personPanel tabpanel personFormPanel'
        },
        {
            ref: 'personFormPanelForm',
            selector: 'personPanel tabpanel personFormPanel form'
        },
        {
            ref: 'orgPlnWindowChooser',
            selector: 'orgPlnWindowChooser[parentName=person]'
        },
        {
            ref: 'pemasokWindowChooser',
            selector: 'pemasokWindowChooser[parentName=person]'
        }
    ],
    init: function() {
        this.control({
            'personPanel tabpanel personGridPanel': {
                itemdblclick: this.showPerson,
                show: this.activatedTabGrid
            }
        });

        if (this.allowWrite) {
            this.control({
                'personPanel tabpanel personGridPanel': {
                    itemclick: this.enableButtonPerson,
                    selectionchange: this.personGridSelectionChange
                },
                'personPanel > tabpanel > toolbar button[action=new]': {
                    click: this.createPerson
                },
                'personPanel > tabpanel > toolbar button[action=save]': {
                    click: this.savePerson
                },
                'personPanel > tabpanel > toolbar button[action=delete]': {
                    click: this.deletePerson
                },
                'personPanel > tabpanel > toolbar button[action=print]': {
                    click: this.printPerson
                },
                'personFormPanel > form > combobox[name=tipePerson]': {
                    change: this.searchWindowChooserPref
                },
                'orgPlnWindowChooser[parentName=person] orgPlnGridPanel': {
                    itemdblclick: this.chooseOrgPln
                },
                'pemasokWindowChooser[parentName=person] pemasokGridPanel': {
                    itemdblclick: this.choosePemasok
                },
                'personFormPanel form fieldcontainer[groupField=grpOrganisasi] button[action=searchOrg]': {
                    click: this.showOrganisasi
                }
            });
        } else {
            this.control({
                'personPanel': {
                    afterrender: function(panel) {
                        panel.down('button[action=new]').setDisabled(true);
                        panel.down('button[action=delete]').setDisabled(true);
                    }
                }
            })
        }
    },
    showPerson: function(grid, record) {
        this.activatedTabForm();
        var form = this.getPersonFormPanelForm();
        form.loadRecord(record);
        this._showValuePerson(record.data);
    },
    activatedTabGrid: function() {
        this.getPersonFormPanel().disable();
        this.getPersonTabPanel().setActiveTab(this.getPersonGridPanel());

        this.getPersonTabPanel().down('button[action=save]').disable();
        this.getPersonTabPanel().down('button[action=print]').enable();
        if (this.allowWrite) {
            this.getPersonTabPanel().down('button[action=new]').enable();
        } else {
            this.getPersonTabPanel().down('button[action=new]').disable();
        }
    },
    activatedTabForm: function() {
        this.getPersonFormPanel().enable();
        this.getPersonTabPanel().setActiveTab(this.getPersonFormPanel());

        if (this.allowWrite) {
            this.getPersonTabPanel().down('button[action=new]').enable();
            this.getPersonTabPanel().down('button[action=save]').enable();
        } else {
            this.getPersonTabPanel().down('button[action=new]').disable();
            this.getPersonTabPanel().down('button[action=save]').disable();
        }
        this.getPersonTabPanel().down('button[action=print]').disable();
    },
    _showValuePerson: function(data) {
        var form = this.getPersonFormPanelForm();

        if (data.tmOrgPln) {
            this._showValueUnitPln(form, data.tmOrgPln);
            form.down('combobox[name=tipePerson]').setValue('PLN');
        } else if (data.tmPemasok) {
            this._showValuePemasok(form, data.tmPemasok);
            form.down('combobox[name=tipePerson]').setValue('PEMASOK');
        }

        form.down('hiddenfield[name=id]').setValue(data.id);
    },
    _showValueUnitPln: function(form, orgPln) {
        form.down('hiddenfield[name=organisasiId]').setValue(orgPln.id);
        form.down('textfield[name=organisasi]').setValue(orgPln.unitPln);
    },
    _showValuePemasok: function(form, pemasok) {
        form.down('hiddenfield[name=organisasiId]').setValue(pemasok.id);
        form.down('textfield[name=organisasi]').setValue(pemasok.namaPemasok);
    },
    enableButtonPerson: function(button, record) {
        this._togglePersonDeleteButton(true);
    },
    personGridSelectionChange: function(sel, selected) {
        if (selected[0]) {
            this._togglePersonDeleteButton(true);
        } else {
            this._togglePersonDeleteButton(false);
        }
    },
    _togglePersonDeleteButton: function(enable) {
        if (enable) {
            this.getPersonTabPanel().down('button[action=delete]').enable();
        } else {
            this.getPersonTabPanel().down('button[action=delete]').disable();
        }
    },
    createPerson: function() {
        this._clearValuePerson();
        this._togglePersonDeleteButton(false);
        this.activatedTabForm();
    },
    _clearValuePerson: function() {
        var form = this.getPersonFormPanelForm();

        form.down('hiddenfield[name=id]').setValue(null);
        form.down('hiddenfield[name=organisasiId]').setValue(null);
        form.down('combobox[name=tipePerson]').setValue('PLN');
        form.down('textfield[name=nama]').setValue(null);
        form.down('textfield[name=nipPerson]').setValue(null);
        form.down('textfield[name=jabatan]').setValue(null);
        form.down('textfield[name=noTelp]').setValue(null);
        form.down('textfield[name=email]').setValue(null);
        form.down('textfield[name=organisasi]').setValue(null);
    },
    savePerson: function(button) {
        this._savePerson();
    },
    _savePerson: function() {
        var me = this;
        var form = this.getPersonFormPanelForm();
        var values = form.getValues();
        var record = form.getRecord();

        var data = {
            id: record ? values.id : null,
            nama: values.nama,
            nipPerson: values.nipPerson,
            jabatan: values.jabatan,
            noTelp: values.noTelp,
            email: values.email,
            tmOrgPln: (values.tipePerson == 'PLN') ? {
                id: values.organisasiId
            } : null,
            tmPemasok: (values.tipePerson == 'PEMASOK') ? {
                id: values.organisasiId
            } : null
        };

        if (form.getForm().isValid()) {
            if (data.id) {
                Ext.Ajax.request({
                    url: Ifuel.config.personUrl + record.data.id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function(response, options) {
                        me.getPersonGridPanel().getStore().reload();
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Person');
                    },
                    failure: function(response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Person');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.personUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode(data),
                    success: function(response, options) {
                        me.getPersonGridPanel().getStore().reload();
                        me._reshowValuePerson(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Person');
                    },
                    failure: function(response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Person');
                    }
                });
            }
        }
    },
    _reshowValuePerson: function(url) {
        var me = this;
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response, options) {
                var data = Ext.JSON.decode(response.responseText);
                me._showValuePerson(data);
            },
            failure: function(response, options) {

            }
        });
    },
    deletePerson: function(button) {
        var record = this.getPersonGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url: Ifuel.config.personUrl + record.data.id,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function(response, options) {
                    me.getPersonGridPanel().getStore().reload();
                    me._clearValuePerson();
                    me.getPersonFormPanel().disable();
                    me.getPersonTabPanel().setActiveTab(me.getPersonGridPanel());
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Person');
                },
                failure: function(response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Person');
                }
            });
        }
    },
    searchWindowChooserPref: function(combo, newVal) {
        var form = combo.up('form');

        form.down('hiddenfield[name=organisasiId]').setValue(null);
        form.down('textfield[name=organisasi]').setValue(null);

        if (newVal == 'PLN') {
            form.down('textfield[name=organisasi]').blankText = 'Unit PLN wajib dipilih';
            form.down('textfield[name=organisasi]').validate();
        } else {
            form.down('textfield[name=organisasi]').blankText = 'Pemasok wajib dipilih';
            form.down('textfield[name=organisasi]').validate();
        }

    },
    showOrganisasi: function(button) {
        var form = button.up('form');
        var tipePerson = form.down('combobox[name=tipePerson]').getValue();

        if (tipePerson == 'PLN') {
            var orgPlnWindowChooser = Ext.widget('orgPlnWindowChooser', {parentName: 'person', parentForm: form});
        } else if (tipePerson == 'PEMASOK') {
            var pemasokWindowChooser = Ext.widget('pemasokWindowChooser', {parentName: 'person', parentForm: form});
        }
    },
    chooseOrgPln: function(grid, record) {
        var form = grid.up('orgPlnWindowChooser').parentForm;
        this._showValueUnitPln(form, record.data);
        this.getOrgPlnWindowChooser().close();
    },
    choosePemasok: function(grid, record) {
        var form = grid.up('pemasokWindowChooser').parentForm;
        this._showValuePemasok(form, record.data);
        this.getPemasokWindowChooser().close();
    },
    printPerson: function() {
        var tab = this.getPersonTabPanel();
        if (tab.items.length > 2) {
            window.open(Ifuel.config.personReportUrl + "?type=pdf", "_blank");
        } else {
            tab.remove(2);
            var tabPrint = new Ifuel.util.PDFViewerPanel({
                src: Ifuel.config.personReportUrl + "?type=pdf"
            });
            tab.add(tabPrint);
            tab.setActiveTab(tabPrint);
        }
    }
})