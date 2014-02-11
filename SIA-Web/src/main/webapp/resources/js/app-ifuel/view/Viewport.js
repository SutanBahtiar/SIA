Ext.define('Ifuel.view.Viewport', {
    extend:'Ext.container.Viewport',
    alias:'widget.viewport',
    layout:{
        type:'border',
        padding:'3 3 3 3'
    },

    requires:[],

    initComponent:function () {
        var me = this;
        Ext.applyIf(me, {
            items:[
                {
                    xtype:'container',
                    frame:true,
                    margin:'0 0 3 0',
                    region:'north',
                    height:100,
                    layout:'border',
                    items:[
                        {
                            xtype:'panel',
                            frame:true,
                            margin:'3 3 3 3',
                            region:'west',
                            width:100,
                            html:'<div align="left" ><img height="100px" width="100px" style="height: 90px; width: 90px" src="' + Ifuel.config.resourcesPath + 'img/logo3.jpg" / > ' +
                                '</div>'
                        },
                        {
                            xtype:'tabpanel',
                            id:'menutabpanel',
                            region:'center',
                            frame:true,
                            items:[
                                {
                                    xtype:'toolbar',
                                    iconCls:'fam-house',
                                    title:" ",
                                    tabConfig:{
                                        xtype:'tab'
                                    },
                                    defaults:{
                                        iconAlign:'top',
                                        scale:'large',
                                        xtype:'button',
                                        minWidth:75
                                    },
                                    items:[
                                        {
                                            text:"Dashboard 01",
                                            iconCls:'icon-dashboard',
                                            screenType:'dashboardMap01',
                                            hidden:false
                                        },
                                        {
                                            text:"Dashboard 02",
                                            iconCls:'icon-dashboard',
                                            screenType:'dashboardMap02',
                                            hidden:false
                                        },
                                        {
                                            text:"Dashboard Chart",
                                            iconCls:'icon-dashboard',
                                            screenType:'dashboardChart',
                                            hidden:false
                                        },
                                        {
                                            text:"Dashboard Potensi Gas",
                                            iconCls:'icon-dashboard',
                                            screenType:'dashboardPotensiGasKronologiAlurPerProses',
                                            hidden:false
                                        }
                                    ]
                                },
                                {
                                    xtype:'toolbar',
                                    iconCls:'fam-house',
                                    title:"Pengadaan ",
                                    tabConfig:{
                                        xtype:'tab'
                                    },
                                    defaults:{
                                        iconAlign:'top',
                                        scale:'large',
                                        xtype:'button',
                                        minWidth:75
                                    },
                                    items:[
                                        {
                                            text:'Potensi Gas',
                                            iconCls:'icon-potensi-gas',
                                            screenType:'pengadaanPotensiGasPanel'
                                        },
                                        {
                                            text:'Kunjungan Lapangan',
                                            iconCls:'icon-kunj-lap',
                                            screenType:'kunjunganLapanganPanel'
                                        },
                                        {
                                            text:'SK Panitia',
                                            iconCls:'icon-sk-panitia',
                                            screenType:'skPanitiaPanel'
                                        },
                                        {
                                            text:'Kick-off Meeting',
                                            iconCls:'icon-kom',
                                            screenType:'komPanel'
                                        },
                                        {
                                            text:'MoU',
                                            iconCls:'icon-mou',
                                            screenType:'mouPanel'
                                        },
                                        {
                                            text:'Head of Agreement',
                                            iconCls:'icon-hoa',
                                            screenType:'hoaPanel'
                                        },
                                        {
                                            text:'Keyterms',
                                            iconCls:'icon-ktagreements',
                                            screenType:'keytermsPanel'
                                        },
                                        {
                                            text:'PJBG',
                                            iconCls:'icon-pjbg',
                                            screenType:'pjbgPanel'
                                        },
                                        {
                                            text: 'Report',
                                            iconCls: 'icon-matriks',
                                            arrowAlign: 'right',
                                            parentMenu: true,
                                            menu:{
                                                items: [
                                                    {
                                                        text:"Potensi Gas",
                                                        iconCls:'fam-printer',
                                                        screenType:'reportPotensiGasPanel'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype:'toolbar',
                                    iconCls:'fam-cog',
                                    title:"Admin",
                                    tabConfig:{
                                        xtype:'tab'
                                    },
                                    defaults:{
                                        iconAlign:'top',
                                        scale:'large',
                                        xtype:'button',
                                        minWidth:75
                                    },
                                    items:[
                                        {
                                            text:"Security",
                                            iconCls:'icon-security',
                                            arrowAlign:'right',
                                            parentMenu:true,
                                            menu:{
                                                items:[
                                                    {
                                                        text:"Role",
                                                        iconCls:'fam-keyboard',
                                                        hidden:!Ifuel.util.SecurityHelper.isReadAllowed("ROLE"),
                                                        screenType:'roleList'
                                                    } ,
                                                    {
                                                        text:"Group",
                                                        iconCls:'fam-keyboard',
                                                        hidden:!Ifuel.util.SecurityHelper.isReadAllowed("GROUP"),
                                                        screenType:'groupList'
                                                    },
                                                    {
                                                        text:"User",
                                                        iconCls:'fam-keyboard',
                                                        hidden:!Ifuel.util.SecurityHelper.isReadAllowed("USER"),
                                                        screenType:'userList'
                                                    },
                                                    {
                                                        text:"User Activity",
                                                        iconCls:'fam-keyboard',
                                                        hidden:!Ifuel.util.SecurityHelper.isReadAllowed("USER_ACTIVITY"),
                                                        screenType:'userActivityList'
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            text: 'Data Master',
                                            iconCls: 'icon-datamaster',
                                            arrowAlign: 'right',
                                            parentMenu: true,
                                            menu:{
                                                items: [
                                                    {
                                                        text:"Master Unit PLN",
                                                        iconCls:'fam-keyboard',
                                                        screenType:'orgPlnPanel'
                                                    },
                                                    {
                                                        text:"Master Pemasok",
                                                        iconCls:'fam-keyboard',
                                                        screenType:'pemasokPanel'
                                                    },
                                                    {
                                                        text:"Master Sumber Gas",
                                                        iconCls:'fam-keyboard',
                                                        screenType:'sumberGasPanel'
                                                    },
                                                    {
                                                        text:"Master Person",
                                                        iconCls:'fam-keyboard',
                                                        screenType:'personPanel'
                                                    },
                                                    {
                                                        text:"Master PLTGU",
                                                        iconCls:'fam-keyboard',
                                                        screenType:'pltgmPanel'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            xtype:'button',
                            width:100,
                            margin:'3 3 3 0',
                            region:'east',
                            scale:'large',
                            iconAlign:'top',
                            iconCls:'icon-user',
                            text:'Logged as <br/> <b>' + Ifuel.util.SecurityHelper.getNama() + '</b>',
                            arrowAlign:'bottom',
                            menu:{
                                items:[
                                    {
                                        text:'Change Password',
                                        iconCls:'fam-keyboard',
                                        handler:function () {
                                        }
                                    },
                                    {
                                        text:'Logout',
                                        iconCls:'fam-door-out',
                                        handler:function () {
                                            window.location = Ifuel.config.logoutUrl;
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                } ,

                {
                    split:true,
                    frame:true,
                    xtype:'panel',
                    region:'center',
                    layout:'fit',
                    items:[
                        {
                            xtype:'centerTabPanel',
                            region:'center'
                        }
                    ]
                }


            ]
        });

        me.callParent(arguments);
    }

});