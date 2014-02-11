/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 1/8/13
 * Time: 9:22 AM
 * To change this template use File | Settings | File Templates.
 */



var myData = [
    ['Pembangkit 1',                               71.72, 0.02],
    ['Pembangkit 2',                           29.01, 0.42],
    ['Altria Group Inc',                    83.81, 0.28],
    ['American Express Company',            52.55, 0.01],
    ['Wal-Mart Stores, Inc.',               45.45, 0.73]
];

// create the data store
var store = Ext.create('Ext.data.ArrayStore', {
    fields: [
        {name: 'jenis'},
        {name: 'jenis1',      type: 'float'},
        {name: 'statusdata',     type: 'float'}
    ],
    data: myData
});

Ext.define('Ifuel.view.dashboard.potensiGas.PilihPotensiGas', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dashboardPotensiGasPilihPotensiGas',
    store:store,
    forceFit: true,
    autoScroll: true,

    title: 'List Pembangkit',

    initComponent: function () {
        Ext.apply(this, {
                            columns: [
                                Ext.create('Ext.grid.RowNumberer'),
                                {
                                    text     : 'Pembangkit',
                                    width    : 150,
                                    sortable : true,
                                    dataIndex: 'jenis'
                                },
                                {
                                    text     : 'Potensi Gas',
                                    width    : 150,
                                    sortable : true,
                                    //        renderer : change,
                                    dataIndex: 'statusdata',

                                },
                                {
                                    text     : 'Jenis Gas',
                                    width    : 150,
                                    sortable : true,
                                    //        renderer : change,
                                    dataIndex: 'statusdata',

                                },
                                {
                                    text     : 'Pemasok',
                                    width    : 150,
                                    sortable : true,
                                    //        renderer : change,
                                    dataIndex: 'statusdata'

                                },
                                {
                                    text     : 'Status',
                                    width    : 150,
                                    sortable : true,
                                    //        renderer : change,
                                    dataIndex: 'statusdata'

                                }
                            ]
        });
        this.callParent(arguments);

    }
})