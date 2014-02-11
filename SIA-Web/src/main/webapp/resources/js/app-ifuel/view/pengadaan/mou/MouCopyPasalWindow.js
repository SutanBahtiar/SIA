/**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.pengadaan.mou.MouCopyPasalWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.mouCopyPasalWindow',
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
                        Ext.create('Ifuel.view.pengadaan.mou.MouGridPanel',
                            {
                                withTbar:false
                            }
                        ),
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