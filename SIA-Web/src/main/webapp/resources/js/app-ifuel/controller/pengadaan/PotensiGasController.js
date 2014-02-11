Ext.define('Ifuel.controller.pengadaan.PotensiGasController', {
    extend:'Ext.app.Controller',
    allowWrite:true,

    views:[
        'pengadaan.potensiGas.PotensiGasPanel',
        'perencanaan.dokPotensiGas.DokPotensiGasWindow',
        'master.pemasok.PemasokWindowChooser',
        'master.sumberGas.SumberGasWindowChooser',
        'master.pltgm.PltgmWindowChooser',
        'pengadaan.potensiGas.PotensiGasChangeStatusWindow'
    ],
    models:[],
    stores:[],
    data  :null,

    refs:[
        {
            ref:'statusPotensiGasTabPanel',
            selector:'pengadaanPotensiGasPanel tabpanel'
        },
        {
            ref:'statusPotensiGasGridPanel',
            selector:'pengadaanPotensiGasPanel tabpanel statusPotensiGasGridPanel'
        },
        {
            ref:'statusPotensiGasFormPanel',
            selector:'pengadaanPotensiGasPanel tabpanel statusPotensiGasFormPanel'
        },
        {
            ref:'statusPotensiGasFormPanelForm',
            selector:'pengadaanPotensiGasPanel tabpanel statusPotensiGasFormPanel form'
        },
        {
            ref:'dokPotensiGasGridPanel',
            selector:'pengadaanPotensiGasPanel tabpanel statusPotensiGasFormPanel dokPotensiGasGridPanel'
        },
        {
            ref:'dokPotensiGasWindow',
            selector:'dokPotensiGasWindow'
        },
        {
            ref:'dokPotensiGasWindowForm',
            selector:'dokPotensiGasWindow form'
        },
        {
            ref: 'pemasokWindowChooser',
            selector:'pemasokWindowChooser[parentName=potensiGas]'
        },
        {
            ref: 'sumberGasWindowChooser',
            selector: 'sumberGasWindowChooser[parentName=potensiGas]'
        },
        {
            ref: 'pltgmWindowChooser',
            selector: 'pltgmWindowChooser[parentName=potensiGas]'
        },
        {
            ref:'potensiGasChangeStatusWindow',
            selector:'potensiGasChangeStatusWindow[parentName=potensiGas]'
        },
    ],

    init:function () {
        this.control({
            'pengadaanPotensiGasPanel tabpanel statusPotensiGasGridPanel':{
                itemdblclick:this.showStatusPotensiGas ,
                show:this.activatedTabGrid,
                itemclick:this.checkData,
                selectionchange:this.potensiGasGridSelectionChange
            },
            'pengadaanPotensiGasPanel tabpanel statusPotensiGasFormPanel dokPotensiGasGridPanel':{
                itemdblclick:this.showDokPotensiGas
            }
            
        });
        if (this.allowWrite) {
            this.control({
                'pengadaanPotensiGasPanel tabpanel statusPotensiGasFormPanel dokPotensiGasGridPanel':{
                    selectionchange:this.dokPotensiGasSelectionChange
                },
                'pengadaanPotensiGasPanel tabpanel statusPotensiGasFormPanel dokPotensiGasGridPanel button[action=new]':{
                    click:this.createDokPotensiGas
                },
                'pengadaanPotensiGasPanel tabpanel statusPotensiGasFormPanel dokPotensiGasGridPanel button[action=delete]':{
                    click:this.deleteDokPotensiGas
                },
                'pengadaanPotensiGasPanel tabpanel button[action=changestatus]':{
                    click:this.showChangeStatusDialog

                },
                'dokPotensiGasWindow button[action=save]':{
                    click:this.saveDokPotensiGas
                },

                //add for presentation use
                'pengadaanPotensiGasPanel > tabpanel > toolbar button[action=new]':{
                    click:this.createPotensiGas
                },

                'pengadaanPotensiGasPanel > tabpanel > toolbar button[action=save]':{
                    click:this.savePotensiGas
                },

                'pengadaanPotensiGasPanel > tabpanel > toolbar button[action=changestatus]':{
                    click:this.changeStatusPotensiGas    
                },

                'pengadaanPotensiGasPanel tabpanel form fieldcontainer[groupField=grpPemasok] button[action=searchPemasok]':{
                    click:this.showPemasok
                },

                'pemasokWindowChooser[parentName=potensiGas] pemasokGridPanel':{
                    itemdblclick:this.choosePemasok
                },

                'pengadaanPotensiGasPanel tabpanel form fieldcontainer[groupField=grpSumberGas] button[action=searchSumberGas]':{
                    click:this.showSumberGas
                },

                'sumberGasWindowChooser[parentName=potensiGas] sumberGasGridPanel':{
                    itemdblclick:this.chooseSumberGas
                },
                'pengadaanPotensiGasPanel tabpanel form fieldcontainer[groupField=grpPltgm] button[action=searchPltgm]':{
                    click:this.showPltgm
                },
                'pltgmWindowChooser[parentName=potensiGas] pltgmGridPanel':{
                    itemdblclick:this.choosePltgm
                },
                'potensiGasChangeStatusWindow[parentName=potensiGas] button[action=save]':{
                    click:this.saveChangeStatusPotensiGas
                }
            });
        } else {
            this.control({
                'pengadaanPotensiGasPanel tabpanel statusPotensiGasFormPanel dokPotensiGasGridPanel':{
                    afterrender:function (me) {
                        me.down("button[action=new]").setDisabled(true);
                        me.down("button[action=delete]").setDisabled(true);
                    }
                },
                'dokPotensiGasWindow':{
                    show:function (me) {
                        me.down("button[action=save]").setDisabled(true);
                    }
                }
            });
        }
    },

    showStatusPotensiGas:function (grid, record) {
        this.activatedTabForm();
        var form = this.getStatusPotensiGasFormPanelForm();
        form.loadRecord(record);
        var data = record.data;

        var store = this.getDokPotensiGasGridPanel().getStore();
        var proxy = {
            type:'ajax',
            pageParam:'page.page',
            url:Ifuel.config.dokPotensiGasUrl + 'byPotensiGas/' + data.trPotensiGas.id,
            reader:{
                type:'json',
                root:'content',
                totalProperty:'totalElements'
            }
        };
        store.setProxy(proxy);
        store.loadPage(1);

        form.down('textfield[name=statusPotensiGas]').setValue(data.tmStatusKronologis.namaStatus);
        form.down('textfield[name=namaSumberGas]').setValue(data.trPotensiGas.tmSumberGas.namaSumberGas);
        form.down('textfield[name=namaPemasok]').setValue(data.trPotensiGas.tmPemasok.namaPemasok);
        form.down('textfield[name=lokasiSumberGas]').setValue(data.trPotensiGas.tmSumberGas.lokasi);
        form.down('textfield[name=jenisGas]').setValue(data.trPotensiGas.jenisGas);
        form.down('textfield[name=perkiraanVolGas]').setValue(data.trPotensiGas.tmSumberGas.perkiraanVol);
        form.down('textfield[name=namaPltgm]').setValue(data.trPotensiGas.tmPltgm.namaPltgm);
        form.down('textfield[name=namaLokasi]').setValue(data.trPotensiGas.tmPltgm.namaLokasi);
        form.down('textfield[name=kapasitasProd]').setValue(data.trPotensiGas.tmPltgm.kapasitasProd);
        form.down('datefield[name=tanggalCod]').setValue(new Date(data.trPotensiGas.tmPltgm.tanggalCod));

        //Tambah validasi button

    },

    showDokPotensiGas:function (o, record) {
        window.open(Ifuel.config.dokPotensiGasUrl + 'download/' + record.data.id);
    },

    dokPotensiGasSelectionChange:function (sel, selected) {
        if (selected[0]) {
            this._toggleDokPotensiGasDeleteButton(true);
        } else {
            this._toggleDokPotensiGasDeleteButton(false);
        }
    },

    createDokPotensiGas:function () {
        Ext.widget('dokPotensiGasWindow');
        var record = this.getStatusPotensiGasGridPanel().getSelectionModel().getSelection()[0];
        this.getDokPotensiGasWindowForm().down('hiddenfield[name=idTrPotensiGas]').setValue(record.data.trPotensiGas.id);
    },

    deleteDokPotensiGas:function (sel, selected) {
        var record = this.getDokPotensiGasGridPanel().getSelectionModel().getSelection()[0];
        var me = this;
        if (record) {
            Ext.Ajax.request({
                url:Ifuel.config.dokPotensiGasUrl + record.data.id,
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                success:function (response, options) {
                    me._doGridDokPotensiGasRefresh();
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Dokumen Potensi Gas');
                },
                failure:function (response, options) {
                    Ifuel.util.MessageBox.showMessageBoxDelete(response, options, 'Dokumen Potensi Gas');
                }
            });
        }
    },

    saveDokPotensiGas:function (button) {
        var me = this;
        var form = this.getDokPotensiGasWindowForm().getForm();

        if (form.isValid()) {
            form.submit({
                url:Ifuel.config.dokPotensiGasUrl + 'upload',
                waitMsg:'Uploading your document...',
                success:function (form, action) {
                    Ext.Msg.alert('Success', 'Dokumen telah uploaded.');
                    me.getDokPotensiGasWindow().close();
                    me._doGridDokPotensiGasRefresh();
                },
                failure:function (form, action) {
                    Ext.Msg.alert('Failed', action.result.msg);
                    me.getDokPotensiGasWindow().close();
                }
            })
        } else {
            Ext.MessageBox.alert('Info', 'Ada input yang belum terisi, cek yang bergaris merah.');
        }
    },

    activatedTabGrid:function () {
        this.getStatusPotensiGasFormPanel().disable();
        this.getStatusPotensiGasTabPanel().setActiveTab(this.getStatusPotensiGasGridPanel());
        this.getStatusPotensiGasTabPanel().down('button[action=save]').disable();
        this.getStatusPotensiGasTabPanel().down('button[action=changestatus]').disable();
    },

    activatedTabForm:function () {
        this.getStatusPotensiGasFormPanel().enable();
        this.getStatusPotensiGasTabPanel().setActiveTab(this.getStatusPotensiGasFormPanel());

        if (this.allowWrite) {
            this.getStatusPotensiGasTabPanel().down('button[action=new]').enable();
            this.getStatusPotensiGasTabPanel().down('button[action=save]').enable();
            this.getStatusPotensiGasTabPanel().down('button[action=changestatus]').enable();
        } else {
            this.getStatusPotensiGasTabPanel().down('button[action=new]').disable();
            this.getStatusPotensiGasTabPanel().down('button[action=save]').disable();
            this.getStatusPotensiGasTabPanel().down('button[action=changestatus]').disable();
        }
    },

    _toggleDokPotensiGasDeleteButton:function(enable){
        if(enable){
            this.getDokPotensiGasGridPanel().down('button[action=delete]').enable();
        }else{
            this.getDokPotensiGasGridPanel().down('button[action=delete]').disable();
        }
    },
    
    _togglePotensiGasChangeStatusButton:function(enable){
        if(enable){
            this.getStatusPotensiGasTabPanel().down('button[action=changestatus]').enable();
        }else{
            this.getStatusPotensiGasTabPanel().down('button[action=changestatus]').disable();
        }
    },

    _doGridDokPotensiGasRefresh:function () {
        var store = this.getDokPotensiGasGridPanel().getStore().reload();
    },

    //Topo customization from here
    createPotensiGas:function() {
        this._clearValuePotensiGas();
        this.activatedTabForm();
    },

    _clearValuePotensiGas:function() {
        var form = this.getStatusPotensiGasFormPanelForm();

        form.down('hiddenfield[name=id]').setValue(null);
        form.down('textfield[name=statusPotensiGas]').setValue('BARU');
        form.down('textfield[name=namaSumberGas]').setValue(null);
        form.down('textfield[name=namaPemasok]').setValue(null);
        form.down('textfield[name=lokasiSumberGas]').setValue(null);
        form.down('textfield[name=jenisGas]').setValue(null);
        form.down('textfield[name=perkiraanVolGas]').setValue(null);

        form.down('textfield[name=namaPltgm]').setValue(null);
        form.down('textfield[name=namaLokasi]').setValue(null);
        form.down('textfield[name=kapasitasProd]').setValue(null);
        form.down('textfield[name=tanggalCod]').setValue(null);

        var grid = this.getDokPotensiGasGridPanel();
        var store = grid.getStore();
        grid.down('pagingtoolbar').disable();
        store.loadRawData([]);
    },

    showPemasok:function() {
        Ext.widget('pemasokWindowChooser', {parentName:'potensiGas'});
    },

    choosePemasok:function(grid, record) {
        this._showValuePemasok(record.data);
        this.getPemasokWindowChooser().close();
    },

    _showValuePemasok:function (pemasok) {
        var form = this.getStatusPotensiGasFormPanelForm();
        form.down('hiddenfield[name=pemasokId]').setValue(pemasok.id);
        form.down('textfield[name=namaPemasok]').setValue(pemasok.namaPemasok);
    },

    showSumberGas:function() {
        Ext.widget('sumberGasWindowChooser', {parentName:'potensiGas'});
    },

    chooseSumberGas:function(grid, record) {
        this._showValueSumberGas(record.data);
        this.getSumberGasWindowChooser().close();
    },

    _showValueSumberGas:function (sumberGas) {
        var form = this.getStatusPotensiGasFormPanelForm();
        form.down('hiddenfield[name=sumberGasId]').setValue(sumberGas.id);
        form.down('textfield[name=namaSumberGas]').setValue(sumberGas.namaSumberGas);
    },

    showPltgm:function() {
        Ext.widget('pltgmWindowChooser', {parentName:'potensiGas'});
    },

    choosePltgm:function(grid, record) {
        this._showValuePltgm(record.data);
        this.getPltgmWindowChooser().close();
    },

    _showValuePltgm:function (pltgm) {
        var form = this.getStatusPotensiGasFormPanelForm();
        form.down('hiddenfield[name=pltgmId]').setValue(pltgm.id);
        form.down('textfield[name=namaPltgm]').setValue(pltgm.namaPltgm);
    },

    savePotensiGas:function () {
        var me = this;
        var form = this.getStatusPotensiGasFormPanelForm();
        var values = form.getValues();
        var record = form.getRecord();

        var data = {
            id:record ? values.id : null,
            tmSumberGas:{
                id:values.sumberGasId
            },
            tmPemasok:{
                id:values.pemasokId
            },
            tmPltgm:{
                id:values.pltgmId
            }
        };

        if(form.getForm().isValid()) {
            if(data.id) {
                Ext.Ajax.request({
                    url:Ifuel.config.potensiGasUrl + data.id,
                    method: 'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success:function(response, options) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                        me._reshowValueStatusPotensiGas(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Potensi Gas');
                    },
                    failure:function(reponse, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Potensi Gas');
                    }
                });
            } else {
                Ext.Ajax.request({
                    url: Ifuel.config.potensiGasUrl,
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success:function (response, options) {
                        me.getStatusPotensiGasGridPanel().getStore().reload();
                        me._reshowValueStatusPotensiGas(response.getResponseHeader('Location'));
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Potensi Gas');
                    },
                    failure:function (response, options) {
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Potensi Gas');
                    }
                });
            }
        }
    },

    _reshowValueStatusPotensiGas:function (url) {
        var me = this;
        Ext.Ajax.request({
            url:url,
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            success:function (response, options) {
                var data = Ext.JSON.decode(response.responseText);
                me.showStatusPotensiGas(data);
            },
            failure:function (response, options){

            }
        });
    },
    
    showChangeStatusDialog:function () {
        var lastStatus = this.data;
        
        var record = this.getStatusPotensiGasGridPanel().getSelectionModel().getSelection()[0];
        var window = Ext.widget('potensiGasChangeStatusWindow', {
            parentName:'potensiGas',
            typeComboList: lastStatus === 'BARU' ? 0 : (lastStatus === 'PROSES' ? 1 : null)
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
    },
    
    saveChangeStatusPotensiGas:function () {
        var me = this;
        var form = this.getPotensiGasChangeStatusWindow().down("form");
        var values = form.getValues();
//
        var record = this.getStatusPotensiGasGridPanel().getSelectionModel().getSelection()[0];
        record.data.tmStatusKronologis.namaStatus = values.status;
        if (form.getForm().isValid()) {

                Ext.Ajax.request({
                    url:Ifuel.config.potensiGasUrl + "status",
                    method:'POST',
                    timeout:120000,
                    params:
                        {
                            id: record.data.trPotensiGas.id,
                            status: record.data.tmStatusKronologis.namaStatus
                        },
                    success:function (response, options) {
//                        var responseText = Ext.JSON.decode(response.responseText);
//                        console.log(responseText);
                        me.getStatusPotensiGasGridPanel().getStore().reload();
//                        me._showValueSkPanitia(responseText);
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Potensi Gas Success');
                    },
                    failure:function (response, options) {
//                        var responseText = Ext.JSON.decode(response.responseText);
//                        console.log(response.responseText);
                        Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Potensi Gas Failed');
                    }
                });
                this.getPotensiGasChangeStatusWindow().close();
            }else{
                Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Change Status Potensi Gas Invalid Form');
            } 
    },
    
    statusComboboxChange:function (combobox, newValue, oldValue) {
    
    },
    
    potensiGasGridSelectionChange:function (sel, selected) {
        if (selected[0]) {
            if (selected[0].data.tmStatusKronologis.namaStatus.toUpperCase() == "BARU" || selected[0].data.tmStatusKronologis.namaStatus.toUpperCase() == "PROSES") {
                this._togglePotensiGasChangeStatusButton(true);
            } else {
                this._togglePotensiGasChangeStatusButton(false);
            }
            this.setData(selected[0].data.tmStatusKronologis.namaStatus.toUpperCase());
        } else {
            this._togglePotensiGasChangeStatusButton(false);
            this.setData(null);
        }
        
    }
});


