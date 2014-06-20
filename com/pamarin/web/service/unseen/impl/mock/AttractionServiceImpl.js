/**
 * @author jittagorn pitakmetagoon
 * create 15/05/2014
 */
define('com.pamarin.web.service.unseen.impl.mock.AttractionServiceImpl', [
    'module',
    'com.pamarin.core.remote.RemoteService',
    'com.pamarin.api.service.unseen.AttractionService',
    'com.pamarin.api.model.unseen.Attraction',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.context.Configuration'
], function(module, RemoteService, AttractionService, Attraction, ArrayList, Configuration) {

    /**
     * @class AttractionServiceImpl
     * @service
     */
    var AttractionServiceImpl = RemoteService.define(module.id, (function() {

        var host = Configuration.host;

        function createAttraction(index) {
            var attraction = new Attraction();
            attraction.setTitle('name ' + index);
            attraction.setBody(host + '/service/photo/?name=unseens/pookradueng/p' + index + '.png&size=294');
            attraction.setDescription('description ' + index);

            return attraction;
        }

        return {
            /**/
            findByUnseenId: function(chain, unseenId) {
                var list = new ArrayList();
                for (var index = 1; index <= 10; index++) {
                    var attraction = createAttraction(index);
                    attraction.setId(index);
                    list.add(attraction);
                }
                
                chain.done(list);
            }

        };
    })()).implements(AttractionService);



    return AttractionServiceImpl;
});