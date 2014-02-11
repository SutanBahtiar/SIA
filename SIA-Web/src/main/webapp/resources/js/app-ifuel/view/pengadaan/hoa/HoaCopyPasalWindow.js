/**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.pengadaan.hoa.HoaCopyPasalWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.hoaCopyPasalWindow',
    title: 'Salin Pasal',

    autoShow: true,
    resizable: false,
    modal: true,
    width: 800,
    height: 500,
    layout: {
        type: 'fit'
    },

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'tabpanel',
                    items: [
                        Ext.create('Ifuel.view.pengadaan.hoa.HoaGridPanel'),
                        Ext.create('Ifuel.view.master.pasal.SimplePasalSimpleAyatPanel',
                            {
                                withTbar:false,
                                disabled:true
                            }
                        )
                    ]
                }
            ]
        });

        this.buttons = [
            {
                text: 'Salin',
                action: 'salin',
                disabled:true
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