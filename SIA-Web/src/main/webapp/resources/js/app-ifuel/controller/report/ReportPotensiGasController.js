Ext.define('Ifuel.controller.report.ReportPotensiGasController', {
    extend: 'Ext.app.Controller',
    allowWrite: true,
    views: [
        'Ifuel.view.report.potensiGas.ReportPotensiGasPanel',
        'Ifuel.util.PDFViewerPanel'
    ],
    refs: [
        {
            ref: 'reportPotensiGasPanel',
            selector: 'reportPotensiGasPanel tabpanel'
        }
    ],
    init: function() {
        if (this.allowWrite) {
            this.control({
                'reportPotensiGasPanel > tabpanel > toolbar button[action=pdf]': {
                    click: this.printPdf
                },
                'reportPotensiGasPanel > tabpanel > toolbar button[action=xls]': {
                    click: this.printXls
                }
            });
        }
    },
    printPdf: function() {
        var tab = this.getReportPotensiGasPanel();
        if (tab.items.length > 0) {
            window.open(Ifuel.config.potensiGasReportUrl + "?type=pdf", "_blank");
        } else {
            tab.remove(0);
            var tabPrint = new Ifuel.util.PDFViewerPanel({
                src: Ifuel.config.potensiGasReportUrl + "?type=pdf"
            });
            tab.add(tabPrint);
            tab.setActiveTab(tabPrint);
        }
    },
    printXls: function() {
        window.open(Ifuel.config.potensiGasReportUrl + "?type=xls", "_blank");
    }

});