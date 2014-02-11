/**
 * Created with IntelliJ IDEA.
 * User: Latief
 * Date: 1/8/13
 * Time: 1:29 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.pengadaan.dokumenKom.DokumenKomWindow', {
    extend:'Ext.window.Window',
    alias:'widget.dokumenKomWindow',

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
                        name: 'idTrKom'
                    },
                    {
                        xtype:'textfield',
                        anchor:'100%',
                        fieldLabel:'No Dokumen',
                        name:'nomor',
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