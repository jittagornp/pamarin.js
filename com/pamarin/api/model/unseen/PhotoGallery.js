/**
 * @author jittagorn pitakmetagoon
 * create 18/05/2014
 */
define('com.pamarin.api.model.unseen.PhotoGallery', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class PhotoGallery
     * @model
     */
    var PhotoGallery = Class.define(module.id, {
        /**/
        variable: {
            id_: null, //String
            description_: null, //String
            photoUrl_: null, //String
            accessUrl_: null, //String,
            album_: null //com.pamarin.api.model.unseen.PhotoGalleryAlbum
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
         * @returns {String} description
         */
        getDescription: function() {
            return this.description_;
        },
        /**
         * @param {String} description 
         */
        setDescription: function(description) {
            this.description_ = description;
        },
        /**
         * @returns {String}
         */
        getPhotoUrl: function() {
            return this.photoUrl_;
        },
        /**
         * @param {String} url
         */
        setPhotoUrl: function(url) {
            this.photoUrl_ = url;
        },
        /**
         * @returns {String}
         */
        getAccessUrl: function() {
            return this.accessUrl_;
        },
        /**
         * @param {String} url
         */
        setAccessUrl: function(url) {
            this.accessUrl_ = url;
        },
        /**
         * @returns {PhotoGalleryAlbum}
         */
        getAlbum: function() {
            return this.album_;
        },
        /**
         * @param {PhotoGalleryAlbum} album
         */
        setAlbum: function(album) {
            this.album_ = album;
        },
        /**
         * @param {PhotoGallery} obj 
         * @returns {Boolean}
         */
        equals: function(obj) {
            if (!(obj instanceof PhotoGallery)) {
                return false;
            }

            if (this.getId() === obj.getId()) {
                return true;
            }

            return false;
        }
    });



    return PhotoGallery;
});