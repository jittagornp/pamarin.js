/**
 * @author jittagorn pitakmetagoon
 * create 16/05/2014
 */
define('com.pamarin.api.service.unseen.FeelingService', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * @interface FeelingService
     */
    var FeelingService = Interface.define(module.id, {
        /**
         * @param {String} unseenId
         * @returns {List<FeelingItem>}
         */
        findByUnseenId: function(unseenId) {

        }
    });



    return FeelingService;
});