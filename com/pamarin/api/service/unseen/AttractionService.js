/**
 * @author jittagorn pitakmetagoon
 * create 14/05/2014
 */
define('com.pamarin.api.service.unseen.AttractionService', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * @interface AttractionService
     */
    var AttractionService = Interface.define(module.id, {
        /**
         * @param {String} unseenId
         * @returns {List<Attraction>}
         */
        findByUnseenId: function(unseenId) {

        }
    });



    return AttractionService;
});