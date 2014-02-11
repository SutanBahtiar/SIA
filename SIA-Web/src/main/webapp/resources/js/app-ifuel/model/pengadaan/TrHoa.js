/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/6/13
 * Time: 4:13 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.pengadaan.TrHoa', {
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
            name: 'tglHoa',
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
            name: 'statusHoaSet'
        },
        {
            name: 'pasalSet'
        },
        {
            name: 'documentSet'
        },
        {
            name: 'trMou'
        },
        {
            name: 'bahasa',
            type: 'string'
        },
        {
            name: 'namaPemasok',
            type:'string',
            mapping:'trMou.trPotensiGas.tmPemasok.namaPemasok'
        },
        {
            name: 'namaSumberGas',
            type:'string',
            mapping:'trMou.trPotensiGas.tmSumberGas.namaSumberGas'
        },
        {
            name: 'namaPltgm',
            type:'string',
            mapping:'trMou.trPotensiGas.tmPltgm.namaPltgm'
        }
    ]
});