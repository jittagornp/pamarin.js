/**
 * @author jittagorn pitakmegaoon
 * create 07/06/2014
 */
define('com.pamarin.core.annotation.$$Scoped', [
    'module',
    'com.pamarin.core.exception.IllegalArgumentException'
], function(module, IllegalArgumentException) {

    /**
     * @annotation $$Scoped
     */
    var $$Scoped = (function() {

        var name__ = {
            singleton: 'singleton', //create 1 times (single instance)
            prototype: 'prototype' //create new all times
        };

        /**
         * @constructor
         * @param {String} name
         */
        var Annotation = function(name) {
            if (name && !name__.hasOwnProperty(name)) {
                throw new IllegalArgumentException('name as [singleton, prototype] only.');
            }

            return {
                /**/
                source: module.id,
                /**/
                value: {
                    name: name || 'prototype'
                },
                /**
                 * @param {$$} obj
                 * @returns {Boolean}
                 */
                isPresent: function(obj) {
                    if (!obj) {
                        return false;
                    }

                    return this.source === obj.source;
                }
            };
        };

        Annotation.source = module.id;
        Annotation.value = Annotation.value || {};
        Annotation.value.name = name__;

        return Annotation;
    })();



    return $$Scoped;
});