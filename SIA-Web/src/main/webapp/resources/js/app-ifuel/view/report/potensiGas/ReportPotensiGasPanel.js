Ext.define('Ifuel.view.report.potensiGas.ReportPotensiGasPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportPotensiGasPanel',
    title: 'Report Potensi Gas',

    layout:{
        align: 'stretch',
        type: 'vbox'
    },

    initComponent:function(){
        Ext.apply(this, {
            items:[
                {
                    xtype: 'tabpanel',
                    flex: 1,
//                    items: [
//                        Ext.create('Ifuel.view.master.orgPln.OrgPlnGridPanel'),
//                        Ext.create('Ifuel.view.master.orgPln.OrgPlnFormPanel', {disabled: true})
//                    ],

                    tbar: [
                        {
                            xtype:'button',
                            text:'Pdf',
                            action:'pdf',
                            iconCls:'fam-page-white-acrobat'
                        },
                        {
                            xtype:'button',
                            text:'Xls',
                            action:'xls',
                            iconCls:'fam-page-excel'
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})