## Contributing

When contributing to Redux-Beacon, please first discuss the change you
wish to make via an issue, email, or any other means before writing
any code or making a pull request.

Not sure how to make a pull request? Watch the following free series on egghead.io:
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## Coding Conventions

This project follows the coding conventions laid out in the
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

## Architecture

The two functions `createMiddleware` and `createMetaReducer` make up
the apex of Redux-Beacon's API. As the function names imply, one
creates Redux middleware, and one creates an ngrx meta reducer.

If you're unfamiliar with Redux middleware, or ngrx meta reducers, you
can learn more about them here:
[Redux middleware](http://redux.js.org/docs/advanced/Middleware.html),
and here: [ngrx meta reducers](https://gist.github.com/btroncone/a6e4347326749f938510#implementing-a-meta-reducer)

The bulk of the work in `createMiddleware` and `createMetaReducer` is
done by two functions: `createEvents` and `registerEvents`.

The function `createEvents` is in charge of creating events from an
`EventDefinition`. If you want to change how Redux-Beacon creates
events this is where you should look to make your changes.

The function `registerEvents` takes the events created by
`createEvents` and sends them off to a target, offline storage, or a
logger. If you want to change the way Redux-Beacon handles targets, or
extensions, this is where you should look to make your changes.

I encourage you to read the unit tests for `createEvents` and
`registerEvents` to get a better idea of what each function does.

Finally, please read
the [official docs](https://rangle.github.io/redux-beacon) for
definitions and examples of `Extensions`, `Targets`, and
`EventDefinitions`.
