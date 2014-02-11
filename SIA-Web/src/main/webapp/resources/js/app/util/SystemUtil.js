Ext.define('Ifuel.util.SystemUtil', {
    singleton:true,
    loggedUser:{},
    _authorities:[],

    getLastStatusKunjunganLapangan:function (kunjunganLapangan) {
        if (!Ext.isEmpty(kunjunganLapangan) && !Ext.isEmpty(kunjunganLapangan.statusKunjunganSet)) {
            var statusKunjungans = kunjunganLapangan.statusKunjunganSet;
            var lastStatusKunjungan = statusKunjungans[0];
            Ext.Array.forEach(statusKunjungans, function (statusKunjungan, i) {
                statusKunjungan.createdAt = Ext.isDate(statusKunjungan.createdAt) ? statusKunjungan.createdAt : new Date(statusKunjungan.createdAt);
                if (lastStatusKunjungan.createdAt.getTime() < statusKunjungan.createdAt.getTime()) {
                    lastStatusKunjungan = statusKunjungan;
                }
            });
            return lastStatusKunjungan.status;
        }
        return null;
    },

    getLastStatusKom:function (kom) {
        if (!Ext.isEmpty(kom) && !Ext.isEmpty(kom.statusKomSet)) {
            var statusKoms = kom.statusKomSet;
            var lastStatusKom = statusKoms[0];
            Ext.Array.forEach(statusKoms, function (statusKom, i) {
                statusKom.createdAt = Ext.isDate(statusKom.createdAt) ? statusKom.createdAt : new Date(statusKom.createdAt);
                if (lastStatusKom.createdAt.getTime() < statusKom.createdAt.getTime()) {
                    lastStatusKom = statusKom;
                }
            });
            return lastStatusKom.status;
        }
        return null;
    },

    getLastStatusMou:function (mou) {
        if (!Ext.isEmpty(mou) && !Ext.isEmpty(mou.statusMouSet)) {
            var statusMous = mou.statusMouSet;
            var lastStatusMou = statusMous[0];
            Ext.Array.forEach(statusMous, function (statusMou, i) {
                statusMou.createdAt = Ext.isDate(statusMou.createdAt) ? statusMou.createdAt : new Date(statusMou.createdAt);
                if (lastStatusMou.createdAt.getTime() < statusMou.createdAt.getTime()) {
                    lastStatusMou = statusMou;
                }
            });
            return lastStatusMou.status;
        }
        return null;
    },

    getLastStatusHoa:function (hoa) {
        if (!Ext.isEmpty(hoa) && !Ext.isEmpty(hoa.statusHoaSet)) {
            var statusHoas = hoa.statusHoaSet;
            var lastStatusHoa = statusHoas[0];
            Ext.Array.forEach(statusHoas, function (statusHoa, i) {
                statusHoa.createdAt = Ext.isDate(statusHoa.createdAt) ? statusHoa.createdAt : new Date(statusHoa.createdAt);
                if (lastStatusHoa.createdAt.getTime() < statusHoa.createdAt.getTime()) {
                    lastStatusHoa = statusHoa;
                }
            });
            return lastStatusHoa.status;
        }
        return null;
    },

    getLastStatusKeyterms:function (keyterms) {
        if (!Ext.isEmpty(keyterms) && !Ext.isEmpty(keyterms.statusKeytermsSet)) {
            var statusKeytermses = keyterms.statusKeytermsSet;
            var lastStatusKeyterms = statusKeytermses[0];
            Ext.Array.forEach(statusKeytermses, function (statusKeyterms, i) {
                statusKeyterms.createdAt = Ext.isDate(statusKeyterms.createdAt) ? statusKeyterms.createdAt : new Date(statusKeyterms.createdAt);
                if (lastStatusKeyterms.createdAt.getTime() < statusKeyterms.createdAt.getTime()) {
                    lastStatusKeyterms = statusKeyterms;
                }
            });
            return lastStatusKeyterms.status;
        }
        return null;
    },

    getLastStatusPjbg:function (pjbg) {
        if (!Ext.isEmpty(pjbg) && !Ext.isEmpty(pjbg.statusPjbgSet)) {
            var statusPjbgs = pjbg.statusPjbgSet;
            var lastStatusPjbg = statusPjbgs[0];
            Ext.Array.forEach(statusPjbgs, function (statusPjbg, i) {
                statusPjbg.createdAt = Ext.isDate(statusPjbg.createdAt) ? statusPjbg.createdAt : new Date(statusPjbg.createdAt);
                if (lastStatusPjbg.createdAt.getTime() < statusPjbg.createdAt.getTime()) {
                    lastStatusPjbg = statusPjbg;
                }
            });
            return lastStatusPjbg.status;
        }
        return null;
    }
});


