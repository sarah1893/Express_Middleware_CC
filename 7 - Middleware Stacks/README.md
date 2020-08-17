# Middleware Stacks

Recall that middleware is just a function with a specific signature, namely ``(req, res, next)``. We have, for the most part, been using anonymous function definitions for this because our middleware has only been relevant to the route invoking it. There is nothing stopping us from defining functions and using them as middleware though. That is to say:

```javascript
const logging = (req, res, next) => {
  console.log(req);
  next();
};

app.use(logging);
```

is a valid and reasonable way to introduce logging throughout all paths. It is also modifiable so that you can remove the ``app.use()`` line and replace it with a specific route method, or sprinkle it throughout the application without it being universal.

Up until this point we’ve only been giving each middleware-accepting method a single callback. With modular pieces like this, it is useful to know that methods such as ``app.use()``, ``app.get()``, ``app.post()``, and so on all can take multiple callbacks as additional parameters. This results in code that looks like the following:

```javascript
const authenticate = (req, res, next) => {
  ...
};

const validateData = (req, res, next) => {
  ...
};

const getSpell = (req, res, next) => {
  res.status(200).send(getSpellById(req.params.id));
};

const createSpell = (req, res, next) => {
  createSpellFromRequest(req);
  res.status(201).send();
};

const updateSpell = (req, res, next) => {
  updateSpellFromRequest(req);
  res.status(204).send();
}

app.get('/spells/:id', authenticate, getSpell);

app.post('/spells', authenticate, validateData, createSpell);

app.put('/spells/:id', authenticate, validateData, updateSpell);
```

In the above code sample, we created reusable middleware for authentication and data validation. We use the ``authenticate()`` middleware to verify a user is logged in before proceeding with the request and we use the ``validateData()`` middleware before performing the appropriate create or update function. Additional middleware can be placed at any point in this chain.

## Instructions
1. Since we don’t need any request body for GET or DELETE routes, let’s refactor the behavior of our body-parsing middleware to use the in-route middleware stack. Start by saving the body-parsing middleware to a ``const`` variable ``bodyParser`` and removing the ``app.use`` call handling body parsing for ``['/beans/', '/beans/:beanName']``.

> Hint
To extract a middleware function and save to a variable, you can use this refactoring pattern:

Initial code:

```javascript
app.use((req, res, next) => {
  res.send('Cool data!');
});
```

Refactored:

```javascript
const sendCoolResponse = (req, res, next) => {
  res.send('Cool data!');
});

app.get(sendCoolResponse);
```

2. Now, insert the ``bodyParser`` as the first callback for all routes handling POST requests.