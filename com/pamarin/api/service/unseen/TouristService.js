/**
 * @author jittagorn pitakmetagoon
 * create 07/05/2014
 */
define('com.pamarin.api.service.unseen.TouristService', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * @interface TouristService
     */
    var TouristService = Interface.define(module.id, {
        /**
         * @param {String} unseenId
         * @returns {List<Tourists>}
         */
        findByUnseenId: function(unseenId) {

        },
        /**
         * @param {String} unseenId
         * @param {Pageable} pageable
         * @returns {List<Tourist>}
         */
        findFullByUnseenId: function(unseenId, pageable) {

        }
    });



    return TouristService;
});