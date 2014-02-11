Ext.define('Ifuel.view.role.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.roleEdit',

    title: 'Edit Role',
    layout: 'fit',
    autoShow: true,
    resizable: false,
    modal: true,

    constructor: function () {

        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                defaults: {
                    width: 400
                },
                items: [
                    {
                        xtype: 'textfield',
                        anchor: '100%',
                        fieldLabel: 'Authority',
                        name: 'authority',
                        allowBlank: false
                    }
                    /*,
                     {
                     xtype:'unitSatuanKerjaFieldContainer',
                     fieldLabel:'Last Three Jobs'
                     }*/
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});