/**
 * @author jittagorn pitakmetagoon
 * create 19/09/2013
 */
define('com.pamarin.web.controller.unseen.suggestion.SuggestionController', [
    'module',
    'com.pamarin.core.context.Configuration',
    'com.pamarin.ui.loader.ImageLoader',
    'com.pamarin.ui.loader.TemplateLoader',
    'com.pamarin.api.service.unseen.PresenterService',
    'com.pamarin.api.service.unseen.TouristService',
    'com.pamarin.api.service.unseen.SuggestionService',
    'com.pamarin.web.controller.unseen.UnseenController',
    'com.pamarin.api.model.unseen.Tourists'
], function(module, Configuration, ImageLoader, TemplateLoader, PresenterService, TouristService, SuggestionService, UnseenController, Tourists) {

    var staticPath = Configuration.staticPath;

    /**
     * @class PresenterLoader
     */
    var PresenterLoader = UnseenController.define(module.id + '.PresenterLoader', {
        /**/
        variable: {
            PRESENTER_SELECTOR_: '#pmrOwnerProfile',
            PRESENTER_IMAGE_SELECTOR_: '#pmrOwnerProfile img',
            $element_: null,
            loadService_ : 'presenterService'
        },
        /**/
        constructor: function() {
            this.$element_ = $(this.PRESENTER_SELECTOR_);
        },
        /**/
        load: function() {
            var that = this;
            that.DI.inject(that.loadService_, function(service) {
                service.findByUnseenId(that.getUnseenId())
                        .then(that.process, that)
                        .then(that.loadImage, that, 50);
            }, PresenterService);
        },
        /**
         * @private
         * @param {Presenter} presenter
         */
        process: function(presenter) {
            var that = this;
            var $image = that.$findPresenterImage();
            var $name = that.$findPresenterName();
            var $description = that.$findDescription();
            var $unseen = that.$findUnseenPresenter();

            $image.attr('data-source', presenter.getImageUrl());
            $name.text(presenter.getName());
            $name.attr('href', presenter.getProfileUrl());
            $description.text(presenter.getDescription());

            presenter.getUnseens().forEachEntry(function(unseen) {
                $unseen.append(that.create$UnseenItem(unseen));
            });
        },
        /**/
        loadImage: function() {
            ImageLoader.load(this.PRESENTER_IMAGE_SELECTOR_);
        },
        /**
         * @private
         * @returns {jQuery} 
         */
        create$UnseenItem: function(unseen) {
            var $image = $('<img>')
                    .attr('src', staticPath + '/images/standby.png')
                    .attr('data-source', unseen.getImageUrl());

            var $link = $('<a>')
                    .addClass('pmr-image-wrapper')
                    .addClass('break-link')
                    .attr('href', unseen.getProfileUrl())
                    .html($image)
                    .css('display', 'block');

            return $('<li>').html($link);
        },
        /**
         * @private
         * @returns {jQuery} 
         */
        $findPresenterName: function() {
            return this.$element_.find('.pmr-owner-name');
        },
        /**
         * @private
         * @returns {jQuery} 
         */
        $findPresenterImage: function() {
            return this.$element_.find('.pmr-presenter-image');
        },
        /**
         * @private
         * @returns {jQuery} 
         */
        $findDescription: function() {
            return this.$element_.find('.pmr-account-say');
        },
        /**
         * @private
         * @returns {jQuery} 
         */
        $findUnseenPresenter: function() {
            return this.$element_.find('.pmr-profile-unseen-list');
        }
    });

    /**
     * @class TouristLoader
     */
    var TouristLoader = UnseenController.define(module.id + '.TouristLoader', {
        /**/
        variable: {
            TOURIST_: '#pmrUnseenTourist',
            TOURIST_LIST_SELECTOR_: '#pmrUnseenTouristList',
            TOURIST_IMAGE_SELECTOR_: '#pmrUnseenTouristList img',
            $tourist_: null,
            $touristList_: null
        },
        /**/
        constructor: function() {
            this.$touristList_ = $(this.TOURIST_LIST_SELECTOR_);
            this.$tourist_ = $(this.TOURIST_);
        },
        /**/
        load: function() {
            var that = this;
            that.DI.inject('touristService', function(service) {
                service.findByUnseenId(that.getUnseenId())
                        .then(that.process, that);
            }, TouristService);
        },
        /**
         * @private
         * @param {List} tourists
         */
        process: function(tourists) {
            var that = this;
            var list = tourists.getTourists();
            that.$findTotalTourist().text(tourists.getTotalTourist());

            if (list.isEmpty()) {
                that.generateEmptyTouristMessage();
                return;
            }

            list.forEachEntry(function(tourist, index) {
                that.generateTouristTemplate(tourist, index);
                ImageLoader.load(that.TOURIST_IMAGE_SELECTOR_);
            });
        },
        /**/
        generateEmptyTouristMessage: function() {
            var $li = $('<li>').css({
                'padding': '10px',
                'background-color': 'rgb(240, 240, 240)'
            }).text('ไม่มีข้อมูลนักท่องเที่ยว');

            this.$touristList_.append($li);
        },
        /**
         * @private
         * @returns {jQuery} 
         */
        $findTotalTourist: function() {
            return this.$tourist_.find('.pmr-unseen-tourist-total');
        },
        /**/
        generateTouristTemplate: function(tourist, index) {
            var $box = this.$generateTouristBox(tourist);
            var NUMBER_OF_ROW = Tourists.constant('NUMBER_OF_ROW');
            var MAX_TOURIST = Tourists.constant('MAX_TOURIST');

            (index + 1) % NUMBER_OF_ROW === 0 ? $box.css({
                'margin-right': 0
            }) : $box.css({
                'margin-right': '4px'
            });

            if (index + 1 < MAX_TOURIST - NUMBER_OF_ROW) {
                $box.css({
                    'margin-bottom': '4px'
                });
            }

            this.$touristList_.append(this.$generateTouristItem($box, index));
        },
        /**
         * @private
         * @returns {jQuery} 
         */
        $generateTouristItem: function($box, index) {
            return $('<li>').attr('data-sequence', index)
                    .addClass('pmr-unseen-tourist-item')
                    .html($box);
        },
        /**
         * @private
         * @returns {jQuery} 
         */
        $generateTouristBox: function(tourist) {
            var $image = $('<img>')
                    .attr('src', staticPath + '/images/standby.png')
                    .attr('data-source', tourist.getImageUrl())
                    .addClass('pmr-unseen-tourist-image');

            var $link = $('<a>')
                    .attr('title', tourist.getName())
                    .attr('href', tourist.getProfileUrl())
                    .css({
                        'display': 'block',
                        'width': '53px',
                        'height': '53px'
                    })
                    .addClass('break-link')
                    .html($image);

            return $('<div>')
                    .addClass('pmr-unseen-tourist-item-box')
                    .html($link);
        }
    });

    /**
     * @class SuggestionController
     * @controller
     */
    var SuggestionController = UnseenController.define(module.id, {
        /**/
        variable: {
            SUGGEST_TEMPLATE_URL_: '/unseen/suggestItem',
            SUGGEST_LIST_SELECTOR_: '#pmrSuggestUnseen .pmr-list',
            SUGGEST_IMAGE_SELECTOR_: '.pmr-suggest-image'
        },
        /**/
        onJigsawReady: function(jigsawContext) {
            (new TouristLoader()).load();
            (new PresenterLoader()).load();

            var that = this;
            TemplateLoader.load(this.SUGGEST_TEMPLATE_URL_, function(templ) {
                that.DI.inject('suggestionService', function(service) {
                    service
                            .findByUnseenId(that.getUnseenId())
                            .then(function(list) {
                                list.forEachEntry(function(suggest, index) {
                                    var obj = that.transform2Template(suggest, index);
                                    templ.replaceData(obj).appendTo(that.SUGGEST_LIST_SELECTOR_);
                                });
                            })
                            .then(that.loadImage, that, 50);
                }, SuggestionService);
            });
        },
        /**/
        loadImage: function() {
            ImageLoader.load(this.SUGGEST_IMAGE_SELECTOR_);
        },
        /**/
        transform2Template: function(suggest, index) {
            return  {
                suggestSequence: index,
                suggestUrl: suggest.getUrl(),
                suggestName: suggest.getName(),
                suggestContent: suggest.getDescription(),
                suggestImage: suggest.getImageUrl()
            };
        }
    });



    return SuggestionController;
});