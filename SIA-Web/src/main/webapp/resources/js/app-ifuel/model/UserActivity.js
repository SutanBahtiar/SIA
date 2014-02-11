Ext.define('Ifuel.model.UserActivity', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'user'
        },
        {
            name: 'loginTime',
            type: 'date'
        },
        {
            name: 'logoutTime',
            type: 'date'
        }
    ]
});