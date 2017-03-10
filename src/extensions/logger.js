function getTimestamp(sinceEpoch) {
  const date = new Date(sinceEpoch);
  return date
    .toTimeString()
    .match(/^\d\d:\d\d:\d\d/g)
    .concat(date.getTime().toString().slice(-3))
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
function logEvents(events) {
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

function logAction(action) {
  console.log('%c Action:', styles.label, action);
}

function logger(events, action, state, isSavedOffline, wasSavedOffline) {
  const timestamp = getTimestamp(Date.now());
  const title = `Analytics events @ ${timestamp} ${action.type}`;

  if (events.length > 0) {
    if (isSavedOffline) {
      console.group(`%c ${title} (saved offline)`, styles.title.danger);
      logAction(action);
      logEvents(events);
      console.groupEnd();
    } else if (wasSavedOffline) {
      console.group(`%c ${title} (was offline)`, styles.title.warning);
      logEvents(events);
      console.groupEnd();
    } else {
      console.group(`%c ${title}`, styles.title.primary);
      logAction(action);
      logEvents(events);
      console.groupEnd();
    }
  }
}


module.exports = { logger, getTimestamp };
