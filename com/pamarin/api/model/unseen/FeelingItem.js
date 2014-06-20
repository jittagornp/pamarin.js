/**
 * @author jittagorn pitakmetagoon
 * create 16/05/2014
 */
define('com.pamarin.api.model.unseen.FeelingItem', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {

    /**
     * @class FeelingItem
     * @model
     */
    var FeelingItem = Class.define(module.id, {
        /**/
        variable: {
            id_: null, //String
            profileItem_: null, //com.pamarin.api.model.unseen.ProfileItem
            tralvelTimestamp_: null, //Number
            content_: null //String
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
         * @returns {ProfileItem}
         */
        getProfile: function() {
            return this.profileItem_;
        },
        /**
         * @param {ProfileItem} profile
         */
        setProfile: function(profile) {
            this.profileItem_ = profile;
        },
        /**
         * @returns {Number} 
         */
        getTravelTimestamp: function() {
            return this.tralvelTimestamp_;
        },
        /**
         * @param {Number} timestamp 
         */
        setTravelTimestamp: function(timestamp) {
            this.tralvelTimestamp_ = timestamp;
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
         * @param {FeelingItem} obj
         * @returns {Boolean}
         */
        equals: function(obj) {
            if (!(obj instanceof FeelingItem)) {
                return false;
            }

            if (this.getId() === obj.getId()) {
                return true;
            }

            return false;
        }
    });



    return FeelingItem;
});