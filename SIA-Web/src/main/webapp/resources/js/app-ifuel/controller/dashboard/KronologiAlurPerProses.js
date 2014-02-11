Ext.define('Ifuel.controller.dashboard.KronologiAlurPerProses', {
    extend: 'Ext.app.Controller',

    requires:['Ifuel.view.dashboard.potensiGas.DrawKronologis'],

    views: [
        'dashboard.potensiGas.KronologiAlurPerProses',
        'dashboard.potensiGas.PilihPotensiGas'
    ],


    refs: [
        {
            ref: 'drawKronologis',
            selector: 'dashboardPotensiGasKronologiAlurPerProses draw[screenName=drawKronologis]'
        },
        {
            ref: 'panelKronologis',
            selector: 'dashboardPotensiGasKronologiAlurPerProses panel[screenName=panelKronologis]'
        }
    ],

    init: function () {
        this.control({
            'dashboardPotensiGasPilihPotensiGas': {
                selectionchange: this.listSelectionChange
            }
        });

    },

    listSelectionChange: function (sel, selected) {
        if (selected[0]) {
            var jenis = selected[0].data.jenis;

            var drawComponent = null;
            if(jenis=='Pembangkit 1'){
                console.log('-- pilihan1 --');
                drawComponent = Ext.create('Ifuel.view.dashboard.potensiGas.DrawKronologis',{
                    paramWarnaPotensi:'#00ff7f',
                    paramWarnaDokumenPemasok : '#00ff7f',
                    paramWarnaKunjungan : '#00ff7f',
                    paramWarnaSkPanitia : '#00ff7f',
                    paramWarnaKickOfMeeting : '#ffff00',
                    paramWarnaMOL : '#ffffff',
                    paramWarnaHOA : '#ffffff',
                    paramWarnaPJBG : '#ffffff',

                    paramJumlahPotensi : '',
                    paramJumlahDokumenPemasok : '',
                    paramJumlahKunjungan : '',
                    paramJumlahSkPanitia : '',
                    paramJumlahKickOfMeeting : '',
                    paramJumlahMOL : '',
                    paramJumlahHOA : '',
                    paramJumlahPJBG : ''
                });
            }else if(jenis=='Pembangkit 2'){
                console.log('-- pilihan2 --');
                drawComponent = Ext.create('Ifuel.view.dashboard.potensiGas.DrawKronologis',{
                    paramWarnaPotensi:'#00ff7f',
                    paramWarnaDokumenPemasok : '#00ff7f',
                    paramWarnaKunjungan : '#00ff7f',
                    paramWarnaSkPanitia : '#00ff7f',
                    paramWarnaKickOfMeeting : '#00ff7f',
                    paramWarnaMOL : '#ffff00',
                    paramWarnaHOA : '#ffffff',
                    paramWarnaPJBG : '#ffffff',

                    paramJumlahPotensi : '',
                    paramJumlahDokumenPemasok : '',
                    paramJumlahKunjungan : '',
                    paramJumlahSkPanitia : '',
                    paramJumlahKickOfMeeting : '',
                    paramJumlahMOL : '',
                    paramJumlahHOA : '',
                    paramJumlahPJBG : ''
                });
            }else {
                console.log('-- pilihan3 --');
                drawComponent = Ext.create('Ifuel.view.dashboard.potensiGas.DrawKronologis',{
                    paramWarnaPotensi:'#00ff7f',
                    paramWarnaDokumenPemasok : '#00ff7f',
                    paramWarnaKunjungan : '#00ff7f',
                    paramWarnaSkPanitia : '#00ff7f',
                    paramWarnaKickOfMeeting : '#00ff7f',
                    paramWarnaMOL : '#00ff7f',
                    paramWarnaHOA : '#00ff7f',
                    paramWarnaPJBG : '#00ff7f',

                    paramJumlahPotensi : '',
                    paramJumlahDokumenPemasok : '',
                    paramJumlahKunjungan : '',
                    paramJumlahSkPanitia : '',
                    paramJumlahKickOfMeeting : '',
                    paramJumlahMOL : '',
                    paramJumlahHOA : '',
                    paramJumlahPJBG : ''
                });
            }

            this.getPanelKronologis().removeAll();
            this.getPanelKronologis().add(
                drawComponent
            );

        }
    }

});