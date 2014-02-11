Ext.define('Ifuel.view.DashboardChart', {
    extend:'Ext.panel.Panel',
    alias:'widget.dashboardChart',
    title:'Dashboard Chart',
    layout:{
        type:'vbox',
        align:'stretch'
    },
    requires:[
        'Ext.chart.*'
    ],
    generateData:function (n, floor) {
        var data = [],
            p = (Math.random() * 11) + 1,
            i;

        floor = (!floor && floor !== 0) ? 20 : floor;

        for (i = 0; i < (n || 12); i++) {
            data.push({
                name:Ext.Date.monthNames[i % 12],
                data1:Math.floor(Math.max((Math.random() * 100), floor)),
                data2:Math.floor(Math.max((Math.random() * 100), floor)),
                data3:Math.floor(Math.max((Math.random() * 100), floor)),
                data4:Math.floor(Math.max((Math.random() * 100), floor)),
                data5:Math.floor(Math.max((Math.random() * 100), floor)),
                data6:Math.floor(Math.max((Math.random() * 100), floor)),
                data7:Math.floor(Math.max((Math.random() * 100), floor)),
                data8:Math.floor(Math.max((Math.random() * 100), floor)),
                data9:Math.floor(Math.max((Math.random() * 100), floor))
            });
        }

        var x = Ext.JSON.encode(data);
        //console.log('data :' + x);
        return data;
    },

    generateDataNegative:function (n, floor) {
        var data = [],
            p = (Math.random() * 11) + 1,
            i;

        floor = (!floor && floor !== 0) ? 20 : floor;

        for (i = 0; i < (n || 12); i++) {
            data.push({
                name:Ext.Date.monthNames[i % 12],
                data1:Math.floor(((Math.random() - 0.5) * 100), floor),
                data2:Math.floor(((Math.random() - 0.5) * 100), floor),
                data3:Math.floor(((Math.random() - 0.5) * 100), floor),
                data4:Math.floor(((Math.random() - 0.5) * 100), floor),
                data5:Math.floor(((Math.random() - 0.5) * 100), floor),
                data6:Math.floor(((Math.random() - 0.5) * 100), floor),
                data7:Math.floor(((Math.random() - 0.5) * 100), floor),
                data8:Math.floor(((Math.random() - 0.5) * 100), floor),
                data9:Math.floor(((Math.random() - 0.5) * 100), floor)
            });
        }

        return data;
    },

    initComponent:function () {
        var me = this;

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
                            frame:true,
                            flex:1,
                            margin:'5 5 5 10',
                            padding:'7 7 7 7',
                            layout:'fit',
                            items:{
                                xtype: 'gmappanel',
                                zoomLevel: 7,
                                gmapType: 'map',
                                id: 'my_map2',
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
                        },
                        {
                            xtype:'panel',
                            frame:true,
                            flex:1,
                            margin:'5 10 5 5',
                            padding:'7 7 7 7',
                            layout:'fit',
                            items:[
                                {
                                    xtype:'chart',
                                    style:'background:#fff',
                                    theme:'Category2',
                                    insetPadding:20,
                                    animate:true,
                                    store:Ext.create('Ext.data.JsonStore', {
                                        fields:['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
                                        data:me.generateData(),
                                        autoLoad:true
                                    }),
                                    legend:{
                                        position:'right'
                                    },
                                    axes:[
                                        {
                                            type:'Radial',
                                            position:'radial',
                                            label:{
                                                display:true
                                            }
                                        }
                                    ],
                                    series:[
                                        {
                                            showInLegend:true,
                                            type:'radar',
                                            xField:'name',
                                            yField:'data1',
                                            style:{
                                                opacity:0.4
                                            }
                                        },
                                        {
                                            showInLegend:true,
                                            type:'radar',
                                            xField:'name',
                                            yField:'data2',
                                            style:{
                                                opacity:0.4
                                            }
                                        },
                                        {
                                            showInLegend:true,
                                            type:'radar',
                                            xField:'name',
                                            yField:'data3',
                                            style:{
                                                opacity:0.4
                                            }
                                        }
                                    ]
                                }
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
                                {
                                    xtype:'chart',
                                    animate:true,
                                    store:Ext.create('Ext.data.JsonStore', {
                                        fields:['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
                                        data:me.generateData(6, 20),
                                        autoLoad:true
                                    }),
                                    shadow:true,
                                    legend:false,
                                    theme:'Base:gradients',
                                    series:[
                                        {
                                            type:'pie',
                                            field:'data1',
                                            showInLegend:true,
                                            donut:false,
                                            highlight:{
                                                segment:{
                                                    margin:20
                                                }
                                            },
                                            label:{
                                                field:'name',
                                                display:'rotate',
                                                contrast:true,
                                                font:'18px Arial'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype:'panel',
                            frame:true,
                            flex:1,
                            margin:'5 10 10 5',
                            padding:'7 7 7 7',
                            layout:'fit',
                            items:[
                                {
                                    xtype:'chart',
                                    style:'background:#fff',
                                    animate:true,
                                    store:Ext.create('Ext.data.JsonStore', {
                                        fields:['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
                                        data:me.generateData(),
                                        autoLoad:true
                                    }),
                                    legend:false,
                                    axes:[
                                        {
                                            type:'Numeric',
                                            position:'left',
                                            fields:['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                                            grid:{
                                                odd:{
                                                    opacity:1,
                                                    fill:'#ddd',
                                                    stroke:'#bbb',
                                                    'stroke-width':1
                                                }
                                            },
                                            minimum:0,
                                            adjustMinimumByMajorUnit:0
                                        },
                                        {
                                            type:'Category',
                                            position:'bottom',
                                            fields:['name'],
                                            grid:true,
                                            label:{
                                                rotate:{
                                                    degrees:315
                                                }
                                            }
                                        }
                                    ],
                                    series:[
                                        {
                                            type:'area',
                                            highlight:false,
                                            axis:'left',
                                            xField:'name',
                                            yField:['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                                            style:{
                                                opacity:0.93
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });


        me.callParent(arguments);
    }

});