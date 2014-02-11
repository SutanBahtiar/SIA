/**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.pengadaan.hargaGasPjbg.HargaGasPjbgWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.hargaGasPjbgWindow',
    title: 'Harga Gas Pjbg',

    autoShow: true,
    resizable: false,
    modal: true,
    layout: 'fit',

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
                            name:'id'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Periode Awal',
                            name: 'periodeAwal',
                            allowBlank: false,
                            format: 'd F Y'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Periode Awal',
                            name: 'periodeAkhir',
                            allowBlank: false,
                            format: 'd F Y'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Harga Gas',
                            name: 'hargaGas',
                            allowBlank: false,
                            minValue: 0,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false
                        }
                    ]
                }
            ]
        });

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Batal',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});