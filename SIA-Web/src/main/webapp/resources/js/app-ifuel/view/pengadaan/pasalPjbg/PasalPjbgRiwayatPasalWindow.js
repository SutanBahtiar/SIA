/**
 * Created with IntelliJ IDEA.
 * User: Latief
 * Date: 1/8/13
 * Time: 1:29 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.pengadaan.pasalPjbg.PasalPjbgRiwayatPasalWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.pasalPjbgRiwayatPasalWindow',

    title: 'Edit Pasal',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    autoShow: true,
    resizable: false,
    modal: true,

    hiddenRiwayatPasal:false,

    initComponent: function () {
        var me = this;

        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                defaults: {
                    width: 400
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id'
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'pasalPjbgId'
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'hiddenfield',
                                name: 'isuKeytermsId'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Isu',
                                name: 'isu',
                                anchor: '100%',
                                flex: 1,
                                readOnly: true
                            },
                            {
                                xtype: 'button',
                                action: 'isuSearch',
                                iconCls: 'fam-zoom'
                            }
                        ]
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Pasal',
                        name: 'pasal',
                        minValue: 1,
                        allowBlank: false
                    },
                    {
                        xtype: 'textarea',
                        fieldLabel: 'Judul Indonesia',
                        name: 'judulIndonesia',
                        allowBlank: false
                    },
                    {
                        xtype: 'textarea',
                        fieldLabel: 'Judul English',
                        name: 'judulEnglish'
                    },
                    {
                        xtype: 'textarea',
                        fieldLabel: 'Text Indonesia',
                        name: 'textIndonesia',
                        allowBlank: false

                    },
                    {
                        xtype: 'textarea',
                        fieldLabel: 'Text English',
                        name: 'textEnglish'
                    }
                ]
            },
            Ext.create('Ifuel.view.master.riwayatPasal.RiwayatPasalGridPanel', {hidden:me.hiddenRiwayatPasal, withTbar:false, width: 650})
        ];

        this.buttons = [
            {
                text: 'Save',
                disabled:true,
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },

    setUrl:function (url) {
        var store = this.down('riwayatPasalGridPanel').getStore();
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