/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * last Edited: Hanin (ext Apply,force fit,Autoscroll)
 * Date: 24/01/13
 * Time: 11:37
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.pengadaan.kom.HasilKomFormPanel', {
    extend:'Ext.form.Panel',
    alias:'widget.hasilKomFormPanel',
    title:'Hasil Pembahasan Kom',
    forceFit:true,
    frame:true,
    autoScroll:true,

    layout:{
        type:'hbox',
        align:'stretch'
    },

    initComponent:function () {
        Ext.apply(this, {
            items:[
                {
                    xtype:'htmleditor',
                    fieldLabel:'Hasil Pembahasan',
                    flex:1
                }
            ]
        });
        this.callParent(arguments);
    }
})