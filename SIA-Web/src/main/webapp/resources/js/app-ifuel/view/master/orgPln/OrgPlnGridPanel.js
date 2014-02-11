/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 09/04/13
 * Time: 16:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.orgPln.OrgPlnGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.orgPlnGridPanel',
    store: Ext.create('Ifuel.store.master.OrgPlnStore'),
    forceFit: true,
    title: 'Daftar Rincian Unit PLN',

    initComponent:function(){
        Ext.apply(this, {
            columns:[
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Unit PLN',
                    dataIndex: 'unitPln',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Inisial Unit',
                    dataIndex: 'inisialUnit',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'No. Telp',
                    dataIndex: 'noTelpUnit',
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
                    dataIndex: 'emailUnit',
                    renderer:function(value) {
                        if (!Ext.isEmpty(value)) {
                            return value;
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    text: 'Nama GM',
                    dataIndex: 'namaGm',
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
                    displayMsg: 'Displaying Unit {0} - {1} of {2}.',
                    emptyMsg: 'No Unit to display.'
                }
            ]
        });
        this.callParent(arguments);
    }
})