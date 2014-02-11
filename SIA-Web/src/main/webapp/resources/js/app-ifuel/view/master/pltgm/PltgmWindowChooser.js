/**
 * Created with IntelliJ IDEA.
 * User: Bayufrio
 * Date: 4/9/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.master.pltgm.PltgmWindowChooser', {
    extend:'Ext.window.Window',
    alias:'widget.pltgmWindowChooser',
    title:'Pilih PLTGU',

    autoShow:true,
    resizable:false,
    modal:true,
    layout:'fit',

    initComponent:function () {
        Ext.apply(this, {
            items:[
                Ext.create('Ifuel.view.master.pltgm.PltgmGridPanel',
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

    setUrl:function(url){
        var store = this.down('pltgmGridPanel').getStore();
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