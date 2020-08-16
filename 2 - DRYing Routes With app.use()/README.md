# DRYing Routes With app.use()

By now you may have noticed that our efforts to not repeat ourselves have resulted in us putting the same function call over and over throughout our code. Isn’t that somewhat contradictory? You would be absolutely right to think so.

So how do we get code to run every time one of our Express routes is called without repeating ourselves? We write something called *middleware*. Middleware is code that executes between a server receiving a request and sending a response. It operates on the boundary, so to speak, between those two HTTP actions.

In Express, middleware is a function. Middleware can perform logic on the request and response objects, such as: inspecting a request, performing some logic based on the request, attaching information to the response, attaching a status to the response, sending the response back to the user, or simply passing the request and response to another middleware. Middleware can do any combination of those things or anything else a Javascript function can do.

```javascript
app.use((req, res, next) => {
  console.log('Request received');
});
```
The previous code snippet is an example of middleware in action. ``app.use()`` takes a callback function that it will call for every received request. In this example, every time the server receives a request, it will find the first registered middleware function and call it. In this case, the server will find the callback function specified above, call it, and print out ``'Request received'``.

You might be wondering what else our application is responsible for that isn’t related to middleware. The answer is not much. To quote the [Express documentation](http://expressjs.com/en/guide/using-middleware.html):

*An Express application is essentially a series of middleware function calls.*

It is precisely this service that we leverage Express for. In addition to performing the routing that allows us to communicate appropriate data for each separate endpoint, we can perform application logic we need by implementing the necessary middleware.

## Instructions

1. After your ``logRequest`` function, there is an unfinished call to ``app.use()``. Its callback will be called before every route. We’ll be moving the logging out of ``logRequest``, so we no longer have access to the ``verb`` string. Since we can access the ``req`` object, however, we can use the ``req.method`` property which will always be equal to the verb of the request! Finish the ``app.use()`` callback by replicating the logging behavior of ``logRequest``.

Don’t be afraid if your server no longer returns responses. We will fix this in the next exercise.

2. All the calls to ``logRequest`` should now be redundant. Remove them from every route, and remove the ``logRequest`` function itself.

3. Now we’ve removed a significant amount of code, but our routes aren’t returning responses, because something is still missing from our first ``app.use()`` call. Move on to the next exercise when you’re ready.