# Control Flow With next()

We’ve experienced writing middleware that performs its function and hands off the request and response objects to the next function in the stack, but why exactly do we have to write ``next()`` at the end of every middleware? If it always needs to be at the end of every function we write, it seems like an unnecessary piece of boilerplate. You might be surprised to learn that we aren’t going to introduce a way to automatically hand off the request and response objects without having to repeatedly write next(). Rather, we’re going to explore why it is useful to have ``next()`` as a separate function call. The biggest reason being we don’t always want to pass control to the next middleware in the stack.

For example, when designing a system with confidential information, we want to be able to selectively show that information to authorized users. In order to do that, we would create middleware that tests a user’s permissions. If the user has the permission necessary, we would continue through the middleware stack by calling ``next()``. If it fails, we would want to let the user know that they’re not allowed to see the information they’re trying to access.

## Instructions

Notice how our middleware correctly calls ``next``. If your ``if`` block is entered (meaning the bean does not exist), the function ``return``s to break from the middleware. We could also achieve the same result by putting all the code after the ``if`` block in an ``else``.

``next`` is called at the end of the middleware callback function. This placement ensures that if a bean does not exist, the proper error status is sent, but if it does exist, we attach it to the request object and proceed to the next matching route/middleware to complete the request-response cycle.