Ext.define('Ifuel.view.master.person.PersonGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.personGridPanel',
    forceFit: true,
    title: 'Person',

    //custom field
    withTbar: true,

    initComponent: function () {
        var store = Ext.create('Ifuel.store.master.PersonStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Peserta',
                    dataIndex: 'nama'

                },
                {
                    text: 'Jabatan',
                    dataIndex: 'jabatan'
                },
                {
                    text: 'noTelp',
                    dataIndex: 'noTelp'
                },
                {
                    text: 'Email',
                    dataIndex: 'email'
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Person {0} - {1} of {2}',
                    emptyMsg: 'No Person to display'
                }
            ]
        });

        if (this.withTbar == true) {
            Ext.apply(this, {
                tbar: [
                    {
                        text: 'New',
                        action: 'new',
                        iconCls: 'fam-page-add'
                    },
                    {
                        xtype: 'button',
                        text: 'Delete',
                        disabled: true,
                        action: 'delete',
                        iconCls: 'fam-page-delete'
                    }
                ]
            });
        }
        this.callParent(arguments);
    }

});