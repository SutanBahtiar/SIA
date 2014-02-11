Ext.define('Ifuel.view.dashboard.TerimaBB', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.terimaBBGrid',
    storeName: "Ifuel.store.TerimaBBStore",
    title: 'TerimaBB',
    forceFit: true,
    rowLines: true,
    columnLines: true,
    initComponent: function () {
        var self = this;
        var storeObject = Ext.create(self.storeName);
        Ext.apply(this, {
            store: storeObject,
            columns: [
                Ext.create("Ext.grid.RowNumberer",{
                    width:150
                }),
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'lokasi',
                    text: 'Id Lokasi',
                    renderer: function (data) {
                        return data.id;
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'lokasi',
                    text: 'Nama Lokasi',
                    width: 200,
                    renderer: function (data) {
                        return data.nama;
                    }
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'time',
                    format: 'd-m-Y H:i:s',
                    width: 150,
                    text: 'Waktu'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'vehicleNo',
                    text: 'Vehicle No'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'tonage',
                    align: 'right',
                    text: 'Tonage',
                    renderer: function (record) {
                        var color = '#ffffff';
                        var fontColor = '#000000';
                        if (record < 250) {
                            color = '#ff0000';
                            fontColor = '#ffffff';
                        } else if (record < 500) {
                            color = '#ffff00';
                        } else if (record < 750) {
                            color = '#03FB35'
                        } else {
                            color = "#1403FB";
                            fontColor = '#ffffff';
                        }

                        return "<div style='font-weight:bold;padding-right:3px;color:" + fontColor + ";background-color:" + color + "'>" + record + "</div>";
                    }
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'bargeLoading',
                    align: 'right',
                    text: 'Barge Loading'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'loses',
                    text: 'Loses'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'deskripsi',
                    text: 'Deskripsi'
                }
            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'New Record',
                            disabled: false,
                            action: 'add',
                            iconCls: 'fam-add'
                        },
                        {
                            text: 'Export Excel',
                            disabled: true,
                            action: 'delete',
                            iconCls: 'fam-page-white-excel'
                        }

                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: storeObject,
                    displayInfo: true,
                    displayMsg: 'Displaying Data {0} - {1} of {2}',
                    emptyMsg: 'No Data to display',
                    items: {
                        xtype: 'combobox',
                        width: 110,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['number'],
                            data: [
                                {"number": 10 },
                                {"number": 25 },
                                {"number": 50 },
                                {"number": 75 },
                                {"number": 100 }
                            ]
                        }),
                        fieldLabel: 'Page Size',
                        labelWidth: 60,
                        queryMode: 'local',
                        displayField: 'number',
                        valueField: 'number',
                        value: function () {
                            return storeObject.pageSize;
                        }(),
                        listeners: {
                            change: function (comp, newVal) {
                                storeObject.pageSize = newVal;
                                storeObject.changePageSize = true;
                                storeObject.load();
                            }
                        }
                    }
                }
            ]
        });
        this.callParent(arguments);
    }

});