 /**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.pengadaan.isuKeyterms.IsuKeytermsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.isuKeytermsWindow',
    title: 'Isu Keyterms',

    autoShow: true,
    resizable: false,
    modal: true,
    layout:{
        type:'hbox',
        align:'stretch'
    },

    //custom field
    hiddenRiwayat:false,
    hiddenFinalisasi:false,

    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            items: [
                {
                    xtype: 'form',
                    padding: '5 5 0 5',
                    border: false,
                    width: 400,
                    style: 'background-color: #fff;',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'id'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'riwayatIsuKeytermsId'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Isu',
                            name: 'isu',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Finalisasi',
                            name: 'status',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'name',
                            anchor: '100%',
                            hidden:me.hiddenFinalisasi,
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name'],
                                data: [
                                    {"name": 'PLN'},
                                    {"name": 'PEMASOK'},
                                    {"name": 'LAINNYA'}
                                ]
                            }),
                            listeners:{
                                change:function(combobox, newValue){
                                    var textareaPln = me.down('textarea[name=kesepakatanPln]');
                                    var textareaPemasok = me.down('textarea[name=kesepakatanPemasok]');
                                    var textareaLainnya = me.down('textarea[name=kesepakatanLainnya]');
                                    textareaPln.setFieldStyle("background:white");
                                    textareaPemasok.setFieldStyle("background:white");
                                    textareaLainnya.setFieldStyle("background:white");
                                    if('PLN' == newValue){
                                        textareaPln.setFieldStyle("background:yellow");
                                    }
                                    else if('PEMASOK' == newValue){
                                        textareaPemasok.setFieldStyle("background:yellow");
                                    }
                                    else if('LAINNYA' == newValue){
                                        textareaLainnya.setFieldStyle("background:yellow");
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Kesepakatan PLN',
                            name: 'kesepakatanPln'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Kesepakatan Pemasok',
                            name: 'kesepakatanPemasok'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Kesepakatan Lainnya',
                            name: 'kesepakatanLainnya'
                        }
                    ]
                },
                Ext.create('Ifuel.view.pengadaan.riwayatIsuKeyterms.RiwayatIsuKeytermsGridPanel',{
                    width:400,
                    hidden:me.hiddenRiwayat,
                    title:null
                })
            ]

        });

        this.buttons = [
            {
                text: 'Save',
//                disabled:true,
                action: 'save'
            },
            {
                text: 'Batal',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },

    setUrl:function (url) {
        var store = this.down('riwayatIsuKeytermsGridPanel').getStore();
        var proxy = {
            type:'ajax',
            pageParam:'page.page',
            url:url,
            reader:{
                type:'json',
                root:'content',
                totalProperty:'totalElements'
            }
        };
        store.setProxy(proxy);
        store.loadPage(1);
    }
});