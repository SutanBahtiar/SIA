/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/6/13
 * Time: 2:55 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.pengadaan.TrMou', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'nomor',
            type: 'string'
        },
        {
            name: 'judulIndonesia',
            type: 'string'
        },
        {
            name: 'judulEnglish',
            type: 'string'
        },
        {
            name: 'pembukaanIndonesia',
            type: 'string'
        },
        {
            name: 'pembukaanEnglish',
            type: 'string'
        },
        {
            name: 'instansiPihak3',
            type: 'string'
        },
        {
            name: 'penanggungJawabPihak3',
            type: 'string'
        },
        {
            name: 'tglMou',
            type: 'date'
        },
        {
            name: 'disetujuiOleh',
            type: 'string'
        },
        {
            name: 'jabatanPersetujuan',
            type: 'string'
        },
        {
            name: 'keteranganPersetujuan',
            type: 'string'
        },
        {
            name: 'waktuPengingat',
            type: 'date'
        },
        {
            name: 'statusMouSet'
        },
        {
            name: 'pasalSet'
        },
        {
            name: 'documentSet'
        },
        {
            name: 'trPotensiGas'
        },
        {
            name: 'bahasa',
            type: 'string'
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