/**
 * @auther jittagorn pitakmetagoon
 * create 19/09/2013
 */
define('com.pamarin.web.controller.unseen.PostController', [
    'com.pamarin.ui.loader.TemplateLoader',
    'com.pamarin.ui.loader.ImageLoader',
    'com.pamarin.ui.loader.ComponentLoader',
    'com.pamarin.core.config.Configs',
    'com.pamarin.ui.Focusor'
], function(TemplateLoader, ImageLoader, ComponentLoader, Configs, Focusor) {

    var sharePost = function() {
        var box = null;

        function focusCallback($activeElement) {
            var offset = $activeElement.offset();
            ComponentLoader.load('share.ShareBox', function(shareBox) {
                box = shareBox;
                shareBox.withPosition(offset.left, offset.top).show();
            });
        }

        function blurCallback() {
            if (box !== null) {
                box.hide();
            }
        }

        Focusor.focusOnElement('#pmrShareBox')
                .whenClickElement('.pmr-unseen-post-item-share')
                .withScope(1)
                .onFocus(focusCallback)
                .onBlur(blurCallback)
                .focus();
    };

    var commentTemplate = function(template) {
        for (var i = 0; i < 3; i++) {
            var data = {
                commentImageProfile: Configs.HOST + '/service/photo/?name=users/user1.png&size=40'
            };

            template.setData(data)
                    .replace()
                    .appendTo('#pmrUnseenPostList .pmr-comment-list');
        }

        ImageLoader.load('.pmr-comment-item-box-image');
    };


    var postTemplate = function(template) {
        var data = {
            postImageProfile: Configs.HOST + '/service/photo/?name=unseens/pookradueng/p12.png&size=50',
            postNameProfile: 'ภูกระดึง',
            postLinkProfile: Configs.HOST + '/@unseen2',
            postAdditionalCssClass: '',
            postLastModify: '17/10/2013 14:34:22'
        };

        template.setData(data)
                .replace()
                .appendTo('#pmrUnseenPostList');


        ImageLoader.load('.pmr-post-list img');
        TemplateLoader.load('/unseen/home/commentItem', commentTemplate);
        sharePost();
    };




    return {
        init: function(jigsawContext) {
            TemplateLoader.load('/unseen/home/postItem', postTemplate);
        }
    };
});