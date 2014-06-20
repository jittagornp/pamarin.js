/**
 * @author jittagorn pitakmetagoon
 * create 11/06/2014
 */
define('com.pamarin.api.service.unseen.UnseenService', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * @interface UnseenService
     */
    var UnseenService = Interface.define(module.id, {
        /**/
        findUnseen: function() {

        }
    });

    return UnseenService;
});