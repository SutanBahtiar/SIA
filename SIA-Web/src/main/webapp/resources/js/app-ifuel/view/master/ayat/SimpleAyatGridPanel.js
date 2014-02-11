Ext.define('Ifuel.view.master.ayat.SimpleAyatGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.simpleAyatGridPanel',
    forceFit: true,
    title: 'Ayat',

    //custom field
    withTbar: true,

    initComponent: function () {
        var store = Ext.create('Ifuel.store.master.SimpleAyatStore');
        Ext.apply(this, {
            store: store,
            columns: [
                {
                    text: 'Ayat',
                    dataIndex: 'ayat',
                    flex: 1
                },
                {
                    text: 'Text Indonesia',
                    dataIndex: 'textIndonesia',
                    flex: 4
                },
                {
                    text: 'Text English',
                    dataIndex: 'textEnglish',
                    flex: 4
                }
            ],

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying Ayat {0} - {1} of {2}',
                    emptyMsg: 'No Ayat to display'
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
                    }
                ]
            });
        }
        this.callParent(arguments);
    }

});