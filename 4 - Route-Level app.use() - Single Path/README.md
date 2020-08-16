# Route-Level app.use() - Single Path

Now that we’ve managed to refactor our duplicate code into middleware functions, we should be noticing that our code contains much less repetition than before. Unfortunately, we still have duplicate code in some of our routes. Since this code isn’t shared by all of our routes, the previous syntax of ``app.use()`` won’t work. Let’s see what the [Express documentation](https://expressjs.com/en/4x/api.html) for ``app.use()`` has to say about this use case. This is the ``app.use()`` function signature:

```javascript
app.use([path,] callback [, callback...])
```

In documentation for many programming languages, optional arguments for functions are placed in square brackets ([]). This means that ``app.use()`` takes an optional path parameter as its first argument. We can now write middleware that will run for every request at a specific path.

```javascript
app.use('/sorcerer', (req, res, next) => {
  console.log('User has hit endpoint /sorcerer');
  next();
});
```

In the example above the console will print ``'User has hit endpoint /sorcerer'``, if someone visits our web page’s ‘/sorcerer’ endpoint. Since the method ``app.use()`` was used, it won’t matter if the user is performing a ``GET``, a ``POST``, or any other kind of HTTP request. Since the path was given as an argument to ``app.use()``, this middleware function will not execute if the user hits a different path (for instance: ``'/spells'`` or ``'/sorcerer/:sorcerer_id'``).

## Instructions

1. We’re going to refactor all the logic that checks the existence of a jelly bean into a new middleware function. Currently, this logic is used in every route that begins with ``beans/:beanName`` and looks like this:

```javascript
const beanName = req.params.beanName;
  if (!jellybeanBag[beanName]) {
    console.log('Response Sent');
    return res.status(404).send('Bean with that name does not exist');
  }
```

We check to see if the bean with the supplied name exists in ``jellybeanBag``, and we send a 404 response if it does not. The ``return`` statement ensures that we break out of the middleware and don’t try any operations on a nonexistent jelly bean.

Create a new ``app.use`` call after your logging middleware. It should be called for all ``/beans/:beanName`` routes. You can leave the callback empty at this point.


2. Copy all the checking logic (from ``const beanName`` through the ``if`` statement) from a route into your middleware callback. Remove those lines from every route that uses them.

3. After the checking logic, we’re going to attach the correct bean object to the request by setting a ``bean`` property on the request (``req.bean``). Set it equal to the correct bean from the bean object. For good measure, also attach the bean name to the request as ``req.beanName``.

After these properties are set, be sure to call ``next``.

> Hint
The syntax for setting a property of the request object is

```javascript
req.propertyName = value;
```

4. You can now remove the duplicate checking logic from all ``/beans/:beanName`` routes. To make sure that all your routes still work if we remove ``const beanName = req.params.beanName;`` from them, make sure that you use ``req.beanName`` any place where you need to access the bean by name. For instance, inside ``app.delete``, you’ll have to change

```javascript
jellybeanBag[beanName] = null;
```

to

```javascript
jellybeanBag[req.beanName] = null;
```

Check your routes to make sure that they use ``req.beanName``.