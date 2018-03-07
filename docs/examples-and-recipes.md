# Examples & Recipes

1. [How to Track Pageviews in a React-Redux app](#how-to-track-pageviews-in-a-react-redux-app)
2. [How to Track Pageviews in a Angular-ngrx app](#how-to-track-pageviews-in-a-angular-ngrx-app)
3. [How to Track Pageviews in a Angular-Redux app](#how-to-track-pageviews-in-a-angular-redux-app)
4. [How to Emit Multiple Analytics Events per Redux Action](../utils/combine-events.md)
5. [How to Debounce Analytics Events](../utils/debounce-event.md)
6. [How to Validate Analytics Events](../utils/ensure.md)
7. [How to Send Analytics to Multiple Targets](#how-to-send-analytics-to-multiple-targets.md)
8. [How to Create Your Own Target](#how-to-create-your-own-target.md)

----

## How to Track Pageviews in a React-Redux app

## How to Track Pageviews in a Angular-ngrx app

## How to Track Pageviews in a Angular-Redux app

## How to Send Analytics to Multiple Targets

## How to Create Your Own Target

Both createMiddleware and createMetaReducer require a target as their second
parameter. A target is simply a function that Redux Beacon calls with an array
of generated analytics events. What a target does with the array of generated
events is up to the target's author, although the assumption is that the target
will send those events to an external analytics service.
