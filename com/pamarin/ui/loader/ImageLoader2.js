/** 
 * @author  jittagorn pitakmetagoon 
 * create  24/05/2013
 */
define('com.pamarin.ui.loader.ImageLoader', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Types'
], function(module, Class, $, Types) {

    /**
     * @class ImageLoader
     */
    var ImageLoader = Class.define(module.id, (function() {

        function percentScale(image) {
            var percent = {
                width: image.new.width / image.old.width,
                height: image.new.height / image.old.height
            };

            if (image.new.height === 0) {
                image.new.height = percent.width * image.old.height;
            }

            if (image.new.width === 0) {
                image.new.width = percent.height * image.old.width;
            }
        }

        function spaceScale(image) {
            var space = {
                width: image.parent.width - image.old.width,
                height: image.parent.height - image.old.height
            };

            if (space.width > 0) {
                image.new.height = 0;
                image.new.width = image.parent.width;
            }

            if (space.height > 0) {
                image.new.width = 0;
                image.new.height = image.parent.height;
            }
        }

        function computeScale(image) {
            //1. to standard (ratio) scale
            percentScale(image);

            //2. compute new scale 
            image.old.width = image.new.width;
            image.old.height = image.new.height;

            spaceScale(image);
            percentScale(image);
        }

        function setScale(image) {
            image.$parent.css('overflow', 'hidden');
            image.$image.attr('width', parseInt(image.new.width));
            image.$image.attr('height', parseInt(image.new.height));
            image.$image.css({
                'margin-top': toCenter(image.new.height - image.parent.height) + 'px',
                'margin-left': toCenter(image.new.width - image.parent.width) + 'px'
            });
        }

        function toCenter(val) {
            return parseInt(-1 * val / 2);
        }

        return {
            /**/
            static: {
                /**/
                load: function($element) {
                    if (Types.isString($element)) {
                        $element = $($element);
                    }

                    $element.each(function() {
                        var $image = $(this);
                        var $parent = $image.parent().addClass('pmr-image-wrapper');
                        var source = $image.attr('data-source');

                        var image = new Image();
                        image.src = source;
                        image.onload = function() {
                            $image.attr('src', source);
                            $image.css({
                                'visibility': 'visible'
                            });

                            var imgObj = {
                                $image: $image,
                                $parent: $parent,
                                old: {
                                    width: image.width,
                                    height: image.height
                                },
                                new : {
                                    width: $parent.width(),
                                    height: 0
                                },
                                parent: {
                                    width: $parent.width(),
                                    height: $parent.height()
                                }
                            };

                            computeScale(imgObj);
                            setScale(imgObj);
                        };
                    });
                }
            }
        };
    })());


    return ImageLoader;
});