Ext.define('Ifuel.view.pengadaan.agendaKunjunganLapangan.AgendaKunjunganLapanganPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.agendaKunjunganLapanganPanel',
    title:'Agenda Kunjungan Lapangan',

    layout:{
        align:'stretch',
        type:'vbox'
    },

    requires:[],

    initComponent:function () {
        Ext.apply(this, {
            items:[
                Ext.create('Ifuel.view.pengadaan.agendaKunjunganLapangan.AgendaKunjunganLapanganGridPanel', {flex:3}),
                Ext.create('Ifuel.view.pengadaan.pesertaKunjunganLapangan.PesertaKunjunganLapanganGridPanel', {
                    title:'Peserta Agenda Kunjungan',
                    flex:2
                })
            ]
        });
        this.callParent(arguments);
    }
})