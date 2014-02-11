/**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.pengadaan.kom.ChangeStatusKomWindow', {
    extend:'Ext.window.Window',
    alias:'widget.changeStatusKomWindow',
    title:'Change Status',

    autoShow:true,
    resizable:false,
    modal:true,
    layout:'fit',
    typeComboList:null,

    initComponent:function () {
        var me = this;

        var dataCombo = [];
        
        if (this.typeComboList == 0) {
            dataCombo = [
                {"name":'LAPORAN_RAPAT'},
                {"name":'DIBATALKAN'}
            ];
        }
        else if (this.typeComboList == 1) {
            dataCombo = [
                {"name":'DISETUJUI'},
                {"name":'TIDAK_DISETUJUI'},
                {"name":'RAPAT_LANJUTAN'},
                {"name":'DIBATALKAN'}
            ];
        }

        Ext.apply(this, {
            items:[
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
                            xtype:'combobox',
                            fieldLabel:'Status',
                            name:'status',
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
                }
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