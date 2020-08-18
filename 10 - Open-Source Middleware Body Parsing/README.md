# Open-Source Middleware: Body Parsing

Being able to use open-source middleware can certainly make our jobs as programmers a lot easier. Not only does it prevent us from having to write the same code every time we want to accomplish a common task, it allows us to perform some tasks that would take a lot of research for us to implement.

When we implement middleware, we take in the req object, so that we can see information about the request. This object includes a good deal of important information about the request that we can use to inform our response, however for some requests it misses a fundamental piece. An HTTP request can include a body, a set of information to be transmitted to the server for processing. This is useful when the end user needs to send information to the server. If you’ve ever uploaded a post onto a social media website or filled out a registration form chances are you’ve sent an HTTP request with a body. The lucky thing about using open-source middleware is that even though parsing the body of an HTTP request is a tricky operation requiring knowledge about network data transfer concepts, we easily manage it by importing a library to do it for us.

If we look at our ``bodyParser``, we see a simplified version of how one might perform request body parsing. Let’s see if there’s a better way that doesn’t involve us trying to create our own body-parser. Maybe we can find a library that does it for us?

Take a look at [body-parser](https://github.com/expressjs/body-parser#body-parser). “Node.js body parsing middleware”, that’s just what we needed! Let’s see if we can use this *dependency* instead of trying to manage our own body-parsing library.

## Instructions

1. Our ``bodyParser`` function is okay for now, but there are bound to be edge cases and all sorts of request bodies it can’t handle well. Let’s replace it with a well-maintained open-source package, ``body-parser``. Require ``'body-parser'`` at the top of the app in the same way, and save it to a ``const bodyParser``.

> Hint
The syntax for importing ``'body-parser'`` should mirror your syntax for importing ``'morgan'``.

2. Remove the ``bodyParser`` middleware that you previously wrote. You can also now remove it from the middleware stacks for all PUT and POST routes. ``bodyParser`` will automatically attach the parsed body object to ``req.body``.

Open a new ``app.use`` call directly after your morgan logging middleware. ``bodyParser`` has multiple [methods](https://github.com/expressjs/body-parser#api) for returning middleware functions. For now, let’s use ``bodyParser.json()`` to parse all request bodies in JSON format.