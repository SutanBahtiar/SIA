/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 09/04/13
 * Time: 16:29
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.orgPln.OrgPlnPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.orgPlnPanel',
    title: 'Unit PLN',

    layout:{
        align: 'stretch',
        type: 'vbox'
    },

    initComponent:function(){
        Ext.apply(this, {
            items:[
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    items: [
                        Ext.create('Ifuel.view.master.orgPln.OrgPlnGridPanel'),
                        Ext.create('Ifuel.view.master.orgPln.OrgPlnFormPanel', {disabled: true})
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