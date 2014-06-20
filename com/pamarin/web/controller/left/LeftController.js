/**
 * @author jittagorn pitakmetagoon
 * create 19/09/2013
 */
define('com.pamarin.web.controller.left.LeftController', [
    'module',
    'com.pamarin.core.config.Configs',
    'com.pamarin.ui.loader.JigsawLoader',
    'com.pamarin.ui.loader.LoaderFactory',
    'com.pamarin.ui.loader.ImageLoader',
    'com.pamarin.core.logging.LoggerFactory'
], function(module, Configs, JigsawLoader, LoaderFactory, ImageLoader, LoggerFactory) {

    var LOG = LoggerFactory.getLogger(module.id);
    var templateLoader = LoaderFactory.getLoader('template');

    require([
        'com.pamarin.web.controller.LeftLayoutController',
        'com.pamarin.web.controller.LeftResultLayoutController',
        'com.pamarin.web.controller.left.AutoCompleteController'
    ]);

    JigsawLoader.load('#pmrLeftSearchContent', '/leftSearch');

    templateLoader.load('/resultSearchItem').then(function(template) {
        for (var i = 0; i < 15; i++) {
            var data = {
                'resultSearchSequence': (i + 1),
                'resultSearchName': 'unseen name ' + (i + 1),
                'resultSearchLink': Configs.HOST + '/@unseen' + (i + 1),
                'resultSearchContent': 'conbtent xxxx yyy zzz',
                'resultSearchImage': Configs.HOST + '/service/photo/?name=unseens/pookradueng/p' + (i + 1) + '.png&size=120'
            };

            template.replaceData(data)
                    .appendTo('#pmrLeftResultSearchContent');
        }

        ImageLoader.load('.pmr-resultSearch-item-image').then(function(image, status) {
            //console.log(image + ' : ' + status);
        });

        ImageLoader.load('.pmr-resultSearch-item-tourist-image-wrapper img').then(function(image, status) {
            //console.log(image + ' : ' + status);
        });
    });


});