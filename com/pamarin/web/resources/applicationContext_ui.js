/**
 * @author jittagorn pitakmetagoon
 * create 16/03/2014
 */
contextManager.registerContext('cookies', [
    {
        path: '/',
        expire: 365,
        descroiption: 'window layout cookie',
        name: 'WLC',
        values: [
            {
                key: 'WLCW',
                value: 1024,
                description: 'window layout cookie width'
            },
            {
                key: 'WLCH',
                value: 768,
                description: 'window layout cookie height'
            },
            {
                key: 'LLC',
                value: 0,
                description: 'left layout cookie'
            },
            {
                key: 'RLC',
                value: 0,
                description: 'right layout cookie'
            },
            {
                key: 'PLC',
                value: 985,
                description: 'page layout cookie'
            }
        ]
    }
]);

contextManager.registerContext('ui', {
    //
    component: {
        space: '#pmrComponent',
        components: {
            'dialog.FeelingDialog': 'http://pamarin.com/component/dialog/FeelingDialog',
            'dialog.RichTextEditor': 'http://pamarin.com/component/dialog/RichTextEditor',
            'dialog.TagsDialog': 'http://pamarin.com/component/dialog/TagsDialog'
        }
    },
    //
    jigsaws: {
        contextPath: 'http://localhost:8080/pamarin/jigsaw'
    },
    //
    templates: {
        //
    }
});