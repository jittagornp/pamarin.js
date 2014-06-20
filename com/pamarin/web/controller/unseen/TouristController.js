/**
 * @author jittagorn pitakmetagoon
 * create 19/09/2013
 */
define('com.pamarin.web.controller.unseen.TouristController', [
    'com.pamarin.core.config.Configs',
    'com.pamarin.ui.loader.TemplateLoader',
    'com.pamarin.ui.loader.ImageLoader',
    'com.pamarin.web.util.UnseenUtils'
], function(Configs, TemplateLoader, ImageLoader, UnseenUtils) {

    function init(jigsawContext) {
        var unseenId = UnseenUtils.getUnseenId();
        
        TemplateLoader.load('/unseen/' + unseenId + '/tourist/touristItem', function(currentTemplateInstance) {
            for (var i = 0; i < 30; i++) {
                var data = {
                    'touristName': 'jittagorn pitakmetagoon',
                    'touristLik': Configs.HOST + '/+jittagornp',
                    'touristImage': Configs.HOST + '/service/photo/?name=users/user1.png&size=120'
                };
                
                currentTemplateInstance.setData(data)
                        .replace()
                        .appendTo('.pmr-present-content');
            }

            ImageLoader.load('.pmr-present-content img');
        });
    }

    return {
        init: init
    };
});