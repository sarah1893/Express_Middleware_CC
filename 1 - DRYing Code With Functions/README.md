# DRYing Code With Functions

Beyond labeling, good code will leverage the strength of its programming language to avoid performing the same tasks

Take a look at the following code:

```javascript
const addFive = number => {
  const fiveAdded = number + 5;
  console.log(`Your number plus 5 is ${fiveAdded}`);
}

const addTen = number => {
  const tenAdded = number + 10;
  console.log(`Your number plus 10 is ${tenAdded}`);
}

const addTwenty = number => {
  const twentyAdded = number + 20;
  console.log(`Your number plus 20 is ${twentyAdded}`);
}
```

The code above defines three different functions that accomplish the radically different tasks of: adding five to a number and logging the sum, adding ten to a number and logging the sum, and adding twenty to a number and logging the sum. While these three function definitions are not exact duplicates of each other, a well-designed application will be flexible enough to join similar functionality in a single element.

```javascript
const addNumber = (number, addend) => {
  const numAdded = number + addend;
  console.log(`Your number plus ${addend} is ${numAdded}`);
}
```
As you can see, by adding an argument to the earlier functions we can simplify our application code which will ultimately save time should we realize that we also want an ``addFifty()`` function and an ``addHundred()`` function. Code that performs the same task in multiple places is repetitive, and the quality coder’s credo is “Don’t Repeat Yourself” (DRY). If a program performs similar tasks without refactoring into a function, it is said to “violate DRY”. “Violating DRY” is a programmer’s way of complaining: “This script is saying the same thing over and over! We can do the same thing with less code!” Let’s try to not repeat ourselves in this codebase by repurposing some of the more glaringly repeated code into functions we can call instead.

## Instructions

1. We have provided a front-end for testing out your routes throughout this lesson. To get it to display in each exercise, start your server (``node app.js``) and then refresh the browser to the right. A tool should appear that allows you to set request verbs, paths, and body information, and then make requests using that information. Use this tool to ensure your server is working as expected throughout this lesson, checking your server logs and examining the returned responses as you make changes.

2. Currently, each route logs a message with the HTTP method and a message that the request was received (i.e. ``'GET Request Received'``). Write a function ``logRequest`` that takes a single string parameter ``verb`` and logs a message formatted in the same fashion.

3. Replace the ``console.log`` calls that open each route and replace each with a call to ``logRequest``. Pass in the method name for each route.