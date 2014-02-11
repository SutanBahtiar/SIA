/**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.pengadaan.skPanitia.SkPanitiaChangeStatusWindow', {
    extend:'Ext.window.Window',
    alias:'widget.skPanitiaChangeStatusWindow',
    title:'Change Status',

    autoShow:true,
    resizable:false,
    modal:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },

    initComponent:function () {
        var me = this;

        var dataCombo = [
            {"name":'DISETUJUI'},
            {"name":'DIBATALKAN'},
            {"name":'TIDAK_DISETUJUI'}
        ];

        Ext.apply(this, {
            items:[
                {
                    xtype:'form',
                    padding:'5 5 0 5',
                    border:false,
                    width:600,
                    style:'background-color: #fff;',
                    items:[
                        {
                            xtype:'combobox',
                            fieldLabel:'Status',
                            name:'status',
                            labelWidth:70,
                            queryMode:'local',
                            displayField:'name',
                            valueField:'name',
                            allowBlank:false,
                            store:Ext.create('Ext.data.Store', {
                                fields:['name'],
                                data:dataCombo
                            })
                        }
                    ]
                },
                Ext.create('Ifuel.view.email.SendEmailForm', {
                    hidden:true,
                    padding:'5 5 0 5'
                })
            ]
        });

        this.buttons = [
            {
                text:'Save',
                action:'save'
            },
            {
                text:'Batal',
                scope:this,
                handler:this.close
            }
        ];

        this.callParent(arguments);
    }
});