/**
 * @author jittagorn pitakmetagoon
 * create 07/02/2014
 */
define('com.pamarin.core.util.Period', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Assert'
], function(module, Class, Assert) {

    /**
     * @class Period
     */
    var Period = Class.define(module.id, {
        //
        variable: {
            start_: null,
            end_: null
        },
        /**
         * @param {Number} start - (require) start time of period
         * @param {Number} end - (require) end time of period
         */
        constructor: function(start, end) {
            Assert.assertNumber(start, end, module.id + '.constructor(Number start, Number end).');

            this.start_ = start;
            this.end_ = end;
        },
        //
        getStart: function() {
            return this.start_;
        },
        /**
         * for set start time of period
         * 
         * @param {Number} start
         */
        setStart: function(start) {
            this.start_ = start;
        },
        //
        getEnd: function() {
            return this.end_;
        },
        /**
         * for set end time of period
         * 
         * @param {Number} end
         */
        setEnd: function(end) {
            this.end_ = end;
        },
        /**
         * for compare object to object
         * 
         * @param {Period} period
         * 
         * @returns {Boolean} return true, if object is equals
         */
        equals: function(period) {
            if (!(period instanceof Period)) {
                return false;
            }

            if (period.getStart() === this.start_ && period.getEnd() === this.end_) {
                return true;
            }

            return false;
        },
        //
        toString: function() {
            return 'Period {' + this.start_ + ', ' + this.end_ + '}';
        }
    });



    return Period;
});