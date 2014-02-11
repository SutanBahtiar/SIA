Ext.define('Ifuel.view.email.SendEmailWindow', {
    extend:'Ext.window.Window',
    alias:'widget.sendEmailWindow',

    title:'Pesan Baru',
    layout:'fit',
    autoShow:true,
    resizable:false,
    modal:true,

    initComponent:function () {
        this.items = [
            Ext.create('Ifuel.view.email.SendEmailForm', {
                padding:'5 5 0 5'
            })
        ]

        this.buttons = [
            {
                text:'Send',
                action:'send'
            },
            {
                text:'Cancel',
                scope:this,
                handler:this.close
            }
        ];

        this.callParent(arguments);
    }
});