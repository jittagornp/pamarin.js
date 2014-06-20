/**
 * @author jittagorn pitakmetagoon
 * create 18/05/2014
 */
define('com.pamarin.api.model.unseen.PhotoGalleryAlbum', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.collection.ArrayList'
], function(module, Class, ArrayList) {

    /**
     * @class PhotoGalleryAlbum
     * @model
     */
    var PhotoGalleryAlbum = Class.define(module.id, {
        /**/
        variable: {
            id_: null, //String
            name_: null, //String
            photos_: null, //List<com.pamarin.api.model.unseen.PhotoGallery>
            totalPhoto_: null //Number
        },
        /** 
         * @returns {String}
         */
        getId: function() {
            return this.id_;
        },
        /**
         * @param {String} id 
         */
        setId: function(id) {
            this.id_ = id;
        },
        /**
         * @returns {String} name
         */
        getName: function() {
            return this.name_;
        },
        /**
         * @param {String} name 
         */
        setName: function(name) {
            this.name_ = name;
        },
        /**
         * @returns {List<PhotoGallery>}
         */
        getPhotos: function() {
            if (this.photos_ === null) {
                this.photos_ = new ArrayList();
            }

            return this.photos_;
        },
        /**
         * @param {List<PhotoGallery>} photos
         */
        setPhotos: function(photos) {
            this.photos_ = photos;
        },
        /**
         * @returns {Number} 
         */
        getTotalPhotos: function() {
            return this.totalPhoto_;
        },
        /**
         * @param {Number} total 
         */
        setTotalPhotos: function(total) {
            this.totalPhoto_ = total;
        },
        /**
         * 
         * @param {PhotoGallery} photo
         */
        addPhoto: function(photo) {
            if (photo === null) {
                return;
            }

            photo.setAlbum(this);
            this.getPhotos().add(photo);
        },
        /**
         * @param {PhotoGalleryAlbum} obj 
         * @returns {Boolean}
         */
        equals: function(obj) {
            if (!(obj instanceof PhotoGalleryAlbum)) {
                return false;
            }

            if (this.getId() === obj.getId()) {
                return true;
            }

            return false;
        }
    });



    return PhotoGalleryAlbum;
});