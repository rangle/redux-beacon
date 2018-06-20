# Amplitude

* [Setup](#setup)
* [Usage](#usage)
* [Event Definitions](#event-definitions)

----

### Setup

1. Sign up for Amplitude at http://amplitude.com and make a note of your API key.

2. Install [amplitude-js](https://www.npmjs.com/package/amplitude-js): `npm install --save amplitude-js`.

3. Install the target:

    ```bash
    npm install --save @redux-beacon/amplitude
    ```

### Usage

```js
import amplitude from 'amplitude-js';
import Amplitude from '@redux-beacon/amplitude';

// Create or import an events map.
// See "getting started" pages for instructions.

// initialise amplitude
amplitude.getInstance().init('YOUR_API_KEY');

const target = Amplitude({ instance: amplitude.getInstance() });

const amplitudeMiddleware = createMiddleware(eventsMap, target);
const amplitudeMetaReducer = createMetaReducer(eventsMap, target);
```

### Event Definitions

* [`event`](#event)
* [`userId`](#userid)
* [`logout`](#logout)
* [`userProperties`](#userproperties)

Don't see your event listed? Please submit a pull request to
the [Redux Beacon repository](https://github.com/rangle/redux-beacon) with the
missing event. Use the source of the existing `event-helpers` to guide your
work. If you need any support feel free to make the pull request with all you're
able to do. We can fill in the gaps from there.

#### event
##### Docs:
* https://amplitude.zendesk.com/hc/en-us/articles/115001361248#tracking-events
* https://amplitude.zendesk.com/hc/en-us/articles/115001361248#setting-event-properties

```js
import { logEvent } from '@redux-beacon/amplitude';

const event = logEvent((action, prevState, nextState) => {
  return {
    type: /* fill me in */,
    properties: /* (optional) */,
  };
});
```



#### userId
##### Docs:
https://amplitude.zendesk.com/hc/en-us/articles/115001361248#setting-custom-user-ids

```js
import { setUserId } from '@redux-beacon/amplitude';

const event = setUserId((action, prevState, nextState) => {
  return /* (user Id) fill me in */
});
```



#### logout
##### Docs:
https://amplitude.zendesk.com/hc/en-us/articles/115001361248#logging-out-and-anonymous-users

```js
import { logout } from '@redux-beacon/amplitude';

const event = logout();
```



#### userProperties
##### Docs:
https://amplitude.zendesk.com/hc/en-us/articles/115001361248#setting-multiple-user-properties

```js
import { setUserProperties } from '@redux-beacon/amplitude';

const event = setUserProperties((action, prevState, nextState) => {
  return {
   [/* property key */]: /* property value */,
  };
});
```
