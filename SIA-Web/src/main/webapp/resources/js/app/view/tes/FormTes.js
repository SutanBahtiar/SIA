/**
 * @author sutan
 */

Ext.define('App.view.tes.FormTes', {
    extend : 'Ext.form.Panel',
    alias : 'widget.formTes',

    initComponent : function() {
        this.frame = true, this.title = 'Form Tes', this.bodyPadding = 5, 
        // this.layout = 'fit', 
        this.fieldDefaults = {
            labelAlign : 'left',
            labelWidth : 90,
            anchor : '100%'
        }, this.items = [{
            xtype : 'textfield',
            name : 'textfield1',
            fieldLabel : 'Text field',
            value : 'Text field value'
        }, {
            xtype : 'textfield',
            name : 'password1',
            inputType : 'password',
            fieldLabel : 'Password field'
        }], this.callParent(arguments);

    }
});
