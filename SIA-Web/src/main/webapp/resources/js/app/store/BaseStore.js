Ext.define('App.store.BaseStore', {
    extend: 'Ext.data.Store',
    model: '',
    url: '',
    requires: [
        this.model
    ],
    pageSize: 100,
    remoteSort: true,
    autoLoad: true,
    constructor: function (cfg) {
        var self = this;
        cfg = cfg || {};
        self.callParent([
            Ext.apply({
                model: self.model,
                proxy: {
                    type: 'ajax',
                    //type: 'jsonp',
                    pageParam: 'page.page',
                    url: self.url,
                    reader: {
                        type: 'json',
                        root: 'content',
                        totalProperty: 'totalElements'
                    }
                },
                autoLoad: self.autoLoad
            }, cfg)
        ]);
    },
    listeners: {
        'beforeload': function (store, operation) {

            var self = this;

            operation.params = {};

            if (!Ext.isEmpty(self.pageSize)) {
                operation.params['page.size'] = self.pageSize;
            }

            if (!Ext.isEmpty(operation.sorters) && self.remoteSort) {
                var sorter = operation.sorters[0];
                operation.params["page.sort"] = sorter.property;
                operation.params["page.sort.dir"] = sorter.direction;
            }

            if (self.changePageSize) {
                operation.page = 1;
                store.currentPage = 1;
                self.changePageSize = false;
            }
        }
    }
});