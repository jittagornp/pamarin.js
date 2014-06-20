/** 
 * @module  Fileuploader
 * @description for upload file to web server
 * @author  jittagorn pitakmetagoon 
 * @create  15/06/2013
 */
define('com.pamarin.ui.loader.Fileuploader', [
    'com.jquery.upload.JQueryFileupload', 
    'com.pamarin.core.config.Configs', 
    'com.pamarin.core.logging.LoggerFactory'
], function($, Configs, LoggerFactory) {
    var _FILE_UPLOAD_URL = Configs.HOST + Configs.PREFIX_SERVICE + '/fileUpload';

    var Fileuploader = function(options) {
        var formUpload_ = $('<form>').attr('action', _FILE_UPLOAD_URL)
                .attr('method', 'post')
                .attr('enctype', 'multipart/form-data');

        var fileuploadInput_ = $(options.fileInput)
                .attr('name', 'files[]')
                .attr('multiple', true)
                .wrap(formUpload_);

        var totalProgressInner_ = $('<div>').addClass('pmr-fileuploader-progress-all-inner');
        var totalProgress_ = $(options.totalProgress).addClass('pmr-fileuploader-progress-all');
        totalProgress_.append(totalProgressInner_);

        var itemList_ = $('<ul>').addClass('pmr-fileuploader-image');
        $(options.preview).append(itemList_);

        fileuploadInput_.fileupload({
            url: _FILE_UPLOAD_URL,
            sequentialUploads: true,
            maxChunkSize: 10000000, // 10 MB
            limitMultiFileUploads: 5,
            progressInterval: 1000,
            add: function(event, data) {
                var item = $('<li>').addClass('pmr-fileuploader-item');
                var info = $('<div>').addClass('pmr-fileuploader-info');
                var name = $('<div>').addClass('pmr-fileuploader-name').text(data.files[0].name);
                var progress = $('<div>').addClass('pmr-fileuploader-progress');
                var progressInner = $('<div>').addClass('pmr-fileuploader-progress-inner');
                progress.html(progressInner);
                info.append(name);

                item.append(progress);
                item.append(info);
                itemList_.prepend(item);

                item.hover(function() {
                    var info = $(this).find('.pmr-fileuploader-info');
                    info.stop().animate({
                        marginBottom: 0
                    }, 200);
                }, function() {
                    var info = $(this).find('.pmr-fileuploader-info');
                    info.stop().animate({
                        marginBottom: -50
                    }, 200);
                });

                data.context = item;
                data.submit();
            },
            progress: function(event, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                data.context.find('.pmr-fileuploader-progress-inner').css('width', progress + '%');
            },
            progressall: function(event, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                totalProgressInner_.css('width', progress + '%');
            },
            done: function(event, data) {
                var file = data.result[0];
                var image = $('<img>').attr('src', file.url + '&size=120').load(function() {
                    if (image.width() > image.height()) {
                        image.height(120).css({
                            'left': '50%',
                            'margin-left': (-1) * (image.width() / 2) + 'px'
                        });
                    } else {
                        image.width(120).css({
                            'top': '50%',
                            'margin-top': (-1) * (image.height() / 2) + 'px'
                        });
                    }

                    image.fadeIn('slow');
                }).addClass('pmr-fileuploader-image');

                var item = data.context;
                item.find('.pmr-fileuploader-progress').remove();
                item.append(image);
            }
        });
    };


    return Fileuploader;
});
