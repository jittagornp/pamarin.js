/**
 * @author jittagorn pitakmetagoon
 * create 12/05/2014
 */
define('com.pamarin.api.service.unseen.PresenterService', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * @interface PresenterService
     */
    var PresenterService = Interface.define(module.id, {
        /**
         * @param {String} unseenId
         * @returns {List<Presenter>}
         */
        findByUnseenId: function(unseenId) {

        }
    });



    return PresenterService;
});