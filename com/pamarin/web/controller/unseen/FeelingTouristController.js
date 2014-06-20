/**
 * @author jittagorn pitakmetagoon
 * create 13/10/2013
 */
define('com.pamarin.web.controller.unseen.FeelingTouristController', [
    'com.pamarin.ui.loader.ImageLoader',
    'com.pamarin.ui.loader.TemplateLoader',
    'com.pamarin.web.util.UnseenUtils'
], function(ImageLoader, TemplateLoader, UnseenUtils) {

    function init(jigsawContext) {
        //var $touristImageWrapper = $('#pmrUnseenFeelingTouristHeaderImageWrapper');

        ImageLoader.load('#pmrUnseenFeelingTouristHeaderImageWrapper img');


        var unseenId = UnseenUtils.getUnseenId();
        TemplateLoader.load('/unseen/' + unseenId + '/feeling/feelingTouristItem', function(currentTemplateInstance) {
            for (var i = 0; i < 10; i++) {
                var data = {
                };
//
                currentTemplateInstance.setData(data)
                        .replace()
                        .appendTo('#pmrUnseenFeelingTourist');
            }
//
//            ImageLoader.load('.pmr-unseen-feeling-item-box-image');
        });
    }

    return {
        init: init
    };
});