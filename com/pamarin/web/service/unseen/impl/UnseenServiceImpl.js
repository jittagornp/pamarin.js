/**
 * @author jittagorn pitakmetagoon
 * create 11/05/2014
 */
define('com.pamarin.web.service.unseen.impl.UnseenServiceImpl', [
    'module',
    'com.pamarin.core.remote.RemoteService',
    'com.pamarin.api.service.unseen.UnseenService',
    'com.pamarin.web.repositories.UnseenRepo',
    'com.pamarin.core.creational.Singleton'
], function(module, RemoteService, UnseenService, UnseenRepo, Singleton) {

    /**
     * @class UnseenServiceImpl
     * @implements UnseenService
     * @service
     */
    var UnseenServiceImpl = RemoteService.define(module.id, (function() {

        var unseenRepo = Singleton.getInstance(UnseenRepo, null);

        return {
            /**/
            findUnseen: function(chain) {
                chain.done(unseenRepo.findUnseen());
            }

        };
    })()).implements(UnseenService);



    return UnseenServiceImpl;
});
