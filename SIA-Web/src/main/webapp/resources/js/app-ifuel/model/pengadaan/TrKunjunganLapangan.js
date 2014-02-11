/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 1/31/13
 * Time: 4:33 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.pengadaan.TrKunjunganLapangan', {
    extend:'Ifuel.model.Base',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'tglAwalKunjungan',
            type:'date'
        },
        {
            name:'tglAkhirKunjungan',
            type:'date'
        },
        {
            name:'iterasiKunjungan',
            type:'int'
        },
        {
            name:'summaryKunjungan',
            type:'string'
        },
        {
            name:'trPotensiGas'
        },
        {
            name:'statusKunjunganSet'
        },
        {
            name: 'namaPemasok',
            type:'string',
            mapping:'trPotensiGas.tmPemasok.namaPemasok'
        },
        {
            name: 'namaSumberGas',
            type:'string',
            mapping:'trPotensiGas.tmSumberGas.namaSumberGas'
        },
        {
            name: 'namaPltgm',
            type:'string',
            mapping:'trPotensiGas.tmPltgm.namaPltgm'
        }
    ]
});