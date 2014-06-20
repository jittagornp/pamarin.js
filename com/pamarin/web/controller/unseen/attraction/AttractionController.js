/**
 * @author jittagorn pitakmetagoon
 * create 29/09/2013
 */
define('com.pamarin.web.controller.unseen.attraction.AttractionController', [
    'module',
    'com.pamarin.web.controller.unseen.UnseenController',
    'com.pamarin.ui.loader.TemplateLoader',
    'com.pamarin.ui.loader.ImageLoader',
    'com.pamarin.api.service.unseen.AttractionService',
    'com.pamarin.ui.Scrollbar'
], function(module, UnseenController, TemplateLoader, ImageLoader, AttractionService, Scrollbar) {

    /**
     * @class AttractionController
     * @controller
     */
    var AttractionController = UnseenController.define(module.id, {
        /**/
        variable: {
            ATTRACTION_TEMPLATE_URL_: '/unseen/attraction/imageItem',
            BLOCK_SELECTOR_: '.pmr-attraction-list.image',
            IMAGE_SELECTOR_: '.pmr-attraction-item-image',
            SCROLLBAR_SELECTOR_ : '#pmrUnseenAttractionWindowScroll'
        },
        /**/
        onJigsawReady: function(jigsawContext) {
            var that = this;
            TemplateLoader.load(that.ATTRACTION_TEMPLATE_URL_, function(templ) {
                that.DI.inject('attractionService', function(service) {
                    service
                            .findByUnseenId(that.getUnseenId())
                            .then(function(list) {
                                list.forEachEntry(function(atrct) {
                                    var obj = that.transform2Template(atrct);
                                    templ.replaceData(obj).appendTo(that.BLOCK_SELECTOR_);
                                });
                            })
                            .then(that.loadImage, that, 50)
                            .then(function(){
                                Scrollbar.scrollOnElement(that.SCROLLBAR_SELECTOR_).start();
                            });
                }, AttractionService);
            });
        },
        /**/
        loadImage: function() {
            ImageLoader.load(this.IMAGE_SELECTOR_, function(image, status) {
                var parent = image.parent().parent();
                status === 'SUCCESS' ? parent.addClass('pmr-visible') : parent.hide();
            });
        },
        /** 
         * @param {Attraction} atrct
         * @returns {Object}
         */
        transform2Template: function(atrct) {
            return {
                'attractionItemSequence': atrct.getId(),
                'attractionItemName': atrct.getTitle(),
                'attractionItemDetail': atrct.getDescription(),
                'attractionItemImage': atrct.getBody()
            };
        }
    });



    return AttractionController;
});