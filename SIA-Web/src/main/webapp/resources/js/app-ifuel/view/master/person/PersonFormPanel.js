/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 15/04/13
 * Time: 13:52
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.person.PersonFormPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.personFormPanel',
    title: 'Master Person',

    autoScroll: true,
    bodyPadding: 5,

    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'form',
                    padding: '5 5 0 5',
                    border: false,
                    defaultType: 'textfield',
                    fieldDefaults: {
                        labelWidth: 150
                    },
                    items: [

                        {
                            xtype: 'hiddenfield',
                            name: 'id'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Tipe Person',
                            name: 'tipePerson',
                            store: [
                                ['PLN', 'PLN'],
                                ['PEMASOK', 'PEMASOK']
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            groupField: 'grpOrganisasi',
                            border: 0,
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'organisasiId'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Unit PLN/Pemasok',
                                    labelWidth: 150,
                                    name: 'organisasi',
                                    flex: 1,
                                    allowBlank: false,
                                    readOnly: true
                                },
                                {
                                    xtype: 'button',
                                    action: 'searchOrg',
                                    iconCls: 'fam-zoom'
                                }
                            ]
                        },
                        {
                            fieldLabel: 'Nama',
                            name: 'nama',
                            allowBlank: false,
                            msgTarget: 'side',
                            blankText: 'Nama person wajib diisi.'
                        },
                        {
                            fieldLabel: 'NIP',
                            name: 'nipPerson'
                        },
                        {
                            fieldLabel: 'Jabatan',
                            name: 'jabatan',
                            allowBlank: false,
                            msgTarget: 'side',
                            blankText: 'Jabatan wajib diisi.'
                        },
                        {
                            fieldLabel: 'No. Telp',
                            name: 'noTelp',
                            allowBlank: false,
                            msgTarget: 'side',
                            blankText: 'Nomor telepon wajib diisi.'
                        },
                        {
                            fieldLabel: 'E-Mail',
                            name: 'email',
                            vtype: 'email',
                            msgTarget: 'side',
                            emailText: 'Field ini harus berisikan alamat e-mail yang memiliki format "name@mail.com"',
                            allowBlank: false
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})