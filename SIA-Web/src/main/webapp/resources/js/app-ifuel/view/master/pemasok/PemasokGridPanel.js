/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 25/03/13
 * Time: 11:02
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.pemasok.PemasokGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pemasokGridPanel',
    store: Ext.create('Ifuel.store.master.PemasokStore'),
    forceFit: true,
    title: 'Daftar Rincian Pemasok',

    initComponent:function(){
        Ext.apply(this, {
            columns:[
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Pemasok',
                    dataIndex: 'namaPemasok',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Inisial',
                    dataIndex: 'inisialPemasok',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'E-Mail',
                    dataIndex: 'emailPemasok',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Telepon',
                    dataIndex: 'telpPemasok',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'PIC',
                    dataIndex: 'picPemasok',
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
                    displayMsg: 'Displaying Pemasok {0} - {1} of {2}.',
                    emptyMsg: 'No Pemasok to display.'
                }
            ]
        });
        this.callParent(arguments);
    }
})