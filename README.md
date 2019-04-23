# @tomekf/gqlight

> Lightweight GraphQL requests

## Installation

```bash
yarn add @tomekf/gqlight # or npm i @tomekf/gqlight
```

## Usage

```js
import gqlight from '@tomekf/gqlight';
// …
gqlight(url, { query, variables, headers, method, ...other }).then(/* … */).catch(/* … */);
```

Use `body` instead of `query`/`variables` pair for sending batch requests.

Use `rawRequest` for raw json response (no parsing).

## Important

Requires Promise, fetch and Headers support.
Use [core-js](https://www.npmjs.com/package/core-js) for Promise or sth else.
Use [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch) for fetch/Headers or sth else.

## Versions

* ES5 CommonJs `@tomekf/gqlight/dist`
* ES6+ with ESM `@tomekf/gqlight/src`

## Changelog

[here](https://github.com/tomek-f/gqlight/blob/master/CHANGELOG.md)
