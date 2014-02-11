Ext.define('Ifuel.view.master.region.RegionWindowChooser', {
    extend:'Ext.window.Window',
    alias:'widget.regionWindowChooser',
    title:'Pilih Region',

    autoShow:true,
    resizable:false,
    modal:true,
    layout:'fit',

    initComponent:function() {
        Ext.apply(this, {
            items:[
                Ext.create('Ifuel.view.master.region.RegionGridPanel',{
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
        var store = this.down('regionGridPanel').getStore();
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
})