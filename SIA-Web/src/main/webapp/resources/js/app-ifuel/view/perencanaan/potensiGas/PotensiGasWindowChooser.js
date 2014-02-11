/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.perencanaan.potensiGas.PotensiGasWindowChooser', {
    extend:'Ext.window.Window',
    alias:'widget.potensiGasWindowChooser',
    title:'Pilih Potensi Gas',

    autoShow:true,
    resizable:false,
    modal:true,
    layout:'fit',

    initComponent:function () {
        var me = this;

        Ext.apply(this, {
            items:[
                Ext.create('Ifuel.view.perencanaan.potensiGas.PotensiGasGridPanel',
                    {
                        title:null,
                        height:300,
                        width:700,
                        withTbar:false
                    }
                )
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

    setUrl:function (url) {
        var store = this.down('potensiGasGridPanel').getStore();
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