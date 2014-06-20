/**
 * @author jittagorn pitakmetagoon
 * create 07/05/2014
 */
define('com.pamarin.api.service.unseen.SuggestionService', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * @interface SuggestionService
     */
    var SuggestionService = Interface.define(module.id, {
        /**
         * @param {String} unseenId
         * @returns {List<Suggestion>}
         */
        findByUnseenId: function(unseenId) {

        }
    });



    return SuggestionService;
});