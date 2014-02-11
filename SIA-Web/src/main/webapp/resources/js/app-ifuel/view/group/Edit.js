Ext.define('Ifuel.view.group.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.groupEdit',

    title: 'Edit Group',
    layout: 'fit',
    autoShow: true,
    resizable: false,
    modal: true,

    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                defaults: {
                    width: 700
                },
                items: [
                    {
                        xtype: 'fieldset',
                        columnWidth: 0.5,
                        title: 'Detail',
                        defaults: {anchor: '100%'},
                        layout: 'anchor',
                        items: [
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                fieldLabel: 'Nama',
                                name: 'nama',
                                allowBlank: false
                            } ,
                            {
                                xtype: 'textareafield',
                                anchor: '100%',
                                fieldLabel: 'deskripsi',
                                name: 'deskripsi',
                                allowBlank: true
                            } ,
                            {
                                xtype: 'checkboxfield',
                                hideEmptyLabel: false,
                                anchor: '100%',
                                boxLabel: 'Enabled',
                                name: 'enabled',
                                inputValue: true,
                                uncheckedValue: false
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        columnWidth: 0.5,
                        title: 'Roles',
                        collapsible: true,
                        defaults: {anchor: '100%'},
                        layout: 'anchor',
                        items: [
                            {
                                xtype: 'checkboxgroup',
                                columns: 3,
                                vertical: true,
                                items: function () {
                                    var roles = Ext.data.StoreManager.lookup('Roles').data.items;
                                    var result = [];
                                    Ext.each(roles, function (role) {
                                        Ext.Array.push(result, {
                                            boxLabel: role.get('authority'),
                                            name: 'roles',
                                            inputValue: role.get('authority')
                                        });
                                    });
                                    return result;
                                }()
                            }
                        ]
                    }
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