# Frequently Asked Questions

 - [When I Try to Compile Angular with AoT I Get an Error](#when-i-try-to-compile-angular-with-aot-i-get-an-error)

### When I Try to Compile Angular with AoT I Get an Error

```
ERROR in Error encountered resolving symbol values statically. Calling function 'createMetaReducer', function calls are not supported. Consider replacing the function or lambda with a reference to an exported function, resolving symbol analyticsMetaReducer in ...
```

The solution is to wrap the exported meta reducer in another meta reducer that is defined as a function declaration.

```typescript
const targetMetaReducer = createMetaReducer(eventsMap, MyTarget());

export function analyticsMetaReducer(reducer) {
  return targetMetaReducer(reducer);
}
```

#### Relevant Discussions
 - [#127](https://github.com/rangle/redux-beacon/issues/127)
 - [rangle/redux-gtm#39](https://github.com/rangle/redux-gtm/issues/39)
