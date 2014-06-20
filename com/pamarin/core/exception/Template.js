/**
 * @author jittagorn pitakmetagoon
 * create 08/03/2014
 */
define('com.pamarin.core.exception.Template', [
    'com.pamarin.core.lang.NativeTypes'
], function(Types) {

    /**
     * @class Template
     */
    var Template = {
        //
        replace: function(messageFormat, parameters) {
            if (Types.isUndefined(messageFormat) || !Types.isArray(parameters) || parameters.length === 0) {
                return messageFormat;
            }

            var count = 0;
            return messageFormat.replace(/\{\}/g, function(match) {
                var param = parameters[count++];
                if (Types.isUndefined(param)) {
                    return match;
                }

                return param;
            });
        }
    };



    return Template;
});