/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 10/04/13
 * Time: 9:30
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.orgPln.OrgPlnFormPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.orgPlnFormPanel',
    title: 'Master Unit PLN',

    autoScroll: true,
    bodyPadding: 5,

    initComponent:function() {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'form',
                    padding: '5 5 0 5',
                    border: false,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            name: 'hboxContainer',
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'id'
                                },
                                {
                                    xtype: 'container',
                                    name: 'leftContainer',
                                    flex: 1,
                                    layout: 'anchor',
                                    defaultType: 'textfield',
                                    fieldDefaults: {
                                        labelWidth: 150
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Unit PLN',
                                            name: 'unitPln',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Nama Unit PLN wajib diisi.'
                                        },
                                        {
                                            fieldLabel: 'Inisial Unit',
                                            name: 'inisialUnit',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Inisial unit wajib diisi.',
                                            minLength: 3,
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            minLengthText: 'Inisial unit harus terdiri dari 3-4 huruf.'
                                        },
                                        {
                                            fieldLabel: 'Nama GM',
                                            name: 'namaGm',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Nama GM wajib diisi.'
                                        },
                                        {
                                            fieldLabel: 'No. Telp.',
                                            name: 'noTelpUnit',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Nomor telepon wajib diisi.',
                                            vtype: 'phone',
                                            maxLength: 13,
                                            enforceMaxLength: true
                                        },
                                        {
                                            fieldLabel: 'No. Fax',
                                            name: 'faxUnit',
                                            msgTarget: 'side',
                                            vtype: 'fax'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    name: 'rightContainer',
                                    flex: 1,
                                    layout: 'anchor',
                                    defaultType: 'textfield',
                                    fieldDefaults: {
                                        labelWidth: 150
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Alamat',
                                            name: 'alamatUnit',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Alamat unit wajib diisi.'
                                        },
                                        {
                                            fieldLabel: 'Kota',
                                            name: 'kotaUnit',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Kota wajib diisi.'
                                        },
                                        {
                                            fieldLabel: 'Provinsi',
                                            name: 'provinsiUnit',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Provinsi unit wajib diisi.'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Kode Pos',
                                            name: 'kodeposUnit',
                                            msgTarget: 'side',
                                            hideTrigger: true,
                                            maxLength: 5,
                                            enforceMaxLength: true,
                                            minLength: 5,
                                            minLengthText: 'Format kode pos harus terdiri dari 5 digit angka (Contoh: 12345).'
                                        },
                                        {
                                            fieldLabel: 'E-Mail',
                                            name: 'emailUnit',
                                            msgTarget: 'side',
                                            vtype: 'email'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})