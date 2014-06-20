/**
 * @author jittagorn pitakmetagoon
 * create 26/01/2014
 */
define('com.pamarin.web.listener.ImageLazyLoadListener', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.listener.ContextListener',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.ui.loader.ImageLoader',
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Router'
], function(module, Class, ContextListener, LoggerFactory, ImageLoader, $, Router) {

    /**
     * @class ImageLazyLoadListener
     */
    var ImageLazyLoadListener = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);
        var $window = $(window);
        var timeout = null;

        function seeIt(offset) {
            return offset.top - $window.scrollTop() < ($window.height() + 300);
        }

        function lazyLoadPhoto() {
            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(function() {
                clearTimeout(timeout);
                var $photos = $('.pmr-lazyload-photo');
                $photos.each(function() {
                    var $photo = $(this);
                    var offset = $photo.offset();

                    if (seeIt(offset)) {
                        $photo.removeClass('.pmr-lazyload-photo');
                        ImageLoader.load($photo);
                    }
                });
            }, 100);
        }

        return {
            /**/
            start: function(webContextEvent) {
                $window.on('scroll', lazyLoadPhoto)
                        .on('resize', lazyLoadPhoto);
                
                //Router.onRoute(lazyLoadPhoto);
            },
            /**/
            destroy: function(webContextEvent) {

            }
        };
    })()).implements(ContextListener);



    return ImageLazyLoadListener;
});
