Ext.define('Ifuel.model.master.TmPerson', {
    extend: 'Ifuel.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'nama',
            type: 'string'
        },
        {
            name: 'nipPerson',
            type: 'string'
        },
        {
            name: 'jabatan',
            type: 'string'
        },
        {
            name: 'noTelp',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'divisiGroup',
            type: 'string'
        },
        {
            name: 'tmOrgPln'
        },
        {
            name: 'tmPemasok'
        }
    ]
});