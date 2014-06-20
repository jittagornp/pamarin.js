/**
 * @author jittagorn pitakmetagoon
 * create 16/05/2014
 */
define('com.pamarin.api.model.unseen.UserProfileItem', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class UserProfileItem
     * @model
     */
    var UserProfileItem = Class.define(module.id, {
        /**/
        variable: {
            id_: null,
            name_: null,
            imageUrl_: null,
            profileUrl_: null,
            description_: null
        },
        /**/
        constructor: function(id) {
            this.id_ = id || null;
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
            return this.name_ = name;
        },
        /**
         * @returns {String}
         */
        getImageUrl: function() {
            return this.imageUrl_;
        },
        /**
         * @param {String} url 
         */
        setImageUrl: function(url) {
            this.imageUrl_ = url;
        },
        /**
         * @returns {String} 
         */
        getProfileUrl: function() {
            return this.profileUrl_;
        },
        /**
         * @param {String} url 
         */
        setProfileUrl: function(url) {
            this.profileUrl_ = url;
        },
        /**
         * @returns {String}
         */
        getDescription: function() {
            return this.description_;
        },
        /**
         * @param {String} desc
         */
        setDescription: function(desc) {
            this.description_ = desc;
        },
        /**
         * @param {UserProfileItem} obj 
         */
        equals: function(obj) {
            if (!(obj instanceof UserProfileItem)) {
                return false;
            }

            if (this.getId() === obj.getId()) {
                return true;
            }

            return false;
        }
    });



    return UserProfileItem;
});