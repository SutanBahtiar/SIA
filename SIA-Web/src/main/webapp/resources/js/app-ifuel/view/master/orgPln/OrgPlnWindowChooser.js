/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 17/04/13
 * Time: 9:53
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.orgPln.OrgPlnWindowChooser', {
    extend:'Ext.window.Window',
    alias:'widget.orgPlnWindowChooser',
    title:'Pilih Unit PLN',

    autoShow:true,
    resizable:false,
    modal:true,
    layout:'fit',

    initComponent:function() {
        Ext.apply(this, {
            items:[
                Ext.create('Ifuel.view.master.orgPln.OrgPlnGridPanel', {
                    title:null,
                    height:300,
                    width:700,
                    withTbar:false
                })
            ]
        });

        this.buttons = [
            {
                text:'Batal',
                scope:this,
                handler:this.close
            }
        ];

        this.callParent(arguments);
    },

    setUrl:function(url) {
        var store = this.down('orgPlnGridPanel').getStore();
        var proxy = {
            type:'ajax',
            pageParam:'page.page',
            url:url,
            reader:{
                type:'json',
                root:'content',
                totalProperty:'totalElements'
            }
        };
        store.setProxy(proxy);
        store.loadPage(1);
    }
});