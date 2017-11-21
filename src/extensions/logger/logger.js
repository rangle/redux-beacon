import repeat from 'repeat-string';

function getTimestamp(sinceEpoch) {
  const date = new Date(sinceEpoch);
  return date
    .toTimeString()
    .match(/^\d\d:\d\d:\d\d/g)
    .concat(
      date
        .getTime()
        .toString()
        .slice(-3)
    )
    .join('.');
}

const styles = {
  title: {
    primary: 'color: #1da1f2; font-weight: bold;',
    danger: 'color: #D63230; font-weight: bold;',
    warning: 'color: #F39237; font-weight: bold;',
  },
  label: 'color: #93748A; font-weight: bold;',
};

/* eslint-disable no-console */
function logger(events, action, state, isSavedOffline, wasSavedOffline) {
  const timestamp = getTimestamp(Date.now());
  const title = `Analytics events @ ${timestamp} ${action ? action.type : ''}`;

  const groups = [];
  const hr = repeat('-', 80);

  if (!console.group) {
    console.group = function logGroupStart(label) {
      groups.push(label);
      console.log('%c \nBEGIN GROUP: %c', hr, label);
    };
  }
  if (!console.groupEnd) {
    console.groupEnd = function logGroupEnd() {
      console.log('END GROUP: %c\n%c', groups.pop(), hr);
    };
  }

  function logEvents() {
    if (events.length > 1) {
      console.group('%c Events:', styles.label);
      events.forEach((event, index) => {
        console.log(`%c (${index + 1})`, styles.label, event);
      });
      console.groupEnd('Events');
    } else if (events.length === 1) {
      console.log('%c Event:', styles.label, events[0]);
    }
  }

  function logAction() {
    console.log('%c Action:', styles.label, action);
  }

  if (events.length > 0) {
    if (isSavedOffline) {
      console.group(`%c ${title} (saved offline)`, styles.title.danger);
      logAction();
      logEvents();
      console.groupEnd();
    } else if (wasSavedOffline) {
      console.group(`%c ${title} (was offline)`, styles.title.warning);
      logEvents();
      console.groupEnd();
    } else {
      console.group(`%c ${title}`, styles.title.primary);
      logAction();
      logEvents();
      console.groupEnd();
    }
  }
}

export { logger, getTimestamp };
