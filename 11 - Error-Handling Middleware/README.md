# Error-Handling Middleware

We’re almost finished with our Code Quality Checklist, there’s just one last problem to fix! When an error is thrown somewhere in our code, we want to be able to communicate that there was a problem to the user. A programming error is never something to be ashamed of. It’s simply another situation for which we should be prepared.

Error handling middleware needs to be the last ``app.use()`` in your file. If an error happens in any of our routes, we want to make sure it gets passed to our error handler. The middleware stack progresses through routes as they are presented in a file, therefore the error handler should sit at the bottom of the file. How do we write it?

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```
Based on the code above, we can see that error-handling middleware is written much like other kinds of middleware. The biggest difference is that there is an additional parameter in our callback function, err. This represents the error object, and we can use it to investigate the error and perform different tasks depending on what kind of error was thrown. For now, we only want to send an HTTP 500 status response to the user.

Express has its own error-handler, which catches errors that we haven’t handled. But if we anticipate an operation might fail, we can invoke our error-handling middleware. We do this by passing an error object as an argument to ``next()``. Usually, ``next()`` is called without arguments and will proceed through the middleware stack as expected. When called with an error as the first argument, however, it will call any applicable error-handling middleware.

```javascript
app.use((req, res, next) => {
  const newValue = possiblyProblematicOperation();
  if (newValue === undefined) {
    let undefinedError = new Error('newValue was not defined!');
    return next(undefinedError);
  }
  next();
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});
```

In this segment we assign the return value of the function ``possiblyProblematicOperation()`` to ``newValue``. Then we check to see if this function returned anything at all. If it didn’t, we create a new ``Error`` and pass it to ``next()``. This prompts the error-handling middleware to send a response back to the user, but many other error-handling techniques could be employed (like logging, re-attempting the failed operation, and/or emailing the developer).

## Instructions

1. Add a very simple error handler as the last handler in your file, immediately before ``app.listen``. The callback function should have four arguments. It should set the status of the response equal to the ``status`` property of the error object if it exists or set it to 500 by default. Finally, your error handler should send back the error object’s ``message`` property.

If you want to see your errors in the terminal console as you test, log out the error or it’s ``message`` property inside your error handler.

2. Now, refactor the routes that send error responses (any that are greater than or equal to 400) to use this error handler. This means instead of a line like this

```javascript
return res.status(404).send('<error message>');
```

You should instead create a new Error with the correct error message, set its ``.status`` property, and then call ``next`` and pass in the error. Be sure to still ``return`` the ``next`` call so that the route/middleware callback breaks out and the error handler takes over.

> Hint
An example of this refactoring might look like this:

Before:
```javascript
return res.status(404).send('error!');
```
After:
```javascript
const err = new Error('error!');
err.status = 400;
return next(err);
```