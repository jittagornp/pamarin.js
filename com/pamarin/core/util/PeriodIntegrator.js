/**
 * @author jittagorn pitakmetagoon
 * create 07/02/2014
 */
define('com.pamarin.core.util.PeriodIntegrator', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Period',
    'com.pamarin.core.util.collection.HashSet',
    'com.pamarin.core.exception.IllegalArgumentException',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.util.collection.Collections'
], function(module, Class, Period, HashSet, IllegalArgumentException, ArrayList, Collections) {

    /**
     * @class PeriodIntegrator
     * code from : http://na5cent.blogspot.com/2013/12/integrate-period-algorithm-java.html
     */
    var PeriodIntegrator = Class.define(module.id, (function() {

        function sortPeriods() {
            this.periodList_ = new ArrayList(this.periodSet_);
            this.periodSet_ = null;

            Collections.sort(this.periodList_, {
                //
                compare: function(period1, period2) {
                    if (period1.getStart() === period2.getStart()) {
                        return period1.getEnd() - period2.getEnd();
                    }

                    return period1.getStart() - period2.getStart();
                }
            });
        }

        function changeOverlap() {
            if (this.periodList_.size() > 1) {
                for (var i = 1; i < this.periodList_.size(); i++) {
                    var before = this.periodList_.get(i - 1);
                    var current = this.periodList_.get(i);

                    if (current.getStart() < before.getEnd()) {
                        current.setStart(before.getEnd());
                    }
                }
            }
        }

        function removeIncorrect() {
            if (this.periodList_.size() > 1) {
                for (var i = 1; i < this.periodList_.size(); i++) {
                    var periodI = this.periodList_.get(i);
                    for (var j = i + 1; j < this.periodList_.size(); j++) {
                        var periodJ = this.periodList_.get(j);
                        if (isIncorrect(periodJ) || isSubPeriod(periodJ, periodI)) {
                            this.periodList_.remove(periodJ);
                        }
                    }
                }
            }
        }

        function isIncorrect(period) {
            return period.getStart() >= period.getEnd();
        }

        function isSubPeriod(period1, period2) {
            return period1.getStart() >= period2.getStart() && period1.getEnd() <= period2.getEnd();
        }

        function integratePeriods() {
            if (this.periodList_.size() > 1) {
                for (var i = 1; i < this.periodList_.size(); i++) {
                    var before = this.periodList_.get(i - 1);
                    var current = this.periodList_.get(i);

                    if (current.getStart() === before.getEnd()) {
                        current.setStart(before.getStart());
                        this.periodList_.remove(before);
                        i--;
                    }
                }
            }
        }

        return {
            //
            variable: {
                periodSet_: new HashSet(),
                periodList_: null
            },
            /**
             * add period into PeriodIntegrator instance
             * 
             * @param {Period} period
             * 
             * @throws {IllegalArgumentException} - invalid input type parameters
             * @returns {PeriodIntegrator}
             */
            addPeriod: function(period) {
                if (!(period instanceof Period)) {
                    throw new IllegalArgumentException('Invalid input type parameter, ' + module.id + '.addPeriod(Period period).');
                }

                this.periodSet_.add(period);
                return this;
            },
            /**
             * add all periods into PeriodIntegrator instance
             * 
             * @param {Collection<Period>} periodCollection
             * @returns {PeriodIntegrator}
             */
            addAllPeriods: function(periodCollection) {
                this.periodSet_.addAll(periodCollection);
                return this;
            },
            /**
             * start integrator
             */
            integrate: function() {
                sortPeriods.call(this);
                changeOverlap.call(this);
                removeIncorrect.call(this);
                integratePeriods.call(this);
            }
        };
    })());



    return PeriodIntegrator;
});