/**
 * @author jittagorn pitakmetagoon
 * create 23/10/2013
 */
define('com.pamarin.core.util.StringBuilder', [
    //
], function() {

    /**
     * define StringBuilder
     * for join string on memory
     * faster usage '+' for cancatinate string
     */
    var StringBuilder = function() {
        var string_ = [];

        this.append = function(string) {
            if (string) {
                string_.push(string + '');
            }

            return this;
        };

        /**
         * join string on memory
         * @returns string
         */
        this.toString = function() {
            return string_.join('');
        };

        /**
         * clear string
         */
        this.clear = function() {
            string_ = [];
        };
    };

    return StringBuilder;
});