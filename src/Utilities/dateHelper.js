
const moment = require('moment');
const _      = require('lodash');

// create function to return moment.calendar without time
const calendarDate = (function() {
  const baseCal = moment.langData()._calendar;
  const calWithTime = {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'ddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] ddd [at] LT',
    sameElse: 'L LT'
  };
  const calWithoutTime = {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'L'
  };

  return function(momentDate, withoutTime) {
    if (withoutTime) {
      moment.lang('en', { calendar: calWithoutTime });
    } else {
      moment.lang('en', { calendar: calWithTime });
    }

    const calDate = momentDate.calendar();

    moment.lang('en', { calendar: baseCal });

    return calDate;
  };
})();

const dateHelper = {
  calendarDate: calendarDate,
  dateValueOrDefault: function(date) {
    return (
      date && (
        date === '1900-01-01T00:00:00' ||
        date === '0001-01-01T00:00:00' ||
        date === '/Date(-62135578800000)/' ||
        date === '/Date(-2208970800000)/'
      )
    ) ? null : date;
  },

  distance: function(date, fromDate) {
    let theDate = dateHelper.dateValueOrDefault(date);
    if (!theDate) {
      return 'Never';
    }
    if (!fromDate) {
      return moment(theDate).fromNow();
    }
    return moment(theDate).from(fromDate);
  },

  pastDistance: function(date) {
    let theDate = dateHelper.dateValueOrDefault(date);
    if (!theDate) {
      return null;
    }
    theDate = moment(theDate);
    const today = moment(new Date());
    if (today.diff(theDate) < 0) {
      return 'moments ago';
    }
    return theDate.fromNow();
  },

  customDistance: function(date, fromDate) {
    let theDate = dateHelper.dateValueOrDefault(date);
    if (!theDate) {
      return 'Never';
    }

    let theFromDate = null;
    if (!theFromDate) {
      theFromDate = new Date();
    }

    let isPastDate = false;

    const rightNow = moment(fromDate);
    const comparisonDate = moment(theDate);
    let dateDiff = rightNow.diff(comparisonDate, 'minutes');
    if (dateDiff < 0) {
      isPastDate = true;
    }
    dateDiff = Math.abs(dateDiff);
    let useHalf = false;
    let dateDiffShort = 'min';

    if (dateDiff > 59) {
      dateDiff = Math.floor(dateDiff / 60);
      dateDiffShort = 'hr';

      if (dateDiff > 23) {
        dateDiff = Math.floor(dateDiff / 24);
        dateDiffShort = 'day';

        if (dateDiff > 29) {
          dateDiff = Math.floor(dateDiff / 30);
          dateDiffShort = 'mo';

          if (dateDiff > 11) {
            const dateDiffHalf = dateDiff % 12;

            dateDiff = Math.floor(dateDiff / 12);
            dateDiffShort = 'yr';

            if (dateDiffHalf > 5) {
              useHalf = true;
              // Add unicode 1/2 to year
              dateDiff = '' + dateDiff + '\u00BD';
            }

          }
        } else if (dateDiff > 13) {
          dateDiff = Math.floor(dateDiff / 7);
          dateDiffShort = 'wk';
        }
      }
    }

    // Datediff will be a string is useHalf is true
    // Which will short circuit the integer check
    // Otherwise it is an integer we can verify
    if (useHalf || dateDiff > 1) {
      dateDiffShort += 's';
    }

    dateDiff = isPastDate ?
    ['in', dateDiff, dateDiffShort].join(' ') :
    [dateDiff, dateDiffShort, 'ago'].join(' ');

    return dateDiff;
  },

  prettyDateDistance: function(date) {
    const dateValue = dateHelper.distance(date);

    const dateValues = dateValue.split(' ');
    if (dateValues.length > 1) {
      // The first will be the 'number'
      // The rest will be the 'days ago'
      return {
        value: _.first(dateValues),
        text: _.rest(dateValues).join(' '),
        hasValue: true
      };
    }
    // DateValue is 'Never'
    return {
      value: null,
      text: dateValue,
      hasValue: false
    };
  }
};

module.exports = dateHelper;
