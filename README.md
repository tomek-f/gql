# @tomekf/gqlite

> Lightweight GraphQL requests

## Installation

```bash
yarn add @tomekf/gqlite # or npm i @tomekf/gqlite
```

## Usage

```js
import gqlite from '@tomekf/gqlite';
// …
gqlite(url, { query, variables, headers, method, ...other }).then(/* … */).catch(/* … */);
```

Use `body` instead of `query`/`variables` pair for sending batch requests.

Use `rawRequest` for raw json response (no parsing).

## Important

Requires Promise, fetch and Headers support.
Use [core-js](https://www.npmjs.com/package/core-js) for Promise or sth else.
Use [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch) for fetch/Headers or sth else.

## Versions

* ES5 CommonJs `@tomekf/gqlite/dist`
* ES6+ with ESM `@tomekf/gqlite/src`

## Changelog

[here](https://github.com/tomek-f/gqlite/blob/master/CHANGELOG.md)
