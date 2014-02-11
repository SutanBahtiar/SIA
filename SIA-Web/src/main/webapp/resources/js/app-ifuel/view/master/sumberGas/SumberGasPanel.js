/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 11/04/13
 * Time: 9:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.sumberGas.SumberGasPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sumberGasPanel',
    title: 'Master Sumber Gas',

    layout: {
        align:'stretch',
        type:'vbox'
    },

    initComponent:function(){
        Ext.apply(this,{
            items:[
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    items: [
                        Ext.create('Ifuel.view.master.sumberGas.SumberGasGridPanel'),
                        Ext.create('Ifuel.view.master.sumberGas.SumberGasFormPanel', {disabled: true})
                    ],

                    tbar: [
                        {
                            xtype:'button',
                            text:'New',
//                            disabled:true,
                            action:'new',
                            iconCls:'fam-page-add'
                        },
                        {
                            xtype:'button',
                            text:'Save',
                            disabled:true,
                            action:'save',
                            iconCls:'fam-page-save'
                        },
                        {

                            xtype:'button',
                            text:'Change Status',
                            disabled:true,
                            action:'changestatus',
                            iconCls:'icon-changestatus'
                        },
                        {
                            xtype:'button',
                            text:'Delete',
                            disabled:true,
                            action:'delete',
                            iconCls:'fam-page-delete'
                        },
                        {
                            xtype:'button',
                            text:'Print',
//                            disabled:true,
                            action:'print',
                            iconCls:'fam-page-white-acrobat'
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})