/**
 * @author jittagorn pitakmetagoon
 * create 11/05/2014
 */
define('com.pamarin.web.service.unseen.impl.mock.FeelingServiceImpl', [
    'module',
    'com.pamarin.core.remote.RemoteService',
    'com.pamarin.api.service.unseen.FeelingService',
    'com.pamarin.api.model.unseen.FeelingItem',
    'com.pamarin.api.model.unseen.UserProfileItem',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.context.Configuration'
], function(module, RemoteService, FeelingService, FeelingItem, UserProfileItem, ArrayList, Configuration) {

    /**
     * @class FeelingServiceImpl
     * @service
     */

    var FeelingServiceImpl = RemoteService.define(module.id, (function() {
        
        var host = Configuration.host;

        function createProfile() {
            var profile = new UserProfileItem('10233445');
            profile.setDescription('i am programmer.');
            profile.setName('jittagorn pitakmetagoon');
            profile.setImageUrl(host + '/service/photo/?name=users/user1.png&size=70');
            profile.setProfileUrl(host + '/+jittagornp');

            return profile;
        }

        function createFeeling() {
            var item = new FeelingItem();
            item.setTravelTimestamp(new Date().getTime());
            item.setContent('ssssssssssssssssssssss sssssssssssssss sssssssssssssssssssssss sssssssssssssssss sssssssssssssssss ssssssssssssssssssss sssssssssssssssssssssssssssssssssss sssssssssssssss sssssssssssssssssssssssssss ssssssssssssssssssssssssssssssssss dddddddddddddddddddddddddd ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd dddddddddddddd ddddddddddddddddddddd dddddddddddddddddddddddddddddddddddddddddddddddddddddd dddddddddddd dddddddddddddd ddd');
            item.setProfile(createProfile());

            return item;
        }

        return {
            /**/
            findByUnseenId: function(chain, unseenId) {
                var list = new ArrayList();
                for (var index = 1; index <= 10; index++) {
                    var feeling = createFeeling();
                    feeling.setId(index);
                    list.add(feeling);
                }

                chain.done(list);
            }

        };
    })()).implements(FeelingService);



    return FeelingServiceImpl;
});
