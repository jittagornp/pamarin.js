/**
 * @author jittagorn pitakmetagoon
 * create 11/06/2014
 */
define('com.pamarin.web.adapter.UnseenAdapter', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.api.model.unseen.Unseen',
    'com.pamarin.api.model.Gps'
], function(module, Class, Unseen, Gps) {

    /**
     * @class UnseenAdapter
     */
    var UnseenAdapter = Class.define(module.id, {
        /**
         * @param {Object} obj
         * @returns {Unseen}
         */
        fromJSON: function(obj) {
            var unseen = new Unseen();

            unseen.setUnseenId(obj.unseenId);
            unseen.setUnseenName(obj.unseenName);
            unseen.setGps(new Gps(obj.gps.latitude, obj.gps.longitude));

            return unseen;
        }
    });

    return UnseenAdapter;
});