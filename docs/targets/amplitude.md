# Amplitude

### Usage Instructions

1. Sign up for Amplitude at http://amplitude.com if you haven't
   already, and make a note of your API key.

2. Paste the following snippet near the top of your app's `<head>`
   tag, and replace `API_KEY_HERE` with your API key.

    ```js
    <script type="text/javascript">
      (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script");r.type="text/javascript";
      r.async=true;r.src="https://d24n15hnbwhuhn.cloudfront.net/libs/amplitude-3.4.0-min.gz.js";
      r.onload=function(){e.amplitude.runQueuedFunctions()};var i=t.getElementsByTagName("script")[0];
      i.parentNode.insertBefore(r,i);function s(e,t){e.prototype[t]=function(){this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));
      return this}}var o=function(){this._q=[];return this};var a=["add","append","clearAll","prepend","set","setOnce","unset"];
      for(var u=0;u<a.length;u++){s(o,a[u])}n.Identify=o;var c=function(){this._q=[];return this;
      };var p=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"];
      for(var l=0;l<p.length;l++){s(c,p[l])}n.Revenue=c;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","logEventWithTimestamp","logEventWithGroups"];
      function v(e){function t(t){e[t]=function(){e._q.push([t].concat(Array.prototype.slice.call(arguments,0)));
      }}for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){e=(!e||e.length===0?"$default_instance":e).toLowerCase();
      if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]};e.amplitude=n;
      })(window,document);

      amplitude.getInstance().init("API_KEY_HERE");
    </script>
    ```

3. Import the target, then provide it when creating middleware or a meta reducer:

   ```js
   import { Amplitude } from 'redux-beacon/targets/amplitude';

   const middleware = createMiddleware(eventsMap, Amplitude());
   const metaReducer = createMetaReducer(eventsMap, Amplitude());
   ```

### For Typescript Users

This target also exposes interfaces for common events:

```js
import {
  SetUserId,
  SetUserProperties,
  ClearUserProperties,
  LogEvent,
  SetGroup,
  RegenerateDeviceId,
  SetOptOut,
  SetVersionName,
  Identify,
  LogRevenueV2,
} from 'redux-beacon/targets/amplitude';
```

To use them, just specify the event type in your event definition:

```js
const pageView = (action): LogEvent => ({
  hitType: 'logEvent',
  eventType: 'pageview',
  eventProperties: { page: action.payload },
});
```
