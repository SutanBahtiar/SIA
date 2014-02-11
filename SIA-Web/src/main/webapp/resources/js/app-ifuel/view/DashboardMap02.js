Ext.define('Ifuel.view.DashboardMap02', {
    extend:'Ext.panel.Panel',
    alias:'widget.dashboardMap02',
    title:'Dashboard Map 02',
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

                        title:'Maps',
                        xtype: 'gmappanel',
                        zoomLevel: 5,
                        gmapType: 'map',
                        id: 'my_map',
                        mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
                        mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
                        setCenter: {
                            //geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
                            lat: -0.83493,
                            lng: 116.80664
                            //marker: {title: 'Jakarta'}
                        },
                        markers: [
                            {
                                lat: 5.09094,
                                lng: 96.65771,
                                marker: {
                                    title: 'Sumber Gas 01',
                                    //icon : Icon.config.resourcesPath + 'img/1hjaelp.gif',
                                    optimized:false,
                                    icon : Ifuel.config.resourcesPath + 'img/fillingstation.png'
                                }
                            },{
                                lat: 1.64772,
                                lng: 101.32690,
                                marker: {
                                    title: 'Sumber Gas 02',
                                    icon : Ifuel.config.resourcesPath + 'img/fillingstation.png',
                                    draggable: true,
                                    status: 'pending'
                                },
                                listeners: {
                                    click: function(e){
                                        Ext.Msg.alert('Its fine', 'and its art.');
                                    },
                                    dragstart:function(e){
                                        Ext.getCmp('my_map').dragStart();
                                    },
                                    dragend:function(e){
                                        Ext.getCmp('my_map').dropSumberGas(this,1.64772,101.32690);
                                    }
                                }
                            },{
                                lat: -0.50536,
                                lng: 104.41406,
                                marker: {
                                    title: 'PLTU 01',
                                    icon : Ifuel.config.resourcesPath + 'img/fillingstation.png'
                                },
                                listeners: {
                                    click: function(e){
                                        Ext.Msg.alert('Its fine', 'and its art.');
                                    }
                                }
                            },{
                                lat: -2.85526,
                                lng: 107.88574,
                                marker: {
                                    title: 'PLTU 02',
                                    icon : Ifuel.config.resourcesPath + 'img/powerplant-red.png'
                                },
                                listeners: {
                                    click: function(e){
                                        Ext.getCmp('my_map').showPotensiGas(this);
                                    }
                                }
                            },{
                                lat: -6.31530,
                                lng: 106.04004,
                                marker: {
                                    title: 'PLTU 03',
                                    icon : Ifuel.config.resourcesPath + 'img/powerplant-green.png'
                                },
                                listeners: {
                                    click: function(e){
                                        Ext.getCmp('my_map').showPotensiGas(this);
                                    },
                                    mouseover:function(e){
                                        Ext.getCmp('my_map').myTest(this);
                                    }

                                }
                            },{
                                lat: -7.01367,
                                lng: 112.47803,
                                marker: {
                                    title: 'Sumber Gas 03',
                                    icon : Ifuel.config.resourcesPath + 'img/fillingstation.png',
                                    draggable: true,
                                    status: 'final'
                                },
                                listeners: {
                                    click: function(e){
                                        Ext.Msg.alert('Its fine', 'and its art.');
                                    },
                                    dragstart:function(e){
                                        Ext.getCmp('my_map').dragStart();
                                    },
                                    dragend:function(e){
                                        Ext.getCmp('my_map').dropSumberGas(this,-7.01367,112.47803);
                                    }
                                }
                            },{
                                lat: 0.17578,
                                lng: 117.35596,
                                marker: {
                                    title: 'Sumber Gas 04',
                                    icon : Ifuel.config.resourcesPath + 'img/fillingstation.png'
                                },
                                listeners: {
                                    click: function(e){
                                        Ext.Msg.alert('Its fine', 'and its art.');
                                    }
                                }
                            } ,{
                                lat: -2.13086,
                                lng: 132.62695,
                                marker: {
                                    title: 'Sumber Gas 05',
                                    icon : Ifuel.config.resourcesPath + 'img/fillingstation.png',
                                    infoWindow:{
                                        content :
                                            '<div id="content">'+
                                                '<div id="siteNotice">'+
                                                '</div>'+
                                                '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
                                                '<div id="bodyContent">'+
                                                '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                                                'sandstone rock formation in the southern part of the '+
                                                'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
                                                'south west of the nearest large town, Alice Springs; 450&#160;km '+
                                                '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
                                                'features of the Uluru - Kata Tjuta National Park. Uluru is '+
                                                'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
                                                'Aboriginal people of the area. It has many springs, waterholes, '+
                                                'rock caves and ancient paintings. Uluru is listed as a World '+
                                                'Heritage Site.</p>'+
                                                '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                                                'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                                                '(last visited June 22, 2009).</p>'+
                                                '</div>'+
                                                '</div>'
                                    }
                                }
                            }

                        ]
                    }
                }
            ]
        });

        me.callParent(arguments);
    }

});