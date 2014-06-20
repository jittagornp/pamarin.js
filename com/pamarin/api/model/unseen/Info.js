/**
 * @author jittagorn pitakmetagoon
 * create 11/05/2014
 */
define('com.pamarin.api.model.unseen.Info', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class Info
     * @model
     */
    var Info = Class.define(module.id, {
        /**/
        variable: {
            id_: null,
            title_: null,
            content_: null
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
        /**/
        setTitle: function(title) {
            this.title_ = title;
        },
        /**
         * @returns {String} 
         */
        getContent: function() {
            return this.content_;
        },
        /**
         * @param {String} content 
         */
        setContent: function(content) {
            this.content_ = content;
        },
        /**
         * @param {Info} obj
         * @returns {Boolean}
         */
        equals: function(obj) {
            if (!(obj instanceof Info)) {
                return false;
            }

            if (obj.getId() === this.id_) {
                return true;
            }

            return false;
        }
    });



    return Info;
});