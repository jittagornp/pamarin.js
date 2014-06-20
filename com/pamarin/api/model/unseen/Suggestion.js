/**
 * @author jittagorn pitakmetagoon
 * create 07/05/2014
 */
define('com.pamarin.api.model.unseen.Suggestion', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class Suggestion
     * @model
     */
    var Suggestion = Class.define(module.id, {
        /**/
        variable: {
            id_: null,
            name_: null,
            Url_: null,
            imageUrl_: null,
            description_: null
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
        getUrl: function() {
            return this.Url_;
        },
        /**
         * @param {String} Url
         */
        setUrl: function(Url) {
            this.Url_ = Url;
        },
        /**
         * @returns {String}
         */
        getImageUrl: function() {
            return this.imageUrl_;
        },
        /**
         * @param {String} imageUrl
         */
        setImageUrl: function(imageUrl) {
            this.imageUrl_ = imageUrl;
        },
        /**
         * @returns {String}
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
        /**/
        equals: function(obj) {
            if (!(obj instanceof Suggestion)) {
                return false;
            }

            if (this.id_ === obj.getId()) {
                return true;
            }

            return false;
        }
    });



    return Suggestion;
});