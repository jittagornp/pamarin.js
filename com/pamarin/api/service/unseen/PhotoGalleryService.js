/**
 * @author jittagorn pitakmetagoon
 * create 19/05/2014
 */
define('com.pamarin.api.service.unseen.PhotoGalleryService', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * @interface PhotoGalleryService
     */
    var PhotoGalleryService = Interface.define(module.id, {
        /**
         * @param {String} unseenId
         * @param {Pageable} page
         * @returns {Page<PhotoGalleryAlbum>}
         */
        findAlbumsByUnseenId: function(unseenId, page) {

        },
        /**
         * @param {String} unseenId
         * @param {com.pamarin.data.Pageable} page
         * @returns {Page<PhotoGallery>}
         */
        findPhotosByUnseenId : function(unseenId, page){
            
        }
    });



    return PhotoGalleryService;
});