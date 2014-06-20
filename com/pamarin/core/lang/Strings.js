/**
 * @author jittagorn pitakmetagoon
 * create 24/03/2014 
 */
define('com.pamarin.core.lang.Strings', [
    //
], function() {

    /**
     * @class Strings
     */
    var Strings = function() {

    };

    Strings.isEmpty = function(string) {
        return  typeof string === 'undefined' || string.length === 0;
    };

    Strings.toUpperCaseFirstCharacter = function(string) {
        if (this.isEmpty(string)) {
            return '';
        }

        if (string.length === 1) {
            return string[0].toUpperCase();
        }

        return string[0].toUpperCase() + string.substring(1);
    };



    return Strings;
});