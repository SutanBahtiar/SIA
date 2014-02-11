/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * Date: 26/03/13
 * Time: 10:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.master.pemasok.PemasokFormPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pemasokFormPanel',
    title: 'Master Pemasok',

    autoScroll: true,
    bodyPadding: 5,

    //defaultType: 'textfield',

//    fieldDefaults:{
//        labelWidth:150
//    },

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
                                            fieldLabel: 'Pemasok',
                                            name: 'namaPemasok',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Nama Pemasok wajib diisi.'
                                        },
                                        {
                                            fieldLabel: 'Inisial Pemasok',
                                            name: 'inisialPemasok',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Inisial Pemasok wajib diisi.',
                                            minLength: 3,
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            minLengthText: 'Inisial pemasok harus terdiri dari 3-4 huruf.'
                                        },
                                        {
                                            fieldLabel: 'Alamat',
                                            name: 'alamatPemasok',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Alamat wajib diisi.'
                                        },
                                        {
                                            fieldLabel: 'Kota',
                                            name: 'kotaPemasok',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Kota wajib diisi.'
                                        },
                                        {
                                            fieldLabel: 'Provinsi',
                                            name: 'provinsiPemasok',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Provinsi wajib diisi.'
                                        },
                                        {
                                            fieldLabel: 'Kode Pos',
                                            name: 'kodePosPemasok'
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
                                            fieldLabel: 'E-Mail',
                                            name: 'emailPemasok'
                                        },
                                        {
                                            fieldLabel: 'No. Telepon',
                                            name: 'telpPemasok',
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            blankText: 'Nomor telepon wajib diisi.',
                                            vtype: 'phone',
                                            maxLength: 13,
                                            enforceMaxLength: true
                                        },
                                        {
                                            fieldLabel: 'No. Faximile',
                                            name: 'faxPemasok',
                                            msgTarget: 'side',
                                            vtype: 'fax'
                                        },
                                        {
                                            fieldLabel: 'PIC Pemasok',
                                            name: 'picPemasok'
                                        },
                                        {
                                            fieldLabel: 'E-Mail PIC',
                                            name: 'emailPic'
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