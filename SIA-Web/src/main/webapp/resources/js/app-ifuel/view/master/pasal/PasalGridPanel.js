Ext.define('Ifuel.view.master.pasal.PasalGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pasalGridPanel',
    forceFit: true,
    title: 'Pasal',

    //custom field
    withTbar: true,

    initComponent: function () {
        var store = Ext.create('Ifuel.store.master.PasalStore');
        Ext.apply(this, {
            store: store,
            columns: [

                {
                    text: 'Pasal',
                    dataIndex: 'pasal',
                    flex: 1
                },
                {
                    text: 'Judul Indonesia',
                    dataIndex: 'judulIndonesia',
                    flex: 4
                },
                {
                    text: 'Judul English',
                    dataIndex: 'judulEnglish',
                    flex: 4
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Pasal {0} - {1} of {2}',
                    emptyMsg: 'No Pasal to display'
                }
            ]
        });

        if (this.withTbar == true) {
            Ext.apply(this, {
                tbar: [
                    {
                        text: 'New',
                        action: 'new',
                        iconCls: 'fam-add'
                    },
                    {
                        xtype: 'button',
                        text: 'Delete',
                        disabled: true,
                        action: 'delete',
                        iconCls: 'fam-delete'
                    },
                    {
                        xtype: 'button',
                        text: 'Salin',
                        disabled: true,
                        action: 'salin',
                        iconCls: 'fam-disk-multiple'
                    }
                ]
            });
        }
        this.callParent(arguments);
    }

});