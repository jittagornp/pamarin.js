/**
 * @author jittagorn pitakmetagoon
 * create 07/05/2014
 */
define('com.pamarin.web.service.unseen.impl.mock.TouristServiceImpl', [
    'module',
    'com.pamarin.core.remote.RemoteService',
    'com.pamarin.api.service.unseen.TouristService',
    'com.pamarin.api.model.unseen.Tourists',
    'com.pamarin.api.model.unseen.Tourist',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.context.ApplicationContext',
    'com.pamarin.data.domain.PageImpl'
], function(module, RemoteService, TouristService, Tourists, Tourist, ArrayList, ApplicationContext, PageImpl) {

    /**
     * @class TouristServiceImpl
     * @service
     */
    var TouristServiceImpl = RemoteService.define(module.id, (function() {

        var applicationContext = ApplicationContext.getInstance();
        var contextParameters = applicationContext.getParameter('contextParameters');
        var HOST = contextParameters.host + contextParameters.contextPath;


        function createTourists() {
            var tourists = new Tourists();
            tourists.setId('12345');
            tourists.setTotalTourist(13025);

            return tourists;
        }

        function createTourist(index) {
            var tourist = new Tourist();

            tourist.setId(index);
            tourist.setName('jittagorn pitakmetagoon');
            tourist.setProfileUrl(HOST + '/+jittagornp');
            tourist.setImageUrl(HOST + '/service/photo/?name=users/user' + (index % 4 + 1) + '.png&size=53');

            return tourist;
        }

        return {
            /**
             * @param {String} unseenId
             */
            findByUnseenId: function(chain, unseenId) {
                var tourists = createTourists();

                var list = new ArrayList();
                for (var index = 1; index <= Tourists.constant('MAX_TOURIST'); index++) {
                    list.add(createTourist(index));
                }

                tourists.setTourists(list);
                chain.done(tourists);
            },
            /**
             * 
             * @param {Chain} chain
             * @param {String} unseenId
             * @param {Pageable} pageable
             * @returns {undefined}
             */
            findFullByUnseenId: function(chain, unseenId, pageable) {
                var list = new ArrayList();
                for (var index = 1; index <= pageable.getPageSize(); index++) {
                    list.add(createTourist(index));
                }

                chain.done(new PageImpl(list, pageable, 300));
            }
        };
    })()).implements(TouristService);



    return TouristServiceImpl;
});