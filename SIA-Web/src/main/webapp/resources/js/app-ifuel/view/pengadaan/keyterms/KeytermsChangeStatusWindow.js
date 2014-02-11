/**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.pengadaan.keyterms.KeytermsChangeStatusWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.keytermsChangeStatusWindow',
    title: 'Change Status',

    autoShow: true,
    resizable: false,
    modal: true,
    layout: 'fit',

    /**
     *diisi 0 atau 1; 0 -> combo berisi DRAFT_FINAL dan DIBATALKAN, 1 -> DISETUJUI, TIDAK_DISETUJUI, DIBATALKAN
     */
    typeComboList: null,

    initComponent: function () {
        var me = this;

        var dataCombo = [];

        if (this.typeComboList == 0) {
            dataCombo = [
                {"name": 'DRAFT_DISETUJUI'},
                {"name": 'DIBATALKAN'}
            ];
        } else if (this.typeComboList == 1) {
            dataCombo = [
                {"name": 'DISETUJUI'},
                {"name": 'TIDAK_DISETUJUI'},
                {"name": 'DIBATALKAN'}
            ];
        }

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
                            xtype: 'combobox',
                            fieldLabel: 'Status',
                            name: 'status',
                            labelWidth: 50,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'name',
                            allowBlank: false,
                            anchor: '100%',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name'],
                                data: dataCombo
                            }),
                            listeners:{
                                change:function(combobox, newValue){
                                    if('DISETUJUI' == newValue){
                                        me.down('datefield[name=tanggalPersetujuan]').show();
                                    }else{
                                        me.down('datefield[name=tanggalPersetujuan]').hide();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            hidden:true,
                            fieldLabel: 'Tanggal Persetujuan',
                            name: 'tanggalPersetujuan',
//                            allowBlank: false,
                            format: 'd F Y'
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