<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title id="page-title">SIA Management System</title>
    <link rel="shortcut icon" href="<c:url value="/resources/img/favicon.ico"/>">

    <link rel="stylesheet" type="text/css" href='<c:url value="/resources/css/ext-all-gray.css"/>'>
    <link rel="stylesheet" type="text/css" href='<c:url value="/resources/css/fam-icons.css"/>'>
    <link rel="stylesheet" type="text/css" href='<c:url value="/resources/css/icons.css"/>'>
    <link rel="stylesheet" type="text/css" href='<c:url value="/resources/css/custom.css"/>'>

    <!-- Config -->
    <script type="text/javascript">
        var cleanUrl = function (path) {
            var indexOfJSessionId = path.indexOf(";jsessionid");
            if (indexOfJSessionId != -1) {
                path = path.substring(0, indexOfJSessionId);
            }
            return path;
        };

        App = {};
        App.config = {};
        App.config.loggedAuthorities = [];
        App.config.loaderPath = cleanUrl('<c:url value="/resources/js/extjs/ux"/>');
        App.config.appFolder = cleanUrl('<c:url value="/resources/js/app"/>');
        App.config.logoutUrl = cleanUrl('<c:url value="/logout"/>');
        App.config.menu = cleanUrl('<c:url value="/resources/js/app/data/tree-menu.json"/>');
        App.config.apiPath = cleanUrl('<c:url value="/api/"/>');
        App.config.loggedUserUrl = App.config.apiPath + "user/loggedUser";
        App.config.userUrl = App.config.apiPath + "user/";
        App.config.menuTree = App.config.apiPath + "menu/treeMenu/";
        
        
//        Ifuel = {};
//        Ifuel.config = {};
//        Ifuel.config.loggedAuthorities = [];
//        Ifuel.config.loaderPath = cleanUrl('<c:url value="/resources/js/extjs/ux"/>');
//        Ifuel.config.appFolder = cleanUrl('<c:url value="/resources/js/app"/>');
//        Ifuel.config.resourcesPath = cleanUrl('<c:url value="/resources/"/>');
//        Ifuel.config.logoutUrl = cleanUrl('<c:url value="/logout"/>');
//        Ifuel.config.apiPath = cleanUrl('<c:url value="/api/"/>');
//        Ifuel.config.uploadFilePath = Ifuel.config.resourcesPath + "uploadfile/";
//
//
//        Ifuel.config.roleUrl = Ifuel.config.apiPath + "role/";
//        Ifuel.config.groupUrl = Ifuel.config.apiPath + "group/";
//        Ifuel.config.userUrl = Ifuel.config.apiPath + "user/";
//        Ifuel.config.userActivityUrl = Ifuel.config.apiPath + "userActivity/";
//        Ifuel.config.menuUrl = Ifuel.config.apiPath + "user/menu";
//        Ifuel.config.loggedUserUrl = Ifuel.config.apiPath + "user/loggedUser";
//        Ifuel.config.terimaBBUrl = Ifuel.config.apiPath + "terimaBB/";
//        Ifuel.config.terimaBBTahunanUrl = Ifuel.config.apiPath + "terimaBBTahunan/";
//        Ifuel.config.terimaBBBulananUrl = Ifuel.config.apiPath + "terimaBBBulanan/";

//        //master
//        Ifuel.config.statusKronologisUrl = Ifuel.config.apiPath + "statusKronologis/";
//        Ifuel.config.jenisDokumenUrl = Ifuel.config.apiPath + "jenisDokumen/";
//        Ifuel.config.mlokasiUrl = Ifuel.config.apiPath + "mlokasi/";
//        Ifuel.config.sumberGasUrl = Ifuel.config.apiPath + "sumberGas/";
//        Ifuel.config.regionUrl = Ifuel.config.apiPath + "region/";
//
//        //Potensi Gas
//        Ifuel.config.kronologisAlurPerProsesUrl = Ifuel.config.apiPath + "kronologisAlurPerProses/";
//
//        //TODO master terpakai
//        Ifuel.config.personUrl = Ifuel.config.apiPath + "person/";
//        Ifuel.config.pemasokUrl = Ifuel.config.apiPath + "pemasok/";
//        Ifuel.config.orgPlnUrl = Ifuel.config.apiPath + "orgPln/";
//        Ifuel.config.sumberGasUrl = Ifuel.config.apiPath + "sumberGas/";
//        Ifuel.config.documentUrl = Ifuel.config.apiPath + "document/";
//        Ifuel.config.pasalUrl = Ifuel.config.apiPath + "pasal/";
//        Ifuel.config.riwayatPasalUrl = Ifuel.config.apiPath + "pasal/riwayat/";
//
//        Ifuel.config.pltgmUrl = Ifuel.config.apiPath + "pltgm/";
//
//        Ifuel.config.ayatUrl = Ifuel.config.apiPath + "ayat/";
//        Ifuel.config.riwayatAyatUrl = Ifuel.config.apiPath + "ayat/riwayat/";
//
//        //TODO Perencanaan terpakai
//        Ifuel.config.dokPotensiGasUrl = Ifuel.config.apiPath + "dokPotensiGas/";
//        Ifuel.config.statusPotensiGasUrl = Ifuel.config.apiPath + "statusPotensiGas/";
//        Ifuel.config.statusPotensiGasLastStatusUrl = Ifuel.config.apiPath + "statusPotensiGas/lastStatus";
//        Ifuel.config.statusPotensiGasLastStatusDtoUrl = Ifuel.config.apiPath + "statusPotensiGas/lastStatusAttachmentInfo";
//        Ifuel.config.potensiGasUrl = Ifuel.config.apiPath + "potensiGas/";
//
//        //TODO terpakai : Kunjungan Lapangan
//        Ifuel.config.kunjunganLapanganUrl = Ifuel.config.apiPath + "kunjunganLapangan/";
//        Ifuel.config.pesertaKunjunganUrl = Ifuel.config.apiPath + "pesertaKunjungan/";
//        Ifuel.config.agendaKunjunganUrl = Ifuel.config.apiPath + "agendaKunjungan/";
//        Ifuel.config.dokumenKunjunganLapanganUrl = Ifuel.config.apiPath + "dokKunjLap/";
//
//        //TODO terpakai : skPanitia
//        Ifuel.config.skPanitiaUrl = Ifuel.config.apiPath + "skPanitia/";
//        Ifuel.config.personilPanitiaUrl = Ifuel.config.apiPath + "personilPanitia/";
//
//        //TODO terpakai : KOM
//        Ifuel.config.komUrl = Ifuel.config.apiPath + "kom/";
//        Ifuel.config.pesertaKomUrl = Ifuel.config.apiPath + "pesertaKom/";
//        Ifuel.config.dokKomUrl = Ifuel.config.apiPath + "dokKom/";
//
//        //TODO terpakai : MOU
//        Ifuel.config.mouUrl = Ifuel.config.apiPath + "mou/";
//
//        //TODO terpakai : HOA
//        Ifuel.config.hoaUrl = Ifuel.config.apiPath + "hoa/";
//
//        //TODO terpakai : Keyterms
//        Ifuel.config.keytermsUrl = Ifuel.config.apiPath + "keyterms/";
//        Ifuel.config.isuKeytermsUrl = Ifuel.config.apiPath + "keyterms/isu/";
//        Ifuel.config.riwayatIsuKeytermsUrl = Ifuel.config.apiPath + "keyterms/isu/riwayat/";
//
//        //TODO terpakai : PJBG
//        Ifuel.config.pjbgUrl = Ifuel.config.apiPath + "pjbg/";
//        Ifuel.config.pasalPjbgUrl = Ifuel.config.apiPath + "pasalPjbg/";
//        Ifuel.config.statusPjbgUrl = Ifuel.config.apiPath + "statusPjbg/";
//        Ifuel.config.hargaGasPjbgUrl = Ifuel.config.apiPath + "hargaGasPjbg/";
//        Ifuel.config.specGasPjbgUrl = Ifuel.config.apiPath + "specGasPjbg/";
//        
//        // Report Pengadaaan
//        Ifuel.config.potensiGasReportUrl = Ifuel.config.apiPath + "report/potensiGas";
//        
//        // Report Master
//        Ifuel.config.orgPlnReportUrl = Ifuel.config.apiPath + "report/orgPln";
//        Ifuel.config.pemasokReportUrl = Ifuel.config.apiPath + "report/pemasok";
//        Ifuel.config.personReportUrl = Ifuel.config.apiPath + "report/person";
//        Ifuel.config.pltgmReportUrl = Ifuel.config.apiPath + "report/pltgm";
//        Ifuel.config.sumberGasReportUrl = Ifuel.config.apiPath + "report/sumberGas";

    </script>

    <script type="text/javascript" src='<c:url value="/resources/js/extjs/ext-all-debug.js"/>'></script>
    <script type="text/javascript" src='<c:url value="/resources/js/app/util/SecurityHelper.js"/>'></script>
    <script type="text/javascript" src='<c:url value="/resources/js/app/app.js"/>'></script>
    
    <script type="text/javascript" src='<c:url value="/resources/js/pdf/lib/compatibility.js"/>'></script>
    <script type="text/javascript" src='<c:url value="/resources/js/pdf/lib/pdf.js"/>'></script>
    <script type="text/javascript" src='<c:url value="/resources/js/pdf/ux/panel/PDF.js"/>'></script>
    <script type="text/javascript" src='<c:url value="/resources/js/pdf/ux/util/PDF/TextLayerBuilder.js"/>'></script>
    
    <style type="text/css">

        body {
            background-image: url("<c:url value="resources/img/banner-bg.jpg" />");
        }

        #loading {
            position: absolute;
            left: 35%;
            top: 25%;
            z-index: 20001;
            height: auto;
        }

        #loading .loading-indicator {
            font: bolder 13px tahoma, arial, helvetica;
            margin: 0;
            text-align: center;
            height: 120px;
            width: 145px;
        }


    </style>
</head>
<body>
<div id="loading">
    <div class="loading-indicator">
        <table>
            <tr>
                <td><img src="<c:url value="/resources/img/Money-Calculator-icon.png"/>" alt="loading"/></td>
                <td>
                    <img src="<c:url value="/resources/img/extanim32big.gif"/>" alt="loading"/> <br/>
                    Loading...
                </td>
            </tr>
        </table>

    </div>
</div>
</body>
</html>