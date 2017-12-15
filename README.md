# babel/transform-get-rid-of-async-await

> Turn async functions into non-async functions.

Why would you ever do that?
I'm building a generic testing wrapper that allows me to reuse the same pageobjects for enzyme/chimp/cypress.io/webdriverio.
The idea is that in tests I only use page objects, and the underlying implementation of them is hidden from a user.
Unfortunately, some of the API - like cypress.io or chimp 1.0 or not async/await compatible, while for enzyme it's a must.
This way I can use the same code in both, by using different BABEL_ENV.

## Example

**In**

```javascript
async function foo() {
  await bar();
}
```

**Out**

```javascript
function foo() {
  bar();
}
```


## Installation

```sh
npm install --save-dev babel-plugin-get-rid-of-async-await
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["babel/transform-get-rid-of-async-await"]
}
```


### Via CLI

```sh
babel --plugins babel/transform-get-rid-of-async-await
```

### Via Node API

```javascript
require("babel/core").transform("code", {
  plugins: ["babel/transform-get-rid-of-async-await"]
});
```
