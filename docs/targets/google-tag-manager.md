# Google Tag Manager

### Usage Instructions

1. Sign up for Google Tag Manager if you haven't already, and
   [create a new web container](https://support.google.com/tagmanager/answer/6103696?hl=en).

2. Add the
   [Google Tag Manager container snippet](https://developers.google.com/tag-manager/quickstart)
   to your site.

3. Import the target, then provide it when creating middleware or a meta reducer:

    ```js
    import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';

    const middleware = createMiddleware(eventsMap, GoogleTagManager);
    const metaReducer = createMetaReducer(eventsMap, GoogleTagManager);
    ```

> **Tip:**
> During development and testing it is often helpful to use Google Tag
> Manager's Container Preview mode. Follow the instructions
> [here](https://support.google.com/tagmanager/answer/6107056?hl=en)
> to enable it.

### Notes

* This target will push all generated event objects to the `window.dataLayer`.

* Only event objects with an `event` property will trigger a Custom
  Event in Google Tag Manager.

* If an event object doesn't have an `event` property, but
  has a `hitType` property, this target will create an `event`
  property and set it to the `hitType` string.

  > **Tip:** This gives you the option to use the event interfaces
  > exposed by the [Google Analytics target](./google-analytics.md) in
  > your event definitions.
