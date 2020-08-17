# Route-Level app.use() - Multiple Paths

We learned that ``app.use()`` takes a path parameter, but we never fully investigated what that path parameter could be. Let’s take another look at the Express documentation for ``app.use()``:

“*argument*: path

*description*: The path for which the middleware function is invoked; can be any of:

- A string representing a path.
- A path pattern.
- A regular expression pattern to match paths.
- An array of combinations of any of the above. “

So ``app.use()`` can take an array of paths! That seems like a handy way to rewrite the code from our last exercise so that we don’t have to put the same code in two different routes with different paths.

## Instructions

1. Now we’ll add some more advanced middleware. You might have noticed that in each PUT and POST route, there is code that looks like this:

```javascript
let bodyData = '';
req.on('data', (data) => {
  bodyData += data;
});
req.on('end', () => {
  // ...
});
```

You don’t need to worry too much about how this code works right now since we’ll eventually be replacing it with a better solution, but it is used for combining the HTTP request body into a single string. The ``req.on('end' ..`` callback will be called once the whole request has been received. We are going to move this logic to middleware so that it attaches the body to the request object once it’s fully received and then calls ``next``.

Open a new call to ``app.use`` below the previous middleware. Make sure that it matches all routes for ``'/beans/'`` and ``'/beans/:beanName'`` using the array of routes syntax. You can leave your callback function body empty for now.

2. Now, copy the lines from the ``bodyData`` variable declaration to the end of the first ``req.on`` call into your middleware callback.

> Hint
Copy these lines into your middleware:

```javascript
let bodyData = '';
req.on('data', (data) => {
  bodyData += data;
});
```

3. The next step will be a bit different from the routes that are already present. Add ``req.on('end', () => {})``. Complete the callback by adding the following lines inside the body of the callback function:

```javascript
if (bodyData) {
  req.body = JSON.parse(bodyData);
}
```

This will parse the request body into a JavaScript object and attach it to the request object. Finish the middleware by calling ``next`` at the end of the ``req.on('end')`` callback function outside of the if statement.

4. Now to refactor! You can remove the lines

```javascript
let bodyData = '';
req.on('data', (data) => {
  bodyData += data;
});
```

from all your routes. Then you can remove the ``req.on('end' ...)`` method calls, but you’ll need to preserve the callback functions’ internal logic. You can simply remove the lines with ``req.on(...`` and the ``});`` line at the end of the method call. Do this for all routes that have this duplicate code.

5. To finish refactoring, you can replace all instances of ``JSON.parse(bodyData)`` in the same routes and replace them with ``req.body`` since the body has already been parsed!

6. Great job, you removed duplicate code from four routes!