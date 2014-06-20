/** 
 * for load image (lazy load) from  web server then compute new image size and automatic reposition
 * @author  jittagorn pitakmetagoon 
 * create  18/05/2013
 * 
 * update  07/06/2013 (jittagorn pitakmetagoon : add to AMD)
 * update  07/06/2013 (jittagorn pitakmetagoon : add Filter)
 */
define('com.pamarin.ui.loader.ImageLoader', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.jquery.core.JQuery',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.filter.Filter',
    'com.pamarin.core.enum.Status',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.util.Types'
], function(module, Class, Array, $, LoggerFactory, Filter, Status, ArrayList, Types) {


    var ImageLoader = (function() {

        var ItemLoader = function($image, source, callbacks) {
            var $parent = $image.parent().addClass('pmr-image-wrapper');
            var imageObj = new Image();
            imageObj.src = source;

            imageObj.onload = function() {
                $image.attr('src', source);

                var oldWidth = imageObj.width;
                var oldHeight = imageObj.height;

                var newWidth = $parent.width();
                var newHeight = $parent.height();

                //set standard scale ===========================================
                newHeight = 0;

                var percentWidth = newWidth / oldWidth;
                var percentHeight = newHeight / oldHeight;

                if (newHeight === 0) {
                    newHeight = percentWidth * oldHeight;
                }

                if (newWidth === 0) {
                    newWidth = percentHeight * oldWidth;
                }
                //set standard scale ===========================================


                //compute new scale ============================================
                oldWidth = newWidth;
                oldHeight = newHeight;

                var parentWidth = $parent.width();
                var parentHeight = $parent.height();

                var widthSpace = parentWidth - oldWidth;
                var heightSpace = parentHeight - oldHeight;

                if (widthSpace > 0) {
                    newHeight = 0;
                    newWidth = parentWidth;
                }

                if (heightSpace > 0) {
                    newWidth = 0;
                    newHeight = parentHeight;
                }

                percentWidth = newWidth / oldWidth;
                percentHeight = newHeight / oldHeight;

                if (newHeight === 0) {
                    newHeight = percentWidth * oldHeight;
                }

                if (newWidth === 0) {
                    newWidth = percentHeight * oldWidth;
                }
                //compute new scale ============================================


                newWidth = parseInt(newWidth);
                newHeight = parseInt(newHeight);

                var marginTop = parseInt((-1) * (newHeight - parentHeight) / 2);
                var marginLeft = parseInt((-1) * (newWidth - parentWidth) / 2);

                $image.attr('width', newWidth);
                $image.attr('height', newHeight);

                $image.css({
                    'visibility': 'visible',
                    'margin-top': marginTop + 'px',
                    'margin-left': marginLeft + 'px'
                });

                Array.forEachIndex(callbacks, function(callback) {
                    callback($image, Status.SUCCESS);
                });

                Filter.addFilter(module.id, 'afterRequest', {
                    url: source,
                    status: Status.SUCCESS,
                    image: $image
                });
            };

            imageObj.onerror = function() {
                Array.forEachIndex(callbacks, function(callback) {
                    callback($image, Status.FAIL);
                });

                Filter.addFilter(module.id, 'afterRequest', {
                    url: source,
                    status: Status.FAIL,
                    image: $image
                });
            };

            $image.removeAttr('data-source');
        };

        function load($element, callback) {
            var callbackList = [];
            if (callback) {
                callbackList.push(callback);
            }

            this.then = function(cback) {
                if (cback) {
                    callbackList.push(cback);
                }
            };

            if (Types.isString($element)) {
                $element = $($element);
            }

            $element.each(function() {
                var $image = $(this);

                Filter.addFilter(module.id, 'beforeRequest', {
                    url: $image.attr('data-source')
                });

                var dataSource = $image.attr('data-source');
                if (dataSource) {
                    new ItemLoader($image, dataSource, callbackList);
                }
            });
        }

        return {
            load: function($element, callback) {
                return new load($element, callback || function() {

                });
            }
        };
    })();


    return ImageLoader;
});