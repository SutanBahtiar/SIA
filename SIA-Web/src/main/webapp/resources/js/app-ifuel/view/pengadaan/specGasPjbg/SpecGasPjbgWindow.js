/**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.pengadaan.specGasPjbg.SpecGasPjbgWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.specGasPjbgWindow',
    title: 'Spesifikasi Gas Pjbg',

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
                    defaults:{
                        labelWidth:120
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name:'id'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Spesifikasi',
                            name: 'atributSpec',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Measurement Unit',
                            name: 'measurementUnit'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Minimum Value',
                            name: 'minimumValue',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Maximum Value',
                            name: 'maximumValue',
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