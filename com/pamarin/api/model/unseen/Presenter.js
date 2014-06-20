/**
 * @author jittagorn pitakmetagoon
 * create 12/05/2014
 */
define('com.pamarin.api.model.unseen.Presenter', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.collection.ArrayList'
], function(module, Class, ArrayList) {

    /**
     * @class Presenter
     * @model 
     */
    var Presenter = Class.define(module.id, {
        /**/
        variable: {
            id_: null,
            name_: null,
            profileUrl_: null,
            imageUrl_: null,
            description_: null,
            unseens_: null
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
         * @returns {List<UnseenPresenter>}
         */
        getUnseens: function() {
            if (this.unseens_ === null) {
                this.unseens_ = new ArrayList();
            }

            return this.unseens_;
        },
        /**
         * @param {List<UnseenPresenter>} unseens 
         */
        setUnseens: function(unseens) {
            this.unseens_ = unseens;
        },
        /**
         * @param {Presenter} obj 
         */
        equals: function(obj) {
            if (!(obj instanceof Presenter)) {
                return false;
            }

            if (this.id_ === obj.getId()) {
                return true;
            }

            return false;
        }
    });



    return Presenter;
});