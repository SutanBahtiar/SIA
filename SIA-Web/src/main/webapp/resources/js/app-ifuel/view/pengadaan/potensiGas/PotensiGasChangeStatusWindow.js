/**
 *
 * @author dhamarsu
 */

Ext.define('Ifuel.view.pengadaan.potensiGas.PotensiGasChangeStatusWindow', {
    extend:'Ext.window.Window',
    alias:'widget.potensiGasChangeStatusWindow',
    title:'Change Status',

    autoShow:true,
    resizable:false,
    modal:true,
    typeComboList:null,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    
    initComponent:function () {
        var me = this;
        
        var dataCombo = [];
        
        if (this.typeComboList === 0) {
            dataCombo = [
                {"name":'PROSES'},
                {"name":'DIBATALKAN'}
            ];
        }
        else if (this.typeComboList === 1) {
            dataCombo = [
                {"name":'DIBATALKAN'}
            ];
        }

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
//                        {
//                            xtype:'textfield',
//                            fieldLabel:'Keterangan',
//                            name:'keterangan',
//                            labelWidth:70,
//                            width: 540
//                        }
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