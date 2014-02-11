Ext.define('Ifuel.view.email.SendEmailForm', {
    extend:'Ext.form.Panel',
    alias:'widget.sendEmailForm',
    border:false,
    style:'background-color: #fff;',
    defaults:{
        labelWidth:70,
        width:600
    },
    initComponent:function () {
        this.items = [
            {
                xtype:'hiddenfield',
                name:'id'
            },
            {
                xtype:'textfield',
                anchor:'100%',
                fieldLabel:'To',
                name:'to',
                allowBlank:false,
                validator:function (values) {
                    if (Ext.isEmpty(values)) {
                        return true;
                    }
                    var result = false;
                    if (Ext.form.field.VTypes.email(values)) {
                        result = true;
                    } else {
                        result = true;
                        values = values.split(',');
                        Ext.Array.forEach(values, function (value, i) {
                            if (result) {
                                result = Ext.form.field.VTypes.email(value.trim());
                            }
                        });
                    }
                    return result;
                }
            },
            {
                xtype:'textfield',
                anchor:'100%',
                fieldLabel:'Cc',
                name:'cc',
                validator:function (values) {
                    if (Ext.isEmpty(values)) {
                        return true;
                    }
                    var result = false;
                    if (Ext.form.field.VTypes.email(values)) {
                        result = true;
                    } else {
                        result = true;
                        values = values.split(',');
                        Ext.Array.forEach(values, function (value, i) {
                            if (result) {
                                result = Ext.form.field.VTypes.email(value.trim());
                            }
                        });
                    }
                    return result;
                }
            },
            {
                xtype:'textfield',
                anchor:'100%',
                fieldLabel:'Bcc',
                name:'bcc',
                validator:function (values) {
                    if (Ext.isEmpty(values)) {
                        return true;
                    }
                    var result = false;
                    if (Ext.form.field.VTypes.email(values)) {
                        result = true;
                    } else {
                        result = true;
                        values = values.split(',');
                        Ext.Array.forEach(values, function (value, i) {
                            if (result) {
                                result = Ext.form.field.VTypes.email(value.trim());
                            }
                        });
                    }
                    return result;
                }
            },
            {
                xtype:'textfield',
                anchor:'100%',
                fieldLabel:'Subject',
                name:'subject',
                allowBlank:false
            },
            {
                xtype:'textareafield',
                anchor:'100%',
                fieldLabel:'Pesan',
                height:250,
                name:'text',
                allowBlank:false
            },
            {
                xtype:'textfield',
                anchor:'100%',
                fieldLabel:'Attachment',
                name:'fileName'
            },
            {
                xtype:'hiddenfield',
                name:'url'
            }
        ];
        this.callParent(arguments);
    }
});