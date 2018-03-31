# Google Tag Manager

* [Setup](#setup)
* [Usage](#usage)
* [Event Definitions](#event-definitions)

----

### Setup
1. Sign up for Google Tag Manager and
   [create a new web container](https://support.google.com/tagmanager/answer/6103696?hl=en).

2. Add the
   [Google Tag Manager container snippet](https://developers.google.com/tag-manager/quickstart)
   to your site.

    {% hint style='info' %}
    > during development and testing it is often helpful to use Google Tag
    > Manager's Container Preview mode. Follow the instructions
    > [here](https://support.google.com/tagmanager/answer/6107056?hl=en) to
    > enable it.

3. Install the target:

    ```bash
    npm install --save @redux-beacon/google-tag-manager
    ```

### Usage

```js
import GoogleTagManager from '@redux-beacon/google-tag-manager';

// Create or import an events map.
// See "getting started" pages for instructions.

const gtm = GoogleTagManager();

const gtmMiddleware = createMiddleware(eventsMap, gtm);
const gtmMetaReducer = createMetaReducer(eventsMap, gtm);
```

You may also provide an options object when creating the target:

```js
const options = {
  dataLayerName: /* (optional) string */,
};

const gtmWithOptions = GoogleTagManager(options);
```

### Event Definitions

```js
const event = (action, prevState, nextState) => {
  return {
    event: /* fill me in */,
    /* add any additional key/value pairs below */,
  };
};
```

#### Notes

* This target will push all generated event objects to the `window.dataLayer` by
  default.  As detailed in the
  [GTM docs](https://developers.google.com/tag-manager/devguide#renaming).

* Only event objects with an `event` property will trigger a Custom
  Event in Google Tag Manager.

* If an event object doesn't have an `event` property, but
  has a `hitType` property, this target will create an `event`
  property and set it to the `hitType` string. For example:

  ```js
  // Given the following event definition
  const pageview = action => ({
    hitType: 'pageview',
    page: action.payload,
  });

  // Say the action is equal to
  // { type: LOCATION_CHANGE, payload: '/home' }
  // The following object will get pushed to the dataLayer
  const dataLayerEvent = {
    hitType: 'pageview',
    event: 'pageview', // this is done automatically
    page: '/home',
  };
  ```

{% hint style='info' %}
This gives you the option to use the event definitions
exposed by the [Google Analytics target](./google-analytics.md#event-definitions)
{% endhint %}
