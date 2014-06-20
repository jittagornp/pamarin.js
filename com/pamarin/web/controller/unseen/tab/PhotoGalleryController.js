/**
 * @author jittagorn pitakmetaoon
 * create 19/05/2014
 */
define('com.pamarin.web.controller.unseen.tab.PhotoGalleryController', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.context.Configuration',
    'com.pamarin.web.controller.unseen.tab.TabScrollController'
], function(module, Class, LoggerFactory, Configuration, TabScrollController) {

    

    /**
     * @class Thumnail
     */
    var Thumnail = Class.define(module.id, {
        /**/
        variable: {
            photoGallery_: null,
            DEFAULT_PHOTO_: Configuration.staticPath + '/images/standby.png'
        },
        /**/
        constructor: function(photo) {
            this.photoGallery_ = photo;
        },
        /**/
        $converPhoto: function() {
            var $img = $('<img>').attr('src', this.DEFAULT_PHOTO_)
                    .addClass('pmr-lazyload-photo')
                    .attr('data-source', this.photoGallery_.getPhotoUrl());

            var $link = $('<a>').addClass('pmr-image-thumnail-wrapper')
                    .addClass('burn-link')
                    .attr('href', this.photoGallery_.getAccessUrl())
                    .append($img);

            return $link;
        }
    });

    /**
     * @class PhotoGalleryController
     * @controller
     */
    var PhotoGalleryController = Class.define(module.id, {
        /**/
        variable: {
            PHOTO_THUMNAIL_LIST_SELECTOR_: '#pmrUnseenImageThumnail > ul',
            PAGE_SIZE_: 20,
            SORT_BY_: 'uploadDate',
            $thumnailBox_: null,
            loadService_: 'photoGalleryService'
        },
        /**/
        onJigsawReady: function() {
            this.$thumnailBox_ = $(this.PHOTO_THUMNAIL_LIST_SELECTOR_);
            this.render();
        },
        /**
         * @param {PhotoGalleryService} service
         * @param {Number} pageable
         * @returns {Chain} 
         */
        load: function(service, pageable) {
            return service
                    .findPhotosByUnseenId(this.getUnseenId(), pageable)
                    .then(function(list) {
                        return !list.forEachEntry(function(photo) {
                            var thumnail = new Thumnail(photo);
                            this.$thumnailBox_.append(thumnail.$converPhoto());
                        }, this).isEmpty();
                    }, this);
        }
    }).extends(TabScrollController);



    return PhotoGalleryController;
});