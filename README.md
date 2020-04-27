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

(And then) use `rawRequest` for raw json response (no parsing).

## Important

Requires async/await, Promise, fetch and Headers support.

## Versions

* ES5 CommonJs `@tomekf/gqlite/dist`
* ES6+ with ESM `@tomekf/gqlite/src`

## Changelog

[here](https://github.com/tomek-f/gqlite/blob/master/CHANGELOG.md)
