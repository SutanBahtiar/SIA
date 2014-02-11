Ext.define('Ifuel.view.CenterTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.centerTabPanel',
    split: true,
    activeTab: 0,

    requires : [
        'Ifuel.view.DashboardMap01',
        'Ifuel.view.DashboardMap02'
//        'Ifuel.view.DashboardChart',
//        'Ext.ux.GMapPanel'
//        'Ifuel.view.dashboard.potensiGas.KronologiAlurPerProses'
//TODO hapus saja ini nanti
//
//
//        'Ifuel.view.pengadaan.potensiGas.tabpotensigas',
//        'Ifuel.view.pengadaan.potensiGas.potensigas',
//        'Ifuel.view.pengadaan.potensiGas.tabpotensigas',
//        'Ifuel.view.pengadaan.potensiGas.pilihpotensigas',
//        'Ifuel.view.pengadaan.potensiGas.potensigas2',
//        'Ifuel.view.pengadaan.potensiGas.uploadpotensigas',
//
//        'Ifuel.view.pengadaan.divmumSK.formSK',
//        'Ifuel.view.pengadaan.divmumSK.daftarRincianSKTab',
//        'Ifuel.view.pengadaan.divmumSK.tabSK',
//        'Ifuel.view.pengadaan.divmumSK.detilFormSK',
//
//        //KHOA
//        'Ifuel.view.pengadaan.panitiaKHOA.buatKHOA_entriIsu',
//        'Ifuel.view.pengadaan.panitiaKHOA.buatKHOA_pilihNoMOU',
//        'Ifuel.view.pengadaan.panitiaKHOA.historyKHOA_pilihNoKHOA',
//        'Ifuel.view.pengadaan.panitiaKHOA.historyKHOA_cekIsu',
//        'Ifuel.view.pengadaan.panitiaKHOA.rincianKHOA_pilihNoKHOA',
//        'Ifuel.view.pengadaan.panitiaKHOA.rincianKHOA_detilKHOA',
//        'Ifuel.view.pengadaan.panitiaKHOA.tabBuatKHOA',
//        'Ifuel.view.pengadaan.panitiaKHOA.tabHistoryKHOA',
//        'Ifuel.view.pengadaan.panitiaKHOA.tabDaftarRincianKHOA',
//
//
//        //KPJBG
//        'Ifuel.view.pengadaan.panitiaKPJBG.buatKPJBG.entriIsu',
//        'Ifuel.view.pengadaan.panitiaKPJBG.buatKPJBG.pilihNoMOU',
//        'Ifuel.view.pengadaan.panitiaKPJBG.historyKPJBG.cekIsu',
//        'Ifuel.view.pengadaan.panitiaKPJBG.historyKPJBG.historyPilihNoKPJBG',
//        'Ifuel.view.pengadaan.panitiaKPJBG.rincianKPJBG.detilKPJBG',
//        'Ifuel.view.pengadaan.panitiaKPJBG.rincianKPJBG.rincianPilihNoKPJBG',
//        'Ifuel.view.pengadaan.panitiaKPJBG.buatKPJBG.tabBuatKPJBG',
//        'Ifuel.view.pengadaan.panitiaKPJBG.historyKPJBG.tabHistoryKPJBG',
//        'Ifuel.view.pengadaan.panitiaKPJBG.rincianKPJBG.tabDaftarRincianKPJBG',
//
//
//        //HOA
//        //buatHOA
//        'Ifuel.view.pengadaan.hoa.buatHOA.pilihNoKHOA',
//        'Ifuel.view.pengadaan.hoa.buatHOA.pilihIsuHOA',
//        'Ifuel.view.pengadaan.hoa.buatHOA.tabHOA',
//        //'Ifuel.view.pengadaan.hoa.buatHOA.Testing',
//
//         //daftar rincian HOA
//        'Ifuel.view.pengadaan.hoa.daftarRincianHOA.pilihNoHOA',
//        'Ifuel.view.pengadaan.hoa.daftarRincianHOA.detilHOA',
//        'Ifuel.view.pengadaan.hoa.daftarRincianHOA.tabDaftarRincianHOA',
//
//        //Finalisasi KPJBG
//        //buatFinalisasiKPJBG
//        'Ifuel.view.pengadaan.FinalisasiKPJBG.buatFinalisasiKPJBG.pilihIsuFKPJBG',
//        'Ifuel.view.pengadaan.FinalisasiKPJBG.buatFinalisasiKPJBG.pilihNoKPJBG_FKPJBG',
//        'Ifuel.view.pengadaan.FinalisasiKPJBG.buatFinalisasiKPJBG.tabFinalisasiKPJBG_FKPJBG',
//        //daftarRincianFinalisasiKPJBG
//        'Ifuel.view.pengadaan.FinalisasiKPJBG.daftarRincianFinalisasiKPJBG.detilFKPJBG',
//        'Ifuel.view.pengadaan.FinalisasiKPJBG.daftarRincianFinalisasiKPJBG.rincianFKPJBGpilihNoKPJBG',
//        'Ifuel.view.pengadaan.FinalisasiKPJBG.daftarRincianFinalisasiKPJBG.tabDaftarRincianFKPJBG',
//
//        //pjbg
//        //buatpjbg
//        'Ifuel.view.pengadaan.pjbg.buatPJBG.pjbgPilihNoKPJBG',
//        'Ifuel.view.pengadaan.pjbg.buatPJBG.tabBuatPJBG',
//        'Ifuel.view.pengadaan.pjbg.buatPJBG.formPJBG1',
//        'Ifuel.view.pengadaan.pjbg.buatPJBG.formPJBG2',
//        'Ifuel.view.pengadaan.pjbg.buatPJBG.pasalPJBG',
//        'Ifuel.view.pengadaan.pjbg.buatPJBG.gasInCommissioning',
//        'Ifuel.view.pengadaan.pjbg.buatPJBG.keytermPJBGonPJBG',
//        'Ifuel.view.pengadaan.pjbg.buatPJBG.x',
//
//        'Ifuel.view.pengadaan.pjbg.buatPJBG.y',
//        'Ifuel.view.pengadaan.pjbg.buatPJBG.spesifikasiGas',
//
//        //daftarRincianPJBG
//        'Ifuel.view.pengadaan.pjbg.daftarRincianPJBG.rincianPJBG',
//        'Ifuel.view.pengadaan.pjbg.daftarRincianPJBG.tabRincianPJBG',
//        'Ifuel.view.pengadaan.pjbg.daftarRincianPJBG.ddrPJBG1',
//        'Ifuel.view.pengadaan.pjbg.daftarRincianPJBG.ddrPJBG2',
//        'Ifuel.view.pengadaan.pjbg.daftarRincianPJBG.ddrPasalPJBG',
//        'Ifuel.view.pengadaan.pjbg.daftarRincianPJBG.ddrGasInCommissioning',
//        'Ifuel.view.pengadaan.pjbg.daftarRincianPJBG.ddrKPJBGonPJBG',
//        'Ifuel.view.pengadaan.pjbg.daftarRincianPJBG.ddrSpesifikasiGas',
//
//        'Ifuel.view.pengadaan.kunjunganLapangan.KunjunganLapangan',
//        'Ifuel.view.pengadaan.kunjunganLapangan.TabKunjunganLapangan',
//        'Ifuel.view.pengadaan.kunjunganLapangan.test',
//        'Ifuel.view.pengadaan.kunjunganLapangan.Agenda',
//        'Ifuel.view.pengadaan.kunjunganLapangan.DaftarRincian',
//        'Ifuel.view.pengadaan.kunjunganLapangan.LaporanKunjLapangan',
//        'Ifuel.view.pengadaan.kunjunganLapangan.LaporanAgenda',
//        'Ifuel.view.pengadaan.MOU.PilihSumberGas',
//        'Ifuel.view.pengadaan.MOU.TabSumberGas',
//        'Ifuel.view.pengadaan.MOU.IsiForm',
//        'Ifuel.view.pengadaan.MOU.EditPasal',
//        'Ifuel.view.pengadaan.MOU.TabSumberGas2',
//        'Ifuel.view.pengadaan.MOU.DaftarRincianMOU',
//        'Ifuel.view.pengadaan.MOU.DetailMOU',
//        'Ifuel.view.pengadaan.panitiakom.TabPanitiaKom',
//        'Ifuel.view.pengadaan.panitiakom.PilihPotensiGas',
//        'Ifuel.view.pengadaan.panitiakom.KomSatu',
//        'Ifuel.view.pengadaan.panitiakom.TabDaftarRincianKOM',
//        'Ifuel.view.pengadaan.panitiakom.DaftarRincianKOM'
//

    ],

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
//                {
//                    xtype: 'dashboardMap01',
//                    tabConfig: {
//                        xtype: 'tab',
//                        items: [
//
//                        ]
//                    }
//                },
//                {
//                    xtype: 'dashboardMap02',
//                    tabConfig: {
//                        xtype: 'tab',
//                        closable:true
//                    }
//                }
            ]
        });

        me.callParent(arguments);
    },


    displayScreen: function (screenType, data) {
        var self = this;
        var screen = self.child(screenType);
        if (screen) {
            if (data) {
                screen.initialComboValue = data;
                if (Ext.isFunction(screen.getComboStore)) {
                    screen.getComboStore().load(function () {
                        if (Ext.isFunction(screen.setMainComboValue)) {
                            screen.setMainComboValue();
                        }
                    });
                }
            }
            self.setActiveTab(screen);
        } else {
            this.add({
                xtype: screenType,
                tabConfig: {
                    xtype: 'tab',
                    closable: true
                }
            });
            screen = self.child(screenType);
            if (data) {
                screen.initialComboValue = data;
                if (Ext.isFunction(screen.getComboStore)) {
                    screen.getComboStore().load(function () {
                        if (Ext.isFunction(screen.setMainComboValue)) {
                            screen.setMainComboValue();
                        }
                    });
                }
            }
            self.setActiveTab(screen);
        }
    }

});