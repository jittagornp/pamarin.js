/**
 * @author jittagorn pitakmetagoon
 * create 14/05/2014
 */
define('com.pamarin.api.model.unseen.Attraction', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class Attraction
     * @model 
     */
    var Attraction = Class.define(module.id, {
        /**/
        variable: {
            id_: null,
            title_: null,
            description_: null,
            body_: null
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
        getTitle: function() {
            return this.title_;
        },
        /**
         * @param {String} title 
         */
        setTitle: function(title) {
            this.title_ = title;
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
         * @returns {String} 
         */
        getBody: function() {
            return this.body_;
        },
        /**
         * @param {String} body
         */
        setBody: function(body) {
            this.body_ = body;
        },
        /**
         * @param {Attraction} obj 
         */
        equals: function(obj) {
            if (!(obj instanceof Attraction)) {
                return false;
            }

            if (this.id_ === obj.getId()) {
                return true;
            }

            return false;
        }
    });



    return Attraction;
});