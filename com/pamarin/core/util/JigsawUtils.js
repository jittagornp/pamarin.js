/**
 * @author jittagorn pitakmetagoon
 * create 21/09/2013
 */
define('com.pamarin.core.util.JigsawUtils', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types',
    'com.pamarin.ui.Progressbar'
], function(module, Class, Types, Progressbar) {

    /**
     * @class JigsawUtils
     */
    var JigsawUtils = Class.define(module.id, (function() {

        return {
            //
            constant : {
                LEVEL_NAME : 'data-level'
            },
            //
            static: {
                //
                setJigsawLevel: function($element) {
                    var levelData = 0;
                    if (Types.isUndefined($element)) {
                        return levelData;
                    }

                    var $current = $element;
                    var LEVEL_NAME = JigsawUtils.constant('LEVEL_NAME');
                    var level = $current.attr(LEVEL_NAME);
                    
                    if (Types.isUndefined(level)) {
                        do {
                            $current = $current.parent();
                            level = $current.attr(LEVEL_NAME);
                        } while ($current.length > 0 && Types.isUndefined(level));

                        if (!level) {
                            level = -1;
                        }

                        levelData = parseInt(level) + 1;
                        $element.attr(LEVEL_NAME, levelData);
                        if (levelData === 1) {
                            Progressbar.done();
                        }
                    }

                    return levelData;
                }
            }
        };
    })());


    
    return JigsawUtils;
});