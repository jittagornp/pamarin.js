/**
 * @author jittagorn pitakmetagoon
 * create 06/10/2013
 * 
 * update 04/06/2014 (jittagorn pitakmetagoon : extends AbstractPageScrollController)
 */
define('com.pamarin.web.controller.unseen.tab.InformationController', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.loader.TemplateLoader',
    'com.pamarin.web.controller.unseen.tab.TabScrollController'
], function(module, Class, TemplateLoader, TabScrollController) {

    /**
     * @class InformationController
     * @extends TabScrollController
     * @controller
     */
    var InformationController = Class.define(module.id, {
        /**/
        variable: {
            ARTICLE_LIST_SELECTOR_: '#pmrUnseenInformationArticle ul',
            INFO_TEMPLATE_URL_: '/unseen/{unseenId}/information/articleItem',
            PAGE_SIZE_: 5,
            SORT_BY_: 'sequence',
            loadService_ : 'infoService'
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
            return this.INFO_TEMPLATE_URL_.replace('unseenId', this.getUnseenId());
        },
        /**
         * @param {Info} info
         * @returns {Object<Key, Value>}
         */
        transform2Template: function(info) {
            return {
                informationArticleTitle: info.getTitle(),
                informationArticleContent: info.getContent()
            };
        },
        /**
         * @override
         * @protected
         * 
         * @param {InfoService} service
         * @param {Pageable} pageable
         * @param {Object} tmpl 
         * @returns {Chain} 
         */
        load: function(service, pageable, tmpl) {
            return service
                    .findByUnseenId(this.getUnseenId(), pageable)
                    .then(function(list) {
                        return !list.forEachEntry(function(info) {
                            tmpl.replaceData(this.transform2Template(info))
                                    .appendTo(this.ARTICLE_LIST_SELECTOR_);
                        }, this).isEmpty();
                    }, this);
        }
    }).extends(TabScrollController);



    return InformationController;
});