/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/15/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ifuel.view.master.person.PersonWindowChooser', {
    extend: 'Ext.window.Window',
    alias: 'widget.personWindowChooser',
    title: 'Pilih Person',

    autoShow: true,
    resizable: false,
    modal: true,
    layout: 'fit',

    initComponent: function () {
        var me = this;

        var grid = Ext.create('Ifuel.view.master.person.PersonGridPanel',
            {
                title: null,
                selModel: Ext.create('Ext.selection.CheckboxModel'),
                height: 300,
                width: 700,
                withTbar: true
            }
        );

        Ext.apply(this, {
            items: [
                grid
            ]
        });

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Batal',
                scope: this,
                handler: this.close
            }
        ];

        /**
         * buat event ketika tombol new ditekan. muncul form window untuk menambah person baru
         */
        grid.down('button[action=new]').on('click', function () {

            var personWindow = Ext.create('Ifuel.view.master.person.PersonFormWindow');

            /**
             * even ketika tombol save pada person window ditekan
             */
            personWindow.down('button[action=save]').on('click', function () {
                var form = personWindow.down('form');
                var values = form.getValues();

                var data = {
                    id: null,
                    nama: values.nama,
                    nipPerson: values.nipPerson,
                    jabatan: values.jabatan,
                    noTelp: values.noTelp,
                    email: values.email,
                    tmOrgPln: (values.tipePerson == 'PLN') ? {
                        id: values.organisasiId
                    } : null,
                    tmPemasok: (values.tipePerson == 'PEMASOK') ? {
                        id: values.organisasiId
                    } : null
                };

                if (form.getForm().isValid()) {

                    Ext.Ajax.request({
                        url: Ifuel.config.personUrl,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: Ext.JSON.encode(data),
                        success: function (response, options) {
                            grid.getStore().reload();
                            Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Person');
                            personWindow.close();
                        },
                        failure: function (response, options) {
                            Ifuel.util.MessageBox.showMessageBoxPostPut(response, options, 'Person');
                        }
                    });
                }

            }, this);

        }, this);

        this.callParent(arguments);
    },

    setUrl: function (url) {
        var store = this.down('personGridPanel').getStore();
        var proxy = {
            type: 'ajax',
            pageParam: 'page.page',
            url: url,
            reader: {
                type: 'json',
                root: 'content',
                totalProperty: 'totalElements'
            }
        };
        store.setProxy(proxy);
        store.loadPage(1);
    }
});