/**
 * @author jittagorn pitakmetagoon
 * create 06/05/2014
 */
define('com.pamarin.api.model.unseen.Tourist', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class Tourist
     * @model
     */
    var Tourist = Class.define(module.id, {
        /**/
        variable: {
            id_: null,
            name_: null,
            profileUrl_: null,
            imageUrl_: null
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
         * @returns {String}
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
         * @return {String} 
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
         * @param {Tourist} obj
         */
        equals: function(obj) {
            if (!(obj instanceof Tourist)) {
                return false;
            }

            if (this.id_ === obj.getId()) {
                return true;
            }

            return false;
        }
    });



    return Tourist;
});