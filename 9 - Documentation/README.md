# Documentation

With software we’ve personally written, invocation is a simple process. We already know what the code does, what it expects, and may have some notion how things could go wrong. Losing this intuition is the biggest downside to using open-source packages.

This is not meant to be discouraging. The best open-source packages have extremely well written *documentation*. Documentation is a resource, presented by the package’s author(s), that includes information about what software is, what it does, and how to use it. We’ve seen the Express documentation in this course, and now we’re going to look at the [morgan documentation](https://github.com/expressjs/morgan#api).

## Instructions

1. Morgan provides a number of pre-defined formats. Let’s change from using ``'tiny'`` to one with a bit more information. We want one with the HTTP method, URL, status code, response time, content length, and one that changes colors of the status code output based on the code. Try to find the logging format that will create output as we expect and replace ``'tiny'`` with that format name.

> Hint
If you look through the docs, you’ll notice ‘dev’ meets our criteria. Let’s use that!