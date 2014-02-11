Ext.define('Ifuel.view.group.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.groupList',
    store: 'Groups',
    forceFit: true,
    title: 'Group',
    rowLines: true,
    columnLines: true,
    requires: [
        'Ext.ux.RowExpander'
    ],
    plugins: [
        {
            ptype: 'rowexpander',
            expandOnDblClick: false,
            rowBodyTpl: [
                '<div style="background-color: #dff0d8;padding: 5px;">' ,
                '<p>ROLES : </p>' ,
                '<ul>',
                '<tpl for="roles">' ,
                '<li><p><i class="fam-bullet-green"></i>{authority}</p></li>',
                '</ul>',
                '</tpl>',
                '</div>'
            ]
        }
    ],
    initComponent: function () {
        Ext.apply(this, {
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nama',
                    text: 'Nama'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'deskripsi',
                    text: 'Deskripsi'
                },
                {
                    xtype: 'booleancolumn',
                    dataIndex: 'enabled',
                    trueText: 'Ya',
                    falseText: 'Tidak',
                    text: 'Enabled'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'New Group',
                            disabled: false,
                            action: 'add',
                            iconCls: 'fam-add'
                        },
                        {
                            text: 'Delete Group',
                            disabled: true,
                            action: 'delete',
                            iconCls: 'fam-delete'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: 'Groups',
                    displayInfo: true,
                    displayMsg: 'Displaying Groups {0} - {1} of {2}',
                    emptyMsg: 'No Groups to display'
                }
            ]
        });
        this.callParent(arguments);
    }

});