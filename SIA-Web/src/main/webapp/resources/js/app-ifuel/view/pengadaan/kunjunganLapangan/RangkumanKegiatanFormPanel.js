/**
 * Created with IntelliJ IDEA.
 * User: Bagus Saptopo
 * last Edited: Hanin (ext Apply,force fit,Autoscroll)
 * Date: 24/01/13
 * Time: 11:37
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.view.pengadaan.kunjunganLapangan.RangkumanKegiatanFormPanel', {
    extend:'Ext.form.Panel',
    alias:'widget.rangkumanKegiatanFormPanel',
    title:'Rangkuman Kegiatan',
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
                    fieldLabel:'Rangkuman',
                    flex:1
                }
            ]
        });
        this.callParent(arguments);
    }
})