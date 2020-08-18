# Discovering Open-Source Middleware

While it’s good to know how to write error-handling middleware, it’s a natural curiosity that causes us to ask “isn’t error-handling a common task? Has someone written middleware that performs it for us?” Let’s take a look at the [list of Express middleware](https://expressjs.com/en/resources/middleware.html). This list of middleware includes many things the creators of Express maintain, some of which was included in Express in previous versions. The movement on the Express team’s part to identify separate functionality and modularize their code into independent factors allows developers like us to only take what we need. In this way, they can make major updates to each middleware individually and programmers who do not use that middleware won’t have to worry about their version of Express being out of date.

Can you find something on that list that will help us handle errors?

## Instructions

1. Require the error handling package that you found. Replace your catch-all error handler with the middleware created by the error handler package. You can use the default settings.

> Hint
Looking through the Express website, you’ll find [this](https://github.com/expressjs/errorhandler) package.