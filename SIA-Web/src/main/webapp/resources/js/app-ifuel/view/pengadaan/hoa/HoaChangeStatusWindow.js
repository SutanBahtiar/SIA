/**
 * Created with IntelliJ IDEA.
 * User: Latif
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.pengadaan.hoa.HoaChangeStatusWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.hoaChangeStatusWindow',
    title: 'Change Status',

    autoShow: true,
    resizable: false,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

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
            defaults: {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                width: 400,
                style: 'background-color: #fff;'
            },
            items: [
                {
                    groupField:'status',
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
                                        me.down('form[groupField=persetujuan]').show();
                                    }else{
                                        me.down('form[groupField=persetujuan]').hide();
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    hidden:true,
                    groupField:'persetujuan',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 130
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Tanggal Persetujuan',
                            name: 'tglHoa',
                            allowBlank: false,
                            format: 'd F Y'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Disetujui Oleh',
                            allowBlank: false,
                            name: 'disetujuiOleh'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Jabatan',
                            allowBlank: false,
                            name: 'jabatanPersetujuan'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Keterangan',
                            name: 'keteranganPersetujuan'
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