/**
 * @author  jittagorn pitakmetagoon
 * create  14/04/2013
 * 
 * update  08/06/2013 (jittagorn pitakmetagoon : add to AMD)
 */

define('com.pamarin.web.controller.unseen.MainController', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.structural.Proxy',
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Urls',
    'com.pamarin.ui.loader.JigsawLoader',
    //'com.pamarin.ui.NavigateMenu',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.web.controller.unseen.UnseenController'
], function(module, Class, Proxy, $, Urls, JigsawLoader/*, NavigateMenu*/, LoggerFactory, UnseenController) {

    var LOG = LoggerFactory.getLogger(module.id);

    /**
     * @class Suggestion
     */
    var Suggestion = UnseenController.define(module.id + '.Suggestion', {
        /**/
        variable: {
            SPACE_SELECTOR_: '#pmrUnseenSuggestionContent',
            backup_: null,
            loadeds_: null
        },
        /**/
        constructor: function() {
            this.loadeds_ = {};
        },
        /**
         * @private
         * @returns {String} 
         */
        getDecision: function() {
            if (Urls.contains('photo?albumId')) {
                return 'commentAlbum/' + Urls.getQueryStringParameterByName('albumId');
            }

            if (Urls.contains('photo')) {
                return null;
            }

            return 'suggestion';
        },
        /**/
        reload: function() {
            var decision = this.getDecision();
            if (decision === this.backup_) {
                return;
            }

            var suggestUrl = '/' + this.getUnseenId() + '/' + decision;
            if (decision && !this.loadeds_[decision]) {
                JigsawLoader.load(this.SPACE_SELECTOR_, suggestUrl);
            }

            this.backup_ = decision;
            this.loadeds_[decision] = true;
        }
    });

    /**
     * @class HeaderMenu
     */
    var HeaderMenu = Class.define(module.id + '.HeaderMenu', {
        /**/
        variable: {
            MENU_SELECTOR_: '#pmrUnseenHeaderMenuContent .pmr-menu',
            ACTIVE_CLASS_: 'active',
            $element_: null,
            DEFAULT_TAB_: 'information'
        },
        /**/
        constructor: function() {
            this.$element_ = $(this.MENU_SELECTOR_);
        },
        /**/
        isEqualsPath: function(path1, path2) {
            return path1 === path2
                    || path1 === path2 + '/'
                    || path1 + '/' + this.DEFAULT_TAB_ === path2
                    || path1 + '/' + this.DEFAULT_TAB_ + '/' === path2
                    || path1 + '/' + this.DEFAULT_TAB_ + '/' === path2 + '/';
        },
        /**/
        highlight: function() {
            var currentUrlPath = Urls.getPath();

            var eachItemProxy = Proxy.call(this, function(index, element) {
                var $item = $(element);
                var $link = $item.find('a');
                var menuLink = $link.attr('href');
                var menuPath = Urls.getPath(menuLink);

                var func = this.isEqualsPath(currentUrlPath, menuPath) ? $item.addClass : $item.removeClass;
                func.call($item, this.ACTIVE_CLASS_);
            });

            this.$element_.find('li').each(eachItemProxy);
        }
    });

    /**
     * @class MainController
     */
    var MainController = UnseenController.define(module.id, (function() {

        return {
            /**/
            variable: {
                unseenContext_: null,
                pageContext_: null,
                TAB_SPACE_SELECTOR_: '#pmrUnseenPresent',
                TAB_MENU_ELEMENT_: '#pmrUnseenHeaderMenuContent',
                PROFILE_IMAGE_SELECTOR_: '#pmrUnseenImageBox img',
                COVER_IMAGE_SELECTOR_: '#pmrUnseenCover img'
            },
            /**
             * @param {JigsawContext} jigsawContext
             */
            onJigsawReady: function(jigsawContext) {
                var unseenContext = this.getUnseenContext();
                var tab = unseenContext.getCurrentTab();

                unseenContext.addContextChangeListener(function() {
                    LOG.debug('context change listener!');
                });

                this.createTabMenu();
                this.detectTabChangeListener();
                this.reloadTab(tab.getUrl());
            },
            /**/
            reloadTab: function(tabUrl) {
                JigsawLoader.load(this.TAB_SPACE_SELECTOR_, tabUrl);
            },
            /**
             * @private
             * @returns {Array}
             */
            getTabMenuData: function() {
                var currentRealPageUrl = this.getUnseenContext().getPageContext()
                        .getCurrentPage()
                        .getRealUrl();

                return [
                    //{name: 'home', url: currentRealPageUrl, title: 'home'},
                    {name: 'information', url: currentRealPageUrl + '/information', title: 'information'},
                    {name: 'photos', url: currentRealPageUrl + '/photo', title: 'photos'},
                    {name: 'feeling', url: currentRealPageUrl + '/feeling', title: 'feeling'}
                ];
            },
            /**
             * @private
             */
            createTabMenu: function() {
//                NavigateMenu.createInElement(this.TAB_MENU_ELEMENT_)
//                        .withData(this.getTabMenuData())
//                        .create();
            },
            /**
             * @private
             */
            detectTabChangeListener: function() {
                var that = this;
                var headerMenu = new HeaderMenu();
                var suggestion = new Suggestion();

                suggestion.reload();
                headerMenu.highlight();

                this.getUnseenContext().addTabChangeListener(function(context) {
                    that.reloadTab(context.getTab().getUrl());
                    suggestion.reload();
                    headerMenu.highlight();
                }, false);
            }
        };
    })());



    return MainController;
});