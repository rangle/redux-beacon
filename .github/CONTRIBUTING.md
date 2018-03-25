# Contributing

## How to Make a Pull Request

Not sure how to make a pull request? Watch the following free series on egghead.io:
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## How to Make Updates to the Ngrx/Store Example Integration

 1. Follow the [instructions](https://github.com/rangle/redux-beacon/tree/master/examples/ngrx-store)
    for downloading the example app.

    - At this point you should have the example integration up and running. Run
      `git status` in your console, you should see a number of unstaged changes.

 2. Make your changes. Ensure your changes are working using frequent manual
    tests in the browser.

 3. Once you're satisified with your changes run the following command:

    ```sh
    git diff > redux-beacon-ngrx-store.patch
    ```

 4. Copy the patch to `redux-beacon/examples/ngrx-store`. Stage and commit the
    changes, then make a pull request.
