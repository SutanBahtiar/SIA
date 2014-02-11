Ext.define('Ifuel.view.pengadaan.keyterms.KeytermsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.keytermsPanel',
    title: 'Keyterms Agreement',

    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    items: [
                        Ext.create('Ifuel.view.pengadaan.keyterms.KeytermsGridPanel'),
                        Ext.create('Ifuel.view.pengadaan.keyterms.KeytermsFormPanel', {disabled: true})
//                        Ext.create('Ifuel.view.master.pasal.SimplePasalSimpleAyatPanel', {disabled: true})
                    ],

                    tbar: [
                        {
                            xtype: 'button',
                            text: 'New',
//                            disabled:true,
                            action: 'new',
                            iconCls: 'fam-page-add'
                        },
                        {
                            xtype: 'button',
                            text: 'Save',
                            disabled: true,
                            action: 'save',
                            iconCls: 'fam-page-save'
                        },
                        {

                            xtype: 'button',
                            text: 'Change Status',
                            disabled: true,
                            action: 'changestatus',
                            iconCls: 'icon-changestatus'
                        }
//                        {
//                            xtype:'button',
//                            text:'Delete',
//                            disabled:true,
//                            action:'delete',
//                            iconCls:'fam-page-delete'
//                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})