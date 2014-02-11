/**
 * @sutan
 */
Ext.define('Ifuel.util.PDFViewerPanel', {
    extend: 'Ext.ux.panel.PDF',
    alias: 'widget.pdfViewerPanel',
    title: 'PDF Preview',
    autoScroll: true,
    bodyPadding: 5,
    src: '',
    
    initComponent: function() {
        this.closable = true;
        this.pageScale = 1.5;
//        this.src = 'http://cdn.mozilla.net/pdfjs/tracemonkey.pdf';
        this.callParent(arguments);
    }

});