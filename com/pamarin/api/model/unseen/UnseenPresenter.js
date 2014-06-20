/**
 * @author jittagorn pitakmetagoon
 * create 12/05/2014
 */
define('com.pamarin.api.model.unseen.UnseenPresenter', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class UnseenPresenter
     * @model 
     */
    var UnseenPresenter = Class.define(module.id, {
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
        getName: function() {
            return this.name_;
        },
        /**
         * @param {String} name
         */
        setName: function() {
            this.name_;
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
         * @param {UnseenPresenter} obj 
         */
        equals: function(obj) {
            if (!(obj instanceof UnseenPresenter)) {
                return false;
            }

            if (this.id_ === obj.getId()) {
                return true;
            }

            return false;
        }
    });



    return UnseenPresenter;
});