# Redux Beacon & @ngrx/store Runnable Example

## Step 1

Paste the following script into a terminal of your choice and run it:

```sh
(
   git clone https://github.com/ngrx/platform.git

   cd platform

   git checkout tags/v5.0.0

   curl https://raw.githubusercontent.com/rangle/redux-beacon/master/examples/ngrx-store/redux-beacon-ngrx-store.patch | git apply

   npm install
)
```

## Step 2

Go into the `platform` directory and start the example app:

```sh
cd platform && npm run example:start
```

{% hint style='warning' %}
You might need to install [yarn](https://yarnpkg.com/en/docs/install) to
run the `example:start` script.
{% endhint %}

## Step 3

 - Open http://localhost:4200.
 - The username is `test` and the password is `test`.
 - Explore the app with an open console. Look out for the analytics logs.
