/**
 * @author jittagorn pitakmetagoon
 * create 11/05/2014
 */
define('com.pamarin.api.service.unseen.InfoService', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * @interface InfoService
     */
    var InfoService = Interface.define(module.id, {
        /**
         * @param {String} unseenId
         * @returns {List<Info>}
         */
        findByUnseenId: function(unseenId, pageable) {

        }
    });



    return InfoService;
});