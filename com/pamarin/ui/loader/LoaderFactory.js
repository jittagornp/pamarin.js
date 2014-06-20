/**
 * @author jittagorn pitaketagoon
 * create 09/03/2014
 */
define('com.pamarin.ui.loader.LoaderFactory', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Assert',
    'com.pamarin.ui.loader.JigsawLoader',
    'com.pamarin.ui.loader.TemplateLoader'
], function(module, Class, Assert, JigsawLoader, TemplateLoader) {

    /**
     * @class LoaderFactory
     */
    var LoaderFactory = Class.define(module.id, {
        //
        static: {
            //
            getLoader: function(type) {
                Assert.assertString(type, module.id + '.getLoader(String type).');

                var loader;
                switch (type) {
                    case 'jigsaw' :
                        loader = new JigsawLoader();
                        break;

                    case 'template' :
                        loader = new TemplateLoader();
                        break;

                    default :
                        loader = null;
                }

                return loader;
            }
        }
    });


    return LoaderFactory;
});