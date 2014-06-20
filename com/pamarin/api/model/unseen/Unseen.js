/**
 * @author jittagorn pitakmetagoon
 * create 22/09/2013
 */
define('com.pamarin.api.model.unseen.Unseen', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.api.model.Gps'
], function(module, Class, Gps) {

    /**
     * @class Unseen
     * @model
     */
    var Unseen = Class.define(module.id, {
        /**/
        variable: {
            id_: null,
            unseenId_: null,
            unseenName_: null,
            gps_: null
        },
        /**
         * @param {String} id
         */
        constructor: function(id) {
            this.id_ = id || null;
        },
        /**/
        getId: function() {
            return this.id_;
        },
        /**
         * @param {String} id
         */
        setId: function(id) {
            this.id_ = id;
        },
        /**/
        getUnseenId: function() {
            return this.unseenId_;
        },
        /**/
        setUnseenId: function(unseenId) {
            this.unseenId_ = unseenId;
        },
        /**
         * @returns {String}
         */
        getUnseenName: function() {
            return this.unseenName_;
        },
        /**/
        setUnseenName: function(name) {
            this.unseenName_ = name;
        },
        /**/
        getGps: function() {
            if (this.gps_ === null) {
                this.gps_ = new Gps();
            }

            return this.gps_;
        },
        /**/
        setGps: function(gps) {
            this.gps_ = gps;
        },
        /**/
        equals: function(object) {
            if (!(object instanceof Unseen)) {
                return false;
            }

            if (this.id_ === object.getId()) {
                return true;
            }

            return false;
        }
    });



    return Unseen;
});