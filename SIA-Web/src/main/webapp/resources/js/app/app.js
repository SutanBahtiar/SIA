/**
 * @author sutan
 */

Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath('Ext.ux', App.config.loaderPath);

/**
 * Buat kebutuhan filter grid
 */
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.toolbar.Paging',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);

Ext.Ajax.request({
    url: App.config.loggedUserUrl,
    success: function(response) {
        var user = Ext.JSON.decode(response.responseText);
        App.util.SecurityHelper.initialize(user);

        Ext.application({
            name: 'App',
//            appFolder: 'js/app',
            appFolder: App.config.appFolder,
            requires: ["App.util.SecurityHelper"],
            stores: ['LoggedUser'],
            controllers: ['body.BodyController', 'tes.TesController'],
            launch: function() {
                var loadingObj = document.getElementById("loading");
                document.body.removeChild(loadingObj);
                Ext.create('App.view.Viewport');
            }
        });
    }
});

//Ext.application({
//    name: 'App',
//    appFolder: 'js/app',
//    controllers: ['body.BodyController', 'tes.TesController'],
//    launch: function() {
//        Ext.create('App.view.Viewport');
//    }
//});
