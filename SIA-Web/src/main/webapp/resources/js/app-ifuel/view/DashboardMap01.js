Ext.define('Ifuel.view.DashboardMap01', {
    extend:'Ext.panel.Panel',
    alias:'widget.dashboardMap01',
    title:'Dashboard Map 01',
    layout:{
        type:'vbox',
        align:'stretch'
    },

    requires : [
        'Ext.ux.GMapPanel'
    ],

    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                        {
                            xtype:'panel',
                            frame:true,
                            flex:1,
                            //margin:'5 5 5 10',
                            //padding:'7 7 7 7',
                            layout:'fit',
                            items:{
                                xtype: 'gmappanel',
                                zoomLevel: 7,
                                gmapType: 'map',
                                id: 'my_map3',
                                mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
                                mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
                                setCenter: {
                                    lat: -0.83493,
                                    lng: 116.80664,
                                    marker: {
                                        title: 'PLTU ABCD',
                                        icon : Ifuel.config.resourcesPath + 'img/blue.png'
                                    }
                                },
                                markers: [
                                    {
                                        lat: -1.93323,
                                        lng: 115.62012,
                                        //geoCodeAddr: '465 Huntington Avenue, Boston, MA, 02215-5597, USA',
                                        marker: {
                                            title: 'Sumber Gas 1',
                                            icon : Ifuel.config.resourcesPath + 'img/green.png'
                                        },
                                        listeners: {
                                            click: function(e){
                                                Ext.Msg.alert('Sumber Gas 1');
                                            }
                                        }
                                    },{
                                        lat: 0.52734,
                                        lng: 115.62012,
                                        //geoCodeAddr: '465 Huntington Avenue, Boston, MA, 02215-5597, USA',
                                        marker: {
                                            title: 'Sumber Gas 2',
                                            icon : Ifuel.config.resourcesPath + 'img/green.png'
                                        },
                                        listeners: {
                                            click: function(e){
                                                Ext.Msg.alert('Sumber Gas 2');
                                            }
                                        }
                                    }
                                ],
                                polylines: [
                                    { lat: -1.93323, lng: 115.62012},{ lat: -0.83493, lng: 116.80664} ,
                                    { lat: -0.83493, lng: 116.80664},{ lat: 0.52734, lng: 115.62012}
                                ]
                            }
                        }
            ]
        });

        me.callParent(arguments);
    }

});