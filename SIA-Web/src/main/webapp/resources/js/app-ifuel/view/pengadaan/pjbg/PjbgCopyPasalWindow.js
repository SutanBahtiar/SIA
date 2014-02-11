/**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.pengadaan.pjbg.PjbgCopyPasalWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.pjbgCopyPasalWindow',
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
                        Ext.create('Ifuel.view.pengadaan.pjbg.PjbgGridPanel',
                            {
                                withTbar:false
                            }
                        ),
                        Ext.create('Ifuel.view.pengadaan.pasalPjbg.SimplePasalPjbgSimpleAyatPanel',
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