/**
 * @author jittagorn pitakmetagoon
 * create 09/02/2014
 */
define('com.pamarin.core.structural.Virtual', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.NativeTypes',
    'com.pamarin.core.lang.Prototype'
], function(module, Class, JSTypes, Prototype) {

    /**
     * @class Virtual
     */
    var Virtual = Class.define(module.id, (function() {

        return {
            //
            static: {
                //    
                define: function(Clazz, prototypeClass) {

                    var Klass = {};

                    for (var property in Clazz.prototype) {
                        if (Clazz.prototype.hasOwnProperty(property)) {
                            if (JSTypes.isFunction(Clazz.prototype[property])) {
                                Klass[property] = function() {
                                    //Clazz.prototype[property].apply(this, arguments);
                                    //alert(0);
                                };
                            } //else {
//                                Klass[proper-+
//                                'm ty] = Clazz.prototype[property];
//                            }
                        }
                    }
//                    
//                    console.log(Klass);

                    return Class.define('Proxy', Klass);
                }
            }
        };
    })());



    return Virtual;
});