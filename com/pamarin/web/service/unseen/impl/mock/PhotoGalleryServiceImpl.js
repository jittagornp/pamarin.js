/**
 * @author jittagorn pitakmetagoon
 * create 15/05/2014
 */
define('com.pamarin.web.service.unseen.impl.mock.PhotoGalleryServiceImpl', [
    'module',
    'com.pamarin.core.remote.RemoteService',
    'com.pamarin.api.service.unseen.PhotoGalleryService',
    'com.pamarin.api.model.unseen.PhotoGalleryAlbum',
    'com.pamarin.api.model.unseen.PhotoGallery',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.context.Configuration',
    'com.pamarin.core.logging.LoggerFactory'
], function(module, RemoteService, PhotoGalleryService, PhotoGalleryAlbum, PhotoGallery, ArrayList, Configuration, LoggerFactory) {

    /**
     * @class PhotoGalleryServiceImpl
     * @service
     */
    var PhotoGalleryServiceImpl = RemoteService.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);
        var host = Configuration.host;

        function createPhoto(id) {
            var photo = new PhotoGallery();
            photo.setId('photo_' + id);
            photo.setDescription('photo description');
            photo.setPhotoUrl(host + '/service/photo/?name=unseens/pookradueng/p' + (id % 14 + 1) + '.png&size=200');
            photo.setAccessUrl('');

            return photo;
        }

        function createAlbum(id) {
            var album = new PhotoGalleryAlbum();
            album.setId('album_' + id);
            album.setName('album ' + id);
            for (var i = 0; i < 4; i++) {
                album.addPhoto(createPhoto(i));
            }

            return album;
        }

        return {
            /**/
            findAlbumsByUnseenId: function(chain, unseenId, page) {
                var list = new ArrayList();
                for (var index = 1; index <= 10; index++) {
                    list.add(createAlbum(index));
                }

                chain.done(list);
            },
            /**
             * @param {Chain} chain 
             * @param {String} unseenId
             * @param {Pageable} pageable
             * @returns {Page<PhotoGallery>}
             */
            findPhotosByUnseenId: function(chain, unseenId, pageable) {
                LOG.debug('findPhotosByUnseenId arguments --> {}, page ({} : {})', unseenId, pageable.getPageNumber(), pageable.getPageSize());

                if (pageable.getPageNumber() < 3) {
                    var list = new ArrayList();
                    for (var index = 1; index <= pageable.getPageSize(); index++) {
                        list.add(createPhoto(index));
                    }

                    chain.done(list);
                }
            }

        };
    })()).implements(PhotoGalleryService);



    return PhotoGalleryServiceImpl;
});