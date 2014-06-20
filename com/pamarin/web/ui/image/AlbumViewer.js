/**
 * @module  ui.image.AlbumViewer
 * @author  jittagorn pitakmetagoon
 * @create  02/06/2013
 * 
 * @update  02/06/2013 (jittagorn pitakmetagoon)
 * @update  02/06/2013 (jittagorn pitakmetagoon : add to AMD)
 */
define([
    'com.jquery.core.JQuery', 
    'com.pamarin.ui.loader.ImageLoader'
], function($, ImageLoader) {

    var AlbumViewer = function(selector, data) {
        var space = $(selector);
        var album = $('<ul>').addClass('pmr-image-album');

        function createImage_(imageIndex, imageSize) {
            return $('<img>').attr('data-source', dataItem.images[imageIndex] + '&size=' + imageSize);
        }

        function createOneImage_(itemInner) {
            itemInner.append(createImage_(0, 180));
        }

        function createTwoImage_(itemInner) {
            var itemLeft = $('<div>').addClass('pmr-left');
            itemLeft.append(createImage_(0, 180));

            var itemRight = $('<div>').addClass('pmr-right');
            itemRight.append(createImage_(1, 180));

            var clear = $('<div>').addClass('pmr-clear');
            itemInner.append(itemLeft);
            itemInner.append(itemRight);
            itemInner.append(clear);
        }

        function createThreeImage_(itemInner) {
            var itemLeft = $('<div>').addClass('pmr-left');
            itemLeft.append(createImage_(0, 180));

            var itemRightTop = $('<div>').append(createImage_(1, 90));
            var itemRightBottom = $('<div>').append(createImage_(2, 90));

            var itemRight = $('<div>').addClass('pmr-right');
            itemRight.append(itemRightTop);
            itemRight.append(itemRightBottom);

            var clear = $('<div>').addClass('pmr-clear');
            itemInner.append(itemLeft);
            itemInner.append(itemRight);
            itemInner.append(clear);
        }

        function createFourImage_(itemInner) {
            var itemLeft = $('<div>').addClass('pmr-left');
            var itemLeftTop = $('<div>').append(createImage_(0, 90));
            var itemLeftBottom = $('<div>').append(createImage_(1, 90));

            itemLeft.append(itemLeftTop);
            itemLeft.append(itemLeftBottom);

            var itemRight = $('<div>').addClass('pmr-right');
            var itemRightTop = $('<div>').append(createImage_(2, 90));
            var itemRightBottom = $('<div>').append(createImage_(3, 90));

            itemRight.append(itemRightTop);
            itemRight.append(itemRightBottom);

            var clear = $('<div>').addClass('pmr-clear');
            itemInner.append(itemLeft);
            itemInner.append(itemRight);
            itemInner.append(clear);
        }

        function createInformation_(dataItem) {
            var unit = (dataItem.total > 1) ? 'photos' : 'photo';
            unit = ' ' + unit;
            
            var information = $('<div>').addClass('pmr-image-album-information');
            var name = $('<div>').addClass('pmr-image-album-name').html(dataItem.albumName || 'Unknown');
            var createDate = $('<div>').addClass('pmr-image-album-create').html('create date : ' + (dataItem.createDate || ''));
            var total = $('<div>').addClass('pmr-image-album-total').html((dataItem.total || '0') + unit);

            information.append(name);
            information.append(createDate);
            information.append(total);

            return information;
        }

        for (var index = 0; index < data.length; index++) {
            var dataItem = data[index];
            var imageLength = dataItem.images.length;

            var item = $('<div>').addClass('pmr-image-album-wrapper');
            var itemInner = $('<a>').addClass('pmr-image-album-wrapper-content');
            itemInner.addClass('break-link');
            itemInner.attr('href', dataItem.link || '#');

            item.append(itemInner);
            item.append(createInformation_(dataItem));

            var listItem = $('<li>').addClass('pmr-image-album-item');
            listItem.attr('data-sequence', index);
            listItem.append(item);

            switch (imageLength) {
                case 1 :
                    createOneImage_(itemInner);
                    break;
                case 2 :
                    createTwoImage_(itemInner);
                    break;
                case 3 :
                    createThreeImage_(itemInner);
                    break;
                default :
                    createFourImage_(itemInner);
            }

            album.append(listItem);
        }

        var clear = $('<div>').addClass('pmr-clear');
        space.append(album);
        space.append(clear);

        ImageLoader.load(selector + ' ul.pmr-image-album li img');
    };

    return AlbumViewer;
});