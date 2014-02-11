Ext.define('Ifuel.view.pengadaan.pjbg.PjbgPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pjbgPanel',
    title: 'PJBG',

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
                        Ext.create('Ifuel.view.pengadaan.pjbg.PjbgGridPanel'),
                        Ext.create('Ifuel.view.pengadaan.pjbg.PjbgFormPanel', {disabled: true}),
                        Ext.create('Ifuel.view.pengadaan.specGasPjbg.SpecGasPjbgGridPanel', {disabled: true}),
                        Ext.create('Ifuel.view.pengadaan.pasalPjbg.SimplePasalPjbgSimpleAyatPanel', {disabled: true})
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
                        } ,
                        {
                            xtype: 'button',
                            text: 'Salin Pasal',
                            disabled: true,
                            action: 'salin',
                            iconCls: 'fam-disk-multiple'
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