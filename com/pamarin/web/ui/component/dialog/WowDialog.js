/**
 * @author jittagorn pitakmetagoon
 * create 28/10/2013
 */
define('com.pamarin.web.ui.component.dialog.WowDialog', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.ui.component.dialog.ContextualDialog',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.loader.TemplateLoader',
    'com.pamarin.ui.loader.ImageLoader',
    'com.pamarin.ui.Scrollbar',
    'com.pamarin.core.config.Configs',
    'com.pamarin.core.creational.Singleton'
], function(module, $, ContextualDialog, Class, TemplateLoader, ImageLoader, Scrollbar, Configs, Singleton) {

    var WowDialog = Class.define(module.id, {
        //
        constructor: function(element) {
            WowDialog.superConstructor.call(this, element);
        },
        //
        init: function(componentContext) {
            var self = this;
            TemplateLoader.load('/dialog/WowDialog/wowItem', function(template) {
                for (var i = 0; i < 10; i++) {
                    var data = {
                        wowOwnerImage: Configs.HOST + '/service/photo/?name=users/user1.png&size=40',
                        wowOwnerName: 'jittagorn pitakmetagoon',
                        wowOwnerURL: Configs.HOST + '/+jittagorn.pitakmetagoon'
                    };

                    template.setData(data)
                            .replace()
                            .appendTo('#pmrWowDialogList');
                }

                ImageLoader.load('.pmr-comment-item-box-image');
                $('.pmr-wow-item-link').binding('click', function() {
                    self.close();
                });
            });

            Scrollbar.createOnElement('#pmrWowDialogBodyContent').get();
        }
    }).extends(ContextualDialog);



    return Singleton.getInstance(WowDialog, '#pmrWowDialog');
});