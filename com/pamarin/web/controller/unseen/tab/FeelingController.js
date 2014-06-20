/**
 * @author jittagorn pitakmetagoon
 * create 10/10/2013
 *
 * update 05/06/2014 (jittagorn pitakmetagoon : extends AbstractPageScrollController)
 */
define('com.pamarin.web.controller.unseen.tab.FeelingController', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.context.Configuration',
    'com.pamarin.ui.loader.TemplateLoader',
    'com.pamarin.web.controller.unseen.tab.TabScrollController'
], function(module, Class, Configuration, TemplateLoader, TabScrollController) {

    /**
     * @class FeelingController
     * @extends TabScrollController
     * @controller
     */
    var FeelingController = Class.define(module.id, (function() {

        var host = Configuration.host;

        return {
            /**/
            variable: {
                FEELING_TEMPLATE_URL_: '/unseen/{unseenId}/feeling/feelingItem',
                FEELING_BOX_SELECTOR_: '#pmrUnseenFeeling',
                PAGE_SIZE_: 5,
                SORT_BY_: 'sequence',
                loadService_: 'feelingService'
            },
            /**/
            onJigsawReady: function() {
                var that = this;
                TemplateLoader.load(this.getTemplateUrl(), function(tmpl) {
                    that.render(tmpl);
                });
            },
            /**
             * @returns {String}
             */
            getTemplateUrl: function() {
                return this.FEELING_TEMPLATE_URL_.replace('unseenId', this.getUnseenId());
            },
            /**
             * @param {Feeling} feeling
             * @returns {Object<Key, Value>}
             */
            transform2Template: function(feeling) {
                var profile = feeling.getProfile();

                return {
                    feelingOwnerImage: profile.getImageUrl(),
                    feelingOwnerLink: profile.getProfileUrl(),
                    feelingOwnerName: profile.getName(),
                    feelingOwnerTime: feeling.getTravelTimestamp(),
                    feelingContent: feeling.getContent(),
                    feelingOwnerAll: host + '/' + this.getUnseenId() + '/feeling?tourist=' + profile.getId()
                };
            },
            /**
             * @override
             * @protected
             * 
             * @param {FeelingService} service
             * @param {Pageable} pageable
             * @param {Object} tmpl 
             * @returns {Chain} 
             */
            load: function(service, pageable, tmpl) {
                return service
                        .findByUnseenId(this.getUnseenId(), pageable)
                        .then(function(list) {
                            return !list.forEachEntry(function(feeling) {
                                tmpl.replaceData(this.transform2Template(feeling))
                                        .appendTo(this.FEELING_BOX_SELECTOR_);
                            }, this).isEmpty();
                        }, this);
            }
        };
    })()).extends(TabScrollController);



    return FeelingController;
});