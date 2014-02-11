Ext.define('Ifuel.view.role.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.roleList',
    store: 'Roles',
    forceFit: true,
    title: 'Role',
    initComponent: function () {
        Ext.apply(this, {
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'authority',
                    text: 'Authority'
                }
            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'New Role',
                            disabled: false,
                            action: 'add',
                            iconCls: 'fam-add'
                        },
                        {
                            xtype: 'button',
                            text: 'Delete Role',
                            disabled: true,
                            action: 'delete',
                            iconCls: 'fam-delete'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: 'Roles',
                    displayInfo: true,
                    displayMsg: 'Displaying Roles {0} - {1} of {2}',
                    emptyMsg: 'No Roles to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});