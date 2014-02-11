/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 11/04/13
 * Time: 9:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.sumberGas.SumberGasGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sumberGasGridPanel',
    store: Ext.create('Ifuel.store.master.SumberGasStore'),
    forceFit: true,
    title: 'Daftar Rincian Sumber Gas',

    initComponent:function(){
        Ext.apply(this,{
            columns:[
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Sumber Gas',
                    dataIndex: 'namaSumberGas',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Lokasi',
                    dataIndex: 'lokasi',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Jenis Gas',
                    dataIndex: 'jenisGas',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Perkiraan Volume',
                    dataIndex: 'perkiraanVol',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                }
            ],

            dockedItems:[
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: this.store,
                    displayInfo: true,
                    displayMsg: 'Displaying Sumber Gas {0} - {1} of {2}.',
                    emptyMsg: 'No Sumber Gas to display.'
                }
            ]
        });
        this.callParent(arguments);
    }
})