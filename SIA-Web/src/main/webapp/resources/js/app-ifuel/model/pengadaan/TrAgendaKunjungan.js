/**
 * Created with IntelliJ IDEA.
 * User: Hanin
 * Date: 2/5/13
 * Time: 1:39 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ifuel.model.pengadaan.TrAgendaKunjungan', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'waktuAwalKunjungan',
            type: 'date'
        },
        {
            name: 'waktuAkhirKunjungan',
            type: 'date'

        },
        {
            name: 'tujuanKunjungan',
            type: 'string'

        },
        {
            name: 'lokasiKunjungan',
            type: 'string'
        },
        {
            name: 'kegiatan',
            type: 'string'

        },
        {
            name: 'keterangan',
            type: 'string'
        },
        {
            name: 'tambahSummary',
            type: 'boolean'
        },
        {
            name: 'trKunjunganLapangan'
        },
        {
            name: 'pesertaKunjungans'
        }
    ]
});