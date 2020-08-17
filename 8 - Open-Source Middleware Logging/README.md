# Open-Source Middleware: Logging

Knowing how to write middleware, we should now feel inspired to solve all the problems that come at us by writing code. It’s encouraging to know how to fix an issue. If we find a solution we don’t need to write, however, it will allow us to work faster and more intelligently to focus on the problems that differentiate our application from others.

To illustrate: if we needed to write a web server from scratch every time we wanted to build a web application, we’d waste a lot of time solving problems that have been solved countless times before and ignoring perfectly good pre-existing solutions. Luckily for us web developers, Express already exists as an open-source package that we can install and use to build upon. There is a huge ecosystem of Javascript packages that will solve so many of the problems that developers frequently run into.

In the workspace you’ll see what code looks like using unnecessary custom solutions and lots of lines calling ``console.log()``. It’s not bad code, but it introduces complexity that could be avoided. Time spent thinking about and writing code that accomplishes common tasks is time that could be better spent on thinking about and writing code that is unique to your application.

We will replace the logging code in the workspace with [morgan](https://github.com/expressjs/morgan), an open-source library for logging information about the HTTP request-response cycle in a server application.` morgan()` is a function that will *return a middleware function*, to reiterate: the return value of ``morgan()`` will be a function, that function will have the function signature ``(req, res, next)`` that can be inserted into an ``app.use()``, and that function will be called before all following middleware functions. Morgan takes an argument to describe the formatting of the logging output. For example, ``morgan('tiny')`` will return a middleware function that does a “tiny” amount of logging. With morgan in place, we’ll be able to remove the existing logging code. Once we see how fast it is to add logging with morgan, we won’t have to spend time in the future trying to figure out how to replicate that functionality.

## Instructions

1. Require ``morgan`` at the top of the app where you import Express, and save it to a ``const morgan``.

2. Replace your logging middleware with ``morgan('tiny')``.

> Hint
Use ``morgan('tiny')`` inside an ``app.use`` call.

3. Morgan will log response codes after the response is sent, so you can get rid of all the remaining ``console.log`` statements that log ``'Response Sent'``. At the end of this refactor, you should only have one ``console.log`` left in your code (inside ``app.listen``).