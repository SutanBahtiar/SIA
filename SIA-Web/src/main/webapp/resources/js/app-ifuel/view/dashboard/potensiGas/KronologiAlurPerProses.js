
Ext.define('Ifuel.view.dashboard.potensiGas.KronologiAlurPerProses', {
    extend:'Ext.panel.Panel',
    alias:'widget.dashboardPotensiGasKronologiAlurPerProses',
    title:'Dashboard Potensi Gas',
    layout:{
        type:'vbox',
        align:'stretch'
    },
    requires:[
        'Ext.draw.*',
        'Ifuel.view.dashboard.potensiGas.PilihPotensiGas',
        'Ifuel.view.dashboard.potensiGas.DrawKronologis'
    ],

    initComponent:function () {
        var me = this;

        var sprite = Ext.create('Ext.draw.Sprite', {
            type: 'circle',
            fill: '#ff0',
            radius: 30,
            x:50,
            y:50

        });
        //sprite.addListener()
        sprite.addListener('mouseover', function() {
            console.log('mouse over!!');
            console.info(this);
            this.setAttributes({
                fill:'#0000ff'
            },true);
        });


        //component
        var drawComponent = Ext.create('Ext.draw.Component', {
            viewBox: false,
            items:[
                sprite
            ]
        });

        Ext.applyIf(me, {
            items:[
                {
                    xtype:'container',
                    flex:1,
                    layout:{
                        type:'hbox',
                        align:'stretch'
                    },
                    items:[
                        {
                            xtype:'panel',
                            id:'panelKronologisId',
                            screenName : 'panelKronologis',
                            frame:true,
                            flex:1,
                            margin:'5 5 5 10',
                            padding:'7 7 7 7',
                            layout:'fit',
                            items:[
                                Ext.create('Ifuel.view.dashboard.potensiGas.DrawKronologis',{
                                    paramWarnaPotensi : '#ffffff',
                                    paramWarnaDokumenPemasok : '#ffffff',
                                    paramWarnaKunjungan : '#ffffff',
                                    paramWarnaSkPanitia : '#ffffff',
                                    paramWarnaKickOfMeeting : '#ffffff',
                                    paramWarnaMOL : '#ffffff',
                                    paramWarnaHOA : '#ffffff',
                                    paramWarnaPJBG : '#ffffff',

                                    paramJumlahPotensi : '',
                                    paramJumlahDokumenPemasok : '',
                                    paramJumlahKunjungan : '',
                                    paramJumlahSkPanitia : '',
                                    paramJumlahKickOfMeeting : '01',
                                    paramJumlahMOL : '01',
                                    paramJumlahHOA : '',
                                    paramJumlahPJBG : ''
                                })
                            ]

                        }
                    ]
                },
                {
                    xtype:'container',
                    flex:1,
                    layout:{
                        type:'hbox',
                        align:'stretch'
                    },
                    items:[
                        {
                            xtype:'panel',
                            frame:true,
                            flex:1,
                            margin:'5 5 10 10',
                            padding:'7 7 7 7',
                            layout:'fit',
                            items:[
                                drawComponent
                            ]
                        },
                        {
                            xtype:'dashboardPotensiGasPilihPotensiGas',
                            frame:true,
                            flex:1,
                            margin:'5 10 10 5',
                            //padding:'7 7 7 7',
                            layout:'fit'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        this.afterrender();

    },

    afterrender:function(){
        Ext.Ajax.request({
            url:Ifuel.config.kronologisAlurPerProsesUrl,
            success:function (response) {
                var value = Ext.JSON.decode(response.responseText);
                console.info('value', value);
                var drawComponent = Ext.create('Ifuel.view.dashboard.potensiGas.DrawKronologis',{
                    paramWarnaPotensi:'#ffffff',
                    paramWarnaDokumenPemasok : '#ffffff',
                    paramWarnaKunjungan : '#ffffff',
                    paramWarnaSkPanitia : '#ffffff',
                    paramWarnaKickOfMeeting : '#ffffff',
                    paramWarnaMOL : '#ffffff',
                    paramWarnaHOA : '#ffffff',
                    paramWarnaPJBG : '#ffffff',

                    paramJumlahPotensi : value.paramJumlahPotensi,
                    paramJumlahDokumenPemasok : value.paramJumlahDokumenPemasok,
                    paramJumlahKunjungan : value.paramJumlahKunjungan,
                    paramJumlahSkPanitia : value.paramJumlahSkPanitia,
                    paramJumlahKickOfMeeting : value.paramJumlahKickOfMeeting,
                    paramJumlahMOL : value.paramJumlahMOU,
                    paramJumlahHOA : value.paramJumlahHOA,
                    paramJumlahPJBG : value.paramJumlahPJBG
                });

                var panelKronologis =  Ext.getCmp('panelKronologisId');
                panelKronologis.removeAll();
                panelKronologis.add(drawComponent);
                //console.info('panelKronologisId', Ext.getCmp('panelKronologisId'));
            }
        });
    }
});