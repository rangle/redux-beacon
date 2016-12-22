# Targets

Both [createMiddleware](../api/create-middleware.md) and
[createMetaReducer](../api/create-meta-reducer.md) **require** a
target as their second parameter. A target is simply a function that
Redux-Beacon calls with an array of generated analytics events. What a
target does with the array of generated events is up to the target's
author, although the assumption is that the target will send those
events to an external analytics service.

As an added convenience Redux-Beacon provides prebuilt targets for
some popular analytics services:

* [Google Analytics](google-analytics.md)
* [Google Tag Manager](gtm.md)
