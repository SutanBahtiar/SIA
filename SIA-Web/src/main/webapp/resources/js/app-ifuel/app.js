Ext.Loader.setConfig({enabled:'true'});
Ext.Loader.setPath('Ext.ux', Ifuel.config.loaderPath);
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.toolbar.Paging',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);
Ext.Ajax.request({
    url:Ifuel.config.loggedUserUrl,
    success:function (response) {
        var user = Ext.JSON.decode(response.responseText);
        Ifuel.util.SecurityHelper.initialize(user);

        Ext.application({
            name:'Ifuel',
            appFolder:Ifuel.config.appFolder,
            requires:["Ifuel.util.SecurityHelper", "Ifuel.util.MessageBox", "Ifuel.util.SystemUtil"],

            //TODO stores + controller harus dirapikan
            stores:[
                'LoggedUser'
            ],

            controllers:[
                'Main', 'Role', 'Group', 'User', 'UserActivity',
                //controller pada modul pengadaan
                'pengadaan.PotensiGasController',


                'master.PemasokController',
                'master.OrgPlnController',
                'master.SumberGasController',
                'master.PersonController',
                'master.PltgmController',

                'pengadaan.KunjunganLapanganController',
                'pengadaan.SkPanitiaController',
                'pengadaan.KomController',
                'pengadaan.MouController',
                'pengadaan.HoaController',
                'pengadaan.KeytermsController',
                'pengadaan.PjbgController',
                
                'report.ReportPotensiGasController'
            ],

            launch:function () {
                var loadingObj = document.getElementById("loading");
                document.body.removeChild(loadingObj);
                Ext.create('Ifuel.view.Viewport');
            }
        });

    }
});

Ext.apply(Ext.form.field.VTypes, {
    phoneText: 'Nomor telepon tidak valid. Nomor telepon harus diisi dalam format (kode area)-(nomor telepon). Contoh: 021-5556677 atau 0274-777888.',
    phoneMask: /[\-\d.Ext]/,
    phoneRe: /^\d{3,4}\-\d{5,8}/,
    phone: function (v) {
        return this.phoneRe.test(v);
    }
});

Ext.apply(Ext.form.field.VTypes, {
    faxText: 'Nomor fax tidak valid. Nomor fax harus diisi dalam format (kode area)-(nomor fax). Contoh: 021-5556677 atau 0274-777888.',
    faxMask: /[\-\d.Ext]/,
    faxRe: /^\d{3,4}\-\d{5,8}/,
    fax: function (v) {
        return this.phoneRe.test(v);
    }
});

