/**
 * @author jittagorn pitakmetagoon
 * create 21/09/2013
 */
define('com.pamarin.web.controller.unseen.ImageAlbumController', [
    'module',
    'com.pamarin.core.config.Configs',
    'com.pamarin.web.ui.image.AlbumViewer',
    'com.pamarin.core.util.Urls',
    'com.pamarin.api.model.unseen.Unseen',
    'com.pamarin.ui.loader.ComponentLoader',
    'com.pamarin.web.util.UnseenUtils',
    'com.pamarin.ui.loader.ImageLoader'
], function(module, Configs, AlbumViewer, Urls, Unseen, ComponentLoader, UnseenUtils, ImageLoader) {

    function init(jigsawContext) {
        var $uploadPhotoButton = $('#pmrUploadPhoto');
        var unseenPath = UnseenUtils.getUnseenPath();

        $uploadPhotoButton.binding('click', module.uuid, function() {
            ComponentLoader.load('Fileuploader', function(component) {
                component.show();
            });
        });

        var host = Configs['HOST'];

        ImageLoader.load('.pmr-image-thumnail-wrapper img');

//        new AlbumViewer('.pmr-present-content', [
//            {
//                albumName: 'album1',
//                link: host + unseenPath + '/photo?albumId=1',
//                createDate: '1-03-2012',
//                total: 1,
//                images: [
//                    host + '/service/photo/?name=unseens/pookradueng/p8.png'
//                ]
//            },
//            {
//                albumName: 'album2',
//                link: host + unseenPath + '/photo?albumId=2',
//                createDate: '12-07-2012',
//                total: 3,
//                images: [
//                    host + '/service/photo/?name=unseens/pookradueng/p14.png',
//                    host + '/service/photo/?name=unseens/pookradueng/p2.png',
//                    host + '/service/photo/?name=unseens/pookradueng/p3.png'
//                ]
//            },
//            {
//                albumName: 'album3',
//                link: host + unseenPath + '/photo?albumId=3',
//                createDate: '22-04-2012',
//                total: 10,
//                images: [
//                    host + '/service/photo/?name=unseens/pookradueng/p6.png',
//                    host + '/service/photo/?name=unseens/pookradueng/p9.png',
//                    host + '/service/photo/?name=unseens/pookradueng/p1.png',
//                    host + '/service/photo/?name=unseens/pookradueng/p4.png'
//                ]
//            },
//            {
//                albumName: 'album4',
//                link: host + unseenPath + '/photo?albumId=4',
//                createDate: '02-04-2011',
//                total: 2,
//                images: [
//                    host + '/service/photo/?name=unseens/pookradueng/p12.png',
//                    host + '/service/photo/?name=unseens/pookradueng/p11.png'
//                ]
//            }
//        ]);



        $('.pmr-image-thumnail-wrapper').binding('click', 1, function() {
            ComponentLoader.load('dialog.PhotoViewerDialog', function(dialog) {
                console.log(dialog);
                dialog.show();
                //console.log(dialog.getUUID());
            });
        });
    }

    return {
        onJigsawReady: init
    };
});