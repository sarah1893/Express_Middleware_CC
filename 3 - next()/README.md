# next()

It seems like our middleware was successful — it logged out

The middleware stack is processed in the order they appear in the application file, such that middleware defined later happens after middleware defined before. It’s important to note that this is regardless of method — an ``app.use()`` that occurs after an ``app.get()`` will get called after the ``app.get()``. Observe the following code:

```javascript
app.use((req, res, next) => {
  console.log("A sorcerer approaches!");
  next();
});

app.get('/magic/:spellname', (req, res, next) => {
  console.log("The sorcerer is casting a spell!");
  next();
});

app.get('/magic/:spellname', (req, res, next) => {
  console.log(`The sorcerer has cast ${req.params.spellname}`);
  res.status(200).send();
});

app.get('/magic/:spellname', (req, res, next) => {
  console.log("The sorcerer is leaving!");
});

// Accessing http://localhost:4001/magic/fireball 
// Console Output:
// "A sorcerer approaches!"
// "The sorcerer is casting a spell!"
// "The sorcerer has cast fireball"
```

In the above code, the routes are called in the order that they appear in the file, provided the previous route called ``next()`` and thus passed control to the next middleware. We can see that the final matching call was not printed. This is because the previous middleware did not invoke the ``next()`` function to run the following middleware.

An Express middleware is a function with three parameters: ``(req, res, next)``. The sequence is expressed by a set of callback functions invoked progressively after each middleware performs its purpose. The third argument to a middleware function, ``next``, should get explicitly called as the last part of the middleware’s body. This will hand off the processing of the request and the construction of the response to the next middleware in the stack.

## Instructions
1. Add a call to ``next`` after your logging statement so that the middleware will be executed before moving on to your routes.

# Request And Response Parameters
Recall the function signature of an Express middleware, i.e., ``(req, res, next)``. You might recognize this signature as being the very same that we’ve used for Express routes in the past. Well there’s a perfectly good reason for that: Express routes are middleware. Every route created in Express is also a middleware function handling the request and response objects at that part of the stack. Express routes also have the option of sending a response body and status code and closing the connection. These two features are a byproduct of Express routes being middleware, because all Express middleware functions have access to the request, the response, and the next middleware in the stack.