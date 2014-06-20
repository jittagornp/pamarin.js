/**
 * @author jittagorn pitakmetagoon
 * create 14/06/2014
 */
contextManager.registerContext('page', {
    defaultPage: 'home',
    defaultTab: 'home',
    mapping: {
        unseen: {
            pattern: '/{unseenId^=@}',
            tab: {
                default: 'information',
                mapping: {
                    album: {
                        pattern: '/photo/album/{albumId}'//,
//                        querystring: [
//                            {
//                                albumId: '{albumId}'
//                            },
//                            {
//                                unseenId: '{unseenId}'
//                            }
//                        ]
                    },
                    feelingOne: {
                        pattern: '/feeling/one'
                    }
                }
            }
        },
        userUnseen: {
            pattern: '/{userId^=+}/{unseenId^=@}',
            offset: 1,
            slice: 1,
            querystring: [
                {
                    userId: '{userId}'
                }
            ],
            tab: {
                reference: 'unseen.tab'
            }
        },
        unseenSettings: {
            pattern: '/settings/{unseenId^=@}'
        },
        userUnseenSettings: {
            pattern: '/{userId^=+}/settings/{unseenId^=@}',
            offset: 1,
            slice: 2,
            querystring: [
                {
                    userId: '{userId}'
                }
            ]
        },
        user: {
            pattern: '/{userId^=+}'
        }
    }
});