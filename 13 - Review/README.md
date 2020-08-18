# Review

We’ve accomplished a lot! We learned what middleware is and we’ve used it to write cleaner, readable, adaptable, and maintainable code. We’ve written functions that are context aware and can have overlapping functionality without duplicating code. We can serve data by route, with each possible endpoint being treated as a separate relative of the family of our application. We learned to link these middleware using ``next()`` to continue to the next middleware in the stack. We’ve reduced complexity in our codebase by relying on external, open-source middleware. We are truly harnessing the power of the Express web server, the Node environment, and our knowledge of Javascript. Let’s review those skills.

In the workspace there is another codebase with a set of familiar problems. Custom middleware to accomplish tasks we could be importing a module for. Duplicated code throughout the different routes. Improperly managed middleware stack missing ``next()`` calls. You will need everything learned in this lesson, but it’s nothing you haven’t done before.

## Instructions

1. There’s something missing from the custom body-parsing middleware function, fix it to move on.

2. Now our app should work, but let’s replace the custom body-parsing with the ``body-parser`` package. Use ``bodyParser.json()`` for all routes.

3. The following existence checking logic appears at all ``/cards/:cardId`` routes. Refactor it to a middleware function that matches all ``/cards/:cardId`` routes. If the card exists, add it to the ``req`` object as ``req.cardIndex`` and refactor routes to use ``req.cardIndex`` where necessary.

```javascript
const cardId = Number(req.params.cardId);
const cardIndex = cards.findIndex(card => card.id === cardId);
if (cardIndex === -1) {
  return res.status(404).send('Card not found');
}
```

4. You probably noticed that these lines get replicated for POST and PUT requests

```javascript
const newCard = req.body;
const validSuits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const validRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
if (validSuits.indexOf(newCard.suit) === -1 || validRanks.indexOf(newCard.rank) === -1) {
  return res.status(400).send('Invalid card!');
}
```

Create a custom middleware function named ``validateCard`` that replicated this logic. Use it in the middleware stack for the POST and PUT routes.

5. Congratulations! You’ve fixed the broken functionality and greatly increased the code quality using your middleware skills!