Ext.define('Ifuel.view.dashboard.potensiGas.DrawKronologis',{
    extend:'Ext.draw.Component',
    alias:'widget.dashboardPotensiGasDrawKronologis',

    store:'KronologiAlurPerProses',

    requires:['Ext.draw.*'],

    viewBox: false,

    //paramWarna
    paramWarnaPotensi : null,
    paramWarnaDokumenPemasok : null,
    paramWarnaKunjungan : null,
    paramWarnaSkPanitia : null,
    paramWarnaKickOfMeeting : null,
    paramWarnaMOL : null,
    paramWarnaHOA : null,
    paramWarnaPJBG : null,

    //paramJumlah
    paramJumlahPotensi : null,
    paramJumlahDokumenPemasok : null,
    paramJumlahKunjungan : null,
    paramJumlahSkPanitia : null,
    paramJumlahKickOfMeeting : null,
    paramJumlahMOL : null,
    paramJumlahHOA : null,
    paramJumlahPJBG : null,


    initComponent: function (config) {
        var self = this;
        Ext.apply(self, {
            items : [
                //Start
                {
                    type: 'circle',
                    fill: '#0000ff',
                    radius: 20,
                    x: 25,
                    y: 25
                },{
                    childName:'child01',
                    type: 'circle',
                    fill: '#ffffff',
                    radius: 18,
                    x: 25,
                    y: 25
                },{
                    type: 'text',
                    text: 'Start',
                    x: 13,
                    y: 24,
                    textStyle: {
                        fill: '#000',
                        font: '18px Arial'
                    }
                },{
                    type: 'rect',
                    fill: '#0000ff',
                    width: 50,
                    height:2,
                    x:29,
                    y:58,
                    rotate:{
                        degrees:45
                    }
                },
                //Potensi
                {
                    type: 'circle',
                    fill: '#0000ff',
                    radius: 30,
                    x: 90,
                    y: 100
                },{
                    type: 'circle',
                    fill: this.paramWarnaPotensi,
                    radius: 28,
                    x: 90,
                    y: 100
                },{
                    type: 'text',
                    text: this.paramJumlahPotensi,
                    x: 82,
                    y: 100,
                    'font-size':24
                },{
                    type: 'text',
                    text: 'Potensi',
                    x: 70,
                    y: 140,
                    textStyle: {
                        fill: '#000',
                        font: '18px Arial'
                    }
                },{
                    type: 'rect',
                    fill: '#0000ff',
                    width: 150,
                    height:2,
                    x:93,
                    y:170,
                    rotate:{
                        degrees:45
                    }
                },{
                    type: 'rect',
                    fill: '#0000ff',
                    width: 100,
                    height:2,
                    x:120,
                    y:100
                },
                //dokumen pemasok
                {
                    type: 'circle',
                    fill: '#0000ff',
                    radius: 30,
                    x: 250,
                    y: 100
                },{
                    type: 'circle',
                    fill: this.paramWarnaDokumenPemasok,
                    radius: 28,
                    x: 250,
                    y: 100
                },{
                    type: 'text',
                    text: this.paramJumlahDokumenPemasok,
                    x: 242,
                    y: 100,
                    'font-size':24
                },{
                    type: 'text',
                    text: 'Dokumen Pemasok',
                    x: 200,
                    y: 140,
                    textStyle: {
                        fill: '#000',
                        font: '18px Arial'
                    }
                },{
                    type: 'rect',
                    fill: '#0000ff',
                    width: 100,
                    height:2,
                    x:280,
                    y:100
                },
                //Kunjungan
                {
                    type: 'circle',
                    fill: '#0000ff',
                    radius: 30,
                    x: 250,
                    y: 220
                },{
                    type: 'circle',
                    fill: this.paramWarnaKunjungan,
                    radius: 28,
                    x: 250,
                    y: 220
                },{
                    type: 'text',
                    text: this.paramJumlahKunjungan,
                    x: 242,
                    y: 220,
                    'font-size':24
                },{
                    type: 'text',
                    text: 'Kunjungan',
                    x: 220,
                    y: 260,
                    textStyle: {
                        fill: '#000',
                        font: '18px Arial'
                    }
                },{
                    type: 'rect',
                    fill: '#0000ff',
                    width: 150,
                    height:2,
                    x:255,
                    y:175,
                    rotate:{
                        degrees:-45
                    }
                },
                // SK Panitia
                {
                    type: 'circle',
                    fill: '#0000ff',
                    radius: 30,
                    x: 400,
                    y: 100
                },{
                    type: 'circle',
                    fill: this.paramWarnaSkPanitia,
                    radius: 28,
                    x: 400,
                    y: 100
                },{
                    type: 'text',
                    text: this.paramJumlahSkPanitia,
                    x: 392,
                    y: 100,
                    'font-size':24
                },{
                    type: 'text',
                    text: 'SK Panitia',
                    x: 400,
                    y: 140,
                    textStyle: {
                        fill: '#000',
                        font: '18px Arial'
                    }
                },{
                    type: 'rect',
                    fill: '#0000ff',
                    width: 92,
                    height:2,
                    x:428,
                    y:100
                },
                //kick of meeting
                {
                    type: 'circle',
                    fill: '#0000ff',
                    radius: 30,
                    x: 550,
                    y: 100
                },{
                    type: 'circle',
                    fill: this.paramWarnaKickOfMeeting,
                    radius: 28,
                    x: 550,
                    y: 100
                },{
                    type: 'text',
                    text: this.paramJumlahKickOfMeeting,
                    x: 542,
                    y: 100,
                    'font-size':24
                },{
                    type: 'text',
                    text: 'Kick of Meeting',
                    x: 510,
                    y: 140,
                    textStyle: {
                        fill: '#000',
                        font: '18px Arial'
                    }
                },{
                    type: 'rect',
                    fill: '#0000ff',
                    width: 100,
                    height:2,
                    x:580,
                    y:100
                },
                //MOL
                {
                    type: 'circle',
                    fill: '#0000ff',
                    radius: 30,
                    x: 700,
                    y: 100
                },{
                    type: 'circle',
                    fill: this.paramWarnaMOL,
                    radius: 28,
                    x: 700,
                    y: 100
                },{
                    type: 'text',
                    text: this.paramJumlahMOL,
                    x: 692,
                    y: 100,
                    'font-size':24
                },{
                    type: 'text',
                    text: 'MOL',
                    x: 690,
                    y: 140,
                    textStyle: {
                        fill: '#000',
                        font: '18px Arial'
                    }
                },{
                    type: 'rect',
                    fill: '#0000ff',
                    width: 145,
                    height:2,
                    x:693,
                    y:174,
                    rotate:{
                        degrees:45
                    }
                },{
                    type: 'rect',
                    fill: '#0000ff',
                    width: 150,
                    height:2,
                    x:555,
                    y:175,
                    rotate:{
                        degrees:-45
                    }
                },
                //HOA
                {
                    type: 'circle',
                    fill: '#0000ff',
                    radius: 30,
                    x: 600,
                    y: 220
                },{
                    type: 'circle',
                    fill: this.paramWarnaHOA,
                    radius: 28,
                    x: 600,
                    y: 220
                },{
                    type: 'text',
                    text: this.paramJumlahHOA,
                    x: 592,
                    y: 220,
                    'font-size':24
                },{
                    type: 'text',
                    text: 'HOA',
                    x: 580,
                    y: 260,
                    textStyle: {
                        fill: '#000',
                        font: '18px Arial'
                    }
                },{
                    type: 'rect',
                    fill: '#0000ff',
                    width: 140,
                    height:2,
                    x:630,
                    y:220
                },
                //PJBG
                {
                    type: 'circle',
                    fill: '#0000ff',
                    radius: 30,
                    x: 800,
                    y: 220
                },{
                    type: 'circle',
                    fill: this.paramWarnaPJBG,
                    radius: 28,
                    x: 800,
                    y: 220
                },{
                    type: 'text',
                    text: this.paramJumlahPJBG,
                    x: 792,
                    y: 220,
                    'font-size':24
                },{
                    type: 'text',
                    text: 'PJBG',
                    x: 790,
                    y: 260,
                    textStyle: {
                        fill: '#000',
                        font: '18px Arial'
                    }
                },{
                    type: 'rect',
                    fill: '#0000ff',
                    width: 150,
                    height:2,
                    x:808,
                    y:160,
                    rotate:{
                        degrees:-45
                    }
                },
                //End
                {
                    type: 'circle',
                    fill: '#0000ff',
                    radius: 20,
                    x: 932,
                    y: 110
                },{
                    type: 'circle',
                    fill: '#ffffff',
                    radius: 18,
                    x: 932,
                    y: 110
                },{
                    type: 'text',
                    text: 'End',
                    x: 922,
                    y: 110,
                    textStyle: {
                        fill: '#000',
                        font: '18px Arial'
                    }
                }
            ]

        });

        this.callParent(arguments);

    }


})