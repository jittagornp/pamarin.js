/**
 * @author jittagorn pitakmetagoon
 * create 06/06/2014
 */
define('com.pamarin.web.controller.unseen.tab.TouristController', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.loader.TemplateLoader',
    'com.pamarin.web.controller.unseen.tab.TabScrollController'
], function(module, Class, TemplateLoader, TabScrollController) {

    /**
     * @class TouristController
     * @extends TabScrollController
     * @controller
     */
    var TouristController = Class.define(module.id, {
        /**/
        variable: {
            TOURIST_LIST_SELECTOR_: '#pmrUnseenFullTourist ul',
            TEMPLATE_URL_: '/unseen/{unseenId}/tourist/touristItem',
            PAGE_SIZE_: 100,
            SORT_BY_: 'sequence',
            loadService_: 'touristService'
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
            return this.TEMPLATE_URL_.replace('unseenId', this.getUnseenId());
        },
        /**
         * @param {Tourist} obj
         * @returns {Object<Key, Value>}
         */
        transform2Template: function(obj) {
            return {
                touristProfileUrl: obj.getProfileUrl(),
                touristImageUrl: obj.getImageUrl(),
                touristName: obj.getName()
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
                    .findFullByUnseenId(this.getUnseenId(), pageable)
                    .then(function(page) {
                        page.getContent().forEachEntry(function(tourist) {
                            tmpl.replaceData(this.transform2Template(tourist))
                                    .appendTo(this.TOURIST_LIST_SELECTOR_);
                        }, this);

                        return page.hasNext();
                    }, this);
        }
    }).extends(TabScrollController);



    return TouristController;
});