/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/6/13
 * Time: 3:54 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.pengadaan.TrKeyterms', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'tanggalPersetujuan',
            type: 'date'
        },
        {
            name: 'statusKeytermsSet'
        },
        {
            name: 'trMou'
        },
        {
            name: 'nomorMou',
            type:'string',
            mapping:'trMou.nomor'
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