/**
 * @author jittagorn pitakmetagoon
 * create 29/09/2013
 */
define('com.pamarin.web.controller.unseen.HomeController', [
    'com.pamarin.ui.loader.TemplateLoader',
    'com.pamarin.ui.loader.ImageLoader',
    'com.pamarin.ui.loader.ComponentLoader',
    'com.pamarin.core.config.Configs',
    'com.pamarin.ui.Focusor',
    'com.pamarin.ui.WindowInfiniteScroll',
    'com.jquery.core.JQuery'
], function(TemplateLoader, ImageLoader, ComponentLoader, Configs, Focusor, WindowInfiniteScroll, $) {

//    var sharePost = function() {
//        var box = null;
//
//        function focusCallback($clickElement) {
//            var offset = $clickElement.offset();
//            ComponentLoader.load('share.ShareBox', function(shareBox) {
//                box = shareBox;
//                shareBox.withPosition(offset.left, offset.top).show();
//            });
//
//            console.log('share focus');
//        }
//
//        function blurCallback() {
//            if (box !== null) {
//                box.hide();
//            }
//
//            console.log('share blur');
//        }
//
//        Focusor.focusOnElement('#pmrShareBox')
//                .whenClickElement('.pmr-unseen-post-item-share')
//                .withScope(1)
//                .onFocus(focusCallback)
//                .onBlur(blurCallback)
//                .focus();
//    };
//
//
//
//    var commentTemplate = function(template) {
//        for (var i = 0; i < 3; i++) {
//            var data = {
//                commentImageProfile: Configs.HOST + '/service/photo/?name=users/user1.png&size=40'
//            };
//
//            template.setData(data)
//                    .replace()
//                    .appendTo('#pmrUnseenHomePostList .pmr-comment-list');
//        }
//
//        ImageLoader.load('.pmr-comment-item-box-image');
//    };
//
//
//
//    var postOptionBinding = function() {
//        var $postList = $('#pmrUnseenHomePostList');
//        $postList.children('.pmr-unseen-post-item-list').each(function() {
//            var $item = $(this);
//            var $option = $item.find('.pmr-unseen-post-item-option');
//            var $icon = $option.children('.pmr-icon');
//            var $optionBox = $option.children('.pmr-option-box');
//
//            Focusor.focusOnElement($optionBox)
//                    .whenClickElement($icon)
//                    .withScope(1)
//                    .onFocus(function() {
//                        console.log('option focus');
//                    })
//                    .onBlur(function() {
//                        console.log('option blur');
//                    })
//                    .focus();
//        });
//    };
//
//    var postTemplate = function(template) {
//        for (var i = 0; i < 10; i++) {
//            var data = {
//                postImageProfile: Configs.HOST + '/service/photo/?name=unseens/pookradueng/p12.png&size=50',
//                postNameProfile: 'ภูกระดึง',
//                postLinkProfile: Configs.HOST + '/@unseen2',
//                postAdditionalCssClass: (i === 1) ? 'extra' : '',
//                postLastModify: '17/10/2013 14:34:22'
//            };
//
//            template.setData(data)
//                    .replace()
//                    .appendTo('#pmrUnseenHomePostList');
//        }
//
//
//        ImageLoader.load('.pmr-post-list img');
//        postOptionBinding();
//        TemplateLoader.load('/unseen/home/commentItem', commentTemplate);
//        sharePost();
//
//
//        WindowInfiniteScroll.addScrollListener(1, function(percentScroll, fixedScroll) {
//            console.log('window scroll --> ' + percentScroll);
//        });
//
//        $('.pmr-edit-post-button').binding('click', 1, function() {
//            ComponentLoader.load('dialog.EditPostDialog', function(dialog) {
//                dialog.show();
//            });
//        });
//
//
//        $('.pmr-delete-post-button').binding('click', 1, function() {            
//            ComponentLoader.load('dialog.ConfirmDialog', function(dialog) {
//                dialog.onOK(function() {
//                        $.get(Configs.HOST + '/unseen/post/delete/1');
//                })
//                        .onCancel(function() {
//                            console.log('delete post cancel');
//                        })
//                                .setHtmlBody('confirm delete this post?')
//                        .show();
//            });
//        });
//    };
//
//


    return {
        init: function(jigsawContext) {
//            TemplateLoader.load('/unseen/home/postItem', postTemplate);
//            var $aboutEdit = $('#pmrUnseenHomeAboutEdit');
//
//            $aboutEdit.binding('click', 1, function() {
//                ComponentLoader.load('dialog.TextAreaEditorDialog', function(dialog) {
//                    dialog.setTitle('pookradueng about')
//                            //.setWidth(600)
//                            //.setHeight(500)
//                            .onSave(function() {
//                                console.log(dialog.getText());
//                            }).onCancel(function() {
//                        console.log('cancel');
//                    }).show();
//                });
//            });
        }
    };
});