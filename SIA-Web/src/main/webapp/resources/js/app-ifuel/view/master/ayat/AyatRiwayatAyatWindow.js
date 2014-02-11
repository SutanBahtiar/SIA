/**
 * Created with IntelliJ IDEA.
 * User: Latief
 * Date: 1/8/13
 * Time: 1:29 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.ayat.AyatRiwayatAyatWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.ayatRiwayatAyatWindow',

    title: 'Edit Ayat',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    autoShow: true,
    resizable: false,
    modal: true,

    hiddenRiwayatAyat:false,

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
                        name: 'pasalId'
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Pasal',
                        name: 'pasal',
                        minValue: 1,
                        readOnly: true,
                        allowBlank: false
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Ayat',
                        name: 'ayat',
                        minValue: 1,
                        allowBlank: false
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
            Ext.create('Ifuel.view.master.riwayatAyat.RiwayatAyatGridPanel', {hidden:me.hiddenRiwayatAyat, withTbar:false, width: 650})
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
        var store = this.down('riwayatAyatGridPanel').getStore();
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