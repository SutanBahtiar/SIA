/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/1/13
 * Time: 10:57 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.pengadaan.TrKom', {
    extend:'Ifuel.model.Base',

    fields:[
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'nomor',
            type: 'string'
        },
        {
            name: 'lokasi',
            type: 'string'
        },
        {
            name: 'agenda',
            type: 'string'
        },
        {
            name: 'hasilPembahasan',
            type: 'string'
        },
        {
            name: 'waktuPelaksanaan',
            type: 'date'
        },
        {
            name: 'statusKomSet'
        },
        {
            name: 'trPotensiGas'
        },
        {
            name: 'nomorPotensiGas',
            type:'string',
            mapping:'trPotensiGas.id'
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