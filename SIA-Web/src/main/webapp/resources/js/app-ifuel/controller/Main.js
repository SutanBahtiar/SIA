Ext.define('Ifuel.controller.Main', {
    extend: 'Ext.app.Controller',
    views: [ 'Viewport', 'CenterTabPanel', 'Dashboard','dashboard.TerimaBB' ],
    stores: ['MenuTree', "LoggedUser"],
//    stores: ['MenuTree', "LoggedUser", 'MLokasiStore', "TerimaBBStore", "TerimaBBBulananStore", "TerimaBBTahunanStore" ],
    refs: [
        {
            ref: 'treepanel',
            selector: 'treepanel'
        },
        {
            ref: 'centerTabPanel',
            selector: 'centerTabPanel'
        },
        {
            ref: 'loggedUserName',
            selector: '#loggedUserName'
        },
        {
            ref: 'menuTabPanel',
            selector: 'viewport #menutabpanel'
        } ,
        {
            ref: "petaRisikoDataMatrixDashboard",
            selector: 'dashboard petaRisikoDataMatrixDashboard'
        }

    ],


    init: function () {
        this.control({
            'viewport tabpanel toolbar button': {
                click: this.menuButtonClick
            },
            'viewport tabpanel toolbar button menuitem': {
                click: this.menuButtonClick
            },
            'viewport #menutabpanel': {
                afterrender: this.menuTabPanelAfterRender
            }
        });
    },


    menuTabPanelAfterRender: function (cmp) {
        var self = this;
        var toolbars = cmp.query("toolbar");
        Ext.each(toolbars, function (item) {
            var buttonParents = item.query("button[parentMenu=true]");
            Ext.each(buttonParents, function (buttonParent) {
                if (buttonParent.menu) {
                    var menuItems = buttonParent.menu.query("menuitem[hidden=false]");
                    if (menuItems.length == 0) {
                        item.remove(buttonParent);
                    }
                }
            });

            var buttons = item.query("button[hidden=false]");
            if (buttons.length == 0) {
                self.getMenuTabPanel().remove(item);
            }
        });
    },
    menuButtonClick: function (btn, evt) {
        if (btn && !Ext.isEmpty(btn.screenType)) {
            if (btn.widget) {
                Ext.widget(btn.screenType);
            } else {
                this.getCenterTabPanel().displayScreen(btn.screenType);
            }

        }
    }
});