/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.master.person.PersonFormWindow', {
    extend:'Ext.window.Window',
    alias:'widget.personFormWindow',
    title:'Tambah Person',

    autoShow:true,
    resizable:false,
    modal:true,
    layout:'fit',

    initComponent:function () {
        var me = this;

        Ext.apply(this, {
            items:[
                Ext.create('Ifuel.view.master.person.PersonFormPanel', {title:null})
            ]
        });

        this.buttons = [
            {
                text:'Save',
                action:'save'
            },
            {
                text:'Batal',
                action:'batal',
                scope:this,
                handler:this.close
            }
        ];

        this.callParent(arguments);
    }
});