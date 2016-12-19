# Extensions

Both [createMiddleware](../api/create-middleware.md) and
[createMetaReducer](../api/create-meta-reducer.md) accept an
**optional** extensions object as their third parameter. If provided,
an extensions object should have at least one of the following
properties:

```js
{
  logger,
  offlineStorage,
}
```

Each property corresponds to a different type of extension that
Redux-Beacon supports:
 - [`offlineStorage` extensions](#offlinestorage-extensions)
 - [`logger` extensions](#logger-extensions)

As an added convenience Redux-Beacon exposes some prebuilt extension constructors:

| Extension Type | Extension Constructor|
| -------------- | -------------- |
| `logger`       | [logger](logger.md)       |
| `offlineStorage` | [offlineWeb](offline-web.md) |
| `offlineStorage` | [offlineReactNative](offline-react-native.md) |

----

#### logger extensions
`logger` extensions provide a means to log events after they are created.

#### offlineStorage extensions
`offlineStorage` extensions provide a means to record analytics events
even when your app is offline. An `offlineStorage` extension should
have three methods: `saveEvents`, `purgeEvents`, and
`isConnected`.
