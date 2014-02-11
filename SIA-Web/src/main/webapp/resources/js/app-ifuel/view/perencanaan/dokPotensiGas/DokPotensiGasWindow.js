/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 1/8/13
 * Time: 1:29 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.perencanaan.dokPotensiGas.DokPotensiGasWindow', {
    extend:'Ext.window.Window',
    alias:'widget.dokPotensiGasWindow',

    title:'Unggah Dokumen',
    layout:'fit',
    autoShow:true,
    resizable:false,
    modal:true,

    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                padding:'5 5 0 5',

                border:false,
                style:'background-color: #fff;',
                defaults:{
                    width:400
                },
                items:[
                    {
                        xtype:'hiddenfield',
                        name: 'idTrPotensiGas'
                    },
                    {
                        xtype: 'combobox',
                        anchor: '100%',
                        fieldLabel:'Jenis Dokumen',
                        name:'jenisDokumen',
                        store:Ext.create('Ifuel.store.master.JenisDokumenStore'),
                        displayField:'jenisDokumen',
                        valueField:'id',
                        editable:false,
                        readOnly:false,
                        allowBlank: false
                    },
                    {
                        xtype:'textfield',
                        anchor:'100%',
                        fieldLabel:'No Dokumen',
                        name:'noDokumen',
                        allowBlank:false
                    },
                    {
                        xtype:'textarea',
                        anchor:'100%',
                        fieldLabel:'Keterangan',
                        name:'keterangan',
                        allowBlank:false
                    },
                    {
                        xtype: 'filefield',
                        name: 'uploadedfiles',
                        fieldLabel: 'Lokasi Dokumen',
                        msgTarget: 'side',
                        allowBlank: false,
                        anchor: '100%',
                        buttonText: 'Cari Dokumen'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text:'Save',
                action:'save'
            },
            {
                text:'Cancel',
                scope:this,
                handler:this.close
            }
        ];

        this.callParent(arguments);
    }
});