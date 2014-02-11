/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 14/05/13
 * Time: 9:50
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.sumberGas.SumberGasWindowChooser', {
    extend:'Ext.window.Window',
    alias:'widget.sumberGasWindowChooser',
    title:'Pilih Sumber Gas',

    autoShow:true,
    resizable:false,
    modal:true,
    layout:'fit',

    initComponent:function() {
        var me = this;

        Ext.apply(this, {
            items:[
                Ext.create('Ifuel.view.master.sumberGas.SumberGasGridPanel', {
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

    setUrl:function(url){
        var store = this.down('sumberGasGridPanel').getStore();
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