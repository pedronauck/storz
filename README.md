<h1>Storz</h1>

[![CI status][github-action-image]][github-action-url]
[![codecov][codecov-image]][codecov-url]

[github-action-image]: https://github.com/pedronauck/storz/workflows/%E2%9C%85%20test/badge.svg
[github-action-url]: https://github.com/pedronauck/storz/actions?query=workflow%3A%22%E2%9C%85+test%22

<br>

[![License](https://img.shields.io/github/license/pedronauck/storz)](https://github.com/pedronauck/storz)
[![Issues Open](https://img.shields.io/github/issues/pedronauck/storz)](https://github.com/pedronauck/storz)
[![Github Forks](https://img.shields.io/github/forks/pedronauck/storz)](https://github.com/pedronauck/storz)
[![Github Stars](https://img.shields.io/github/stars/pedronauck/storz)](https://github.com/pedronauck/storz)

The main purpose of this project is make it easy to use XState machines and create global state with it. Since XState don't have yet this feature, Storz will help you with this job.

<h2>📝&nbsp; Table of Content</h2>

- [🚀&nbsp; Features](#-features)
- [📦&nbsp; Install](#-install)
- [🧑🏻‍💻&nbsp; Usage](#-usage)
  - [Setting machine config inside React components](#setting-machine-config-inside-react-components)
  - [Pre-defining events in the store](#pre-defining-events-in-the-store)
- [📟&nbsp; Example](#-example)
- [💪🏻&nbsp; Contributing](#-contributing)
- [📜&nbsp; License](#-license)

- [🚀&nbsp; Features](#-features)

## 🚀&nbsp; Features

- ✅ Handle global machines easily
- ✅ Frameworkless library on `@storz/core`
- ✅ React integration with `@storz/react`
- ✅ No external libs, just XState

## 📦&nbsp; Install

```bash
$ yarn add @storz/react
```

```bash
$ pnpm install @storz/react
```

## 🧑🏻‍💻&nbsp; Usage

- First create you global store with your actions as parameters:

```jsx
import { createStore } from '@storz/react';

import { testMachine } from './testMachine';

export const store = create({
  test: testMachine,
});
```

- Then, just use your machine anywhere in your application

```jsx
import { store } from './store';

export function MyComponent() {
  const service = store.useStoreService('test');
  const value = store.useStoreSelector(service, (s) => s.context.value);
  return <div>{value}</div>;
}
```

### Setting machine config inside React components

One of the main problem when using a global state machine is in the case you need to define some actions that depends on be in the context of React. To cover that, with Storz you can use `useSetMachineConfig` and handle you configurations easily:

```jsx
import { useState } from 'react';

import { store } from './store';

function DoubleCounter() {
  const [double, setDouble] = useState(0);

  store.useSetMachineConfig('counter', {
    actions: {
      setDoubleExternally(ctx) {
        setDouble(ctx.value * 2);
      },
    },
  });

  return <div>{double}</div>;
}
```

### Pre-defining events in the store

You can define events inside your store in order to create automatic handlers you can access anywhere also in your code:

```jsx
import { createStore } from '@storz/react';

import { testMachine } from './testMachine';

export const store = create(
  {
    test: testMachine,
  },
  {
    events: (store) => ({
      someEvent: () => store.send('test', { type: 'MY_EVENT ' }),
    }),
  }
);

store.someEvent(); // this method now is attached to your store
```

## 📟&nbsp; Example

Check our [basic example](./examples/basic) in order to see the app up and running.
But basically that's what you'll find there:

```jsx
import { createStore } from '@storz/react';
import { counterMachine } from './counterMachine';

const events = (store) => ({
  increment() {
    store.send('counter', { type: 'INCREMENT' });
  },
  decrement() {
    store.send('counter', { type: 'DECREMENT' });
  },
});

export const store = createStore({ counter: counterMachine }, { events });

function Increment() {
  return <button onClick={store.increment}>Inc</button>;
}

function Decrement() {
  return <button onClick={store.decrement}>Inc</button>;
}

function Counter() {
  const service = store.useStoreService('counter');
  const value = store.useStoreSelector(service, (s) => s.context.value);

  return <div>{value}</div>;
}

export function App() {
  return (
    <div>
      <Increment />
      <Decrement />
      <Counter />
    </div>
  );
}
```

## 💪🏻&nbsp; Contributing

Feel like contributing? That's awesome! We have a [contributing guide](./CONTRIBUTING.md) to help guide you.

## 📜&nbsp; License

The primary license for this repo is `MIT`, see [`LICENSE`](./LICENSE).
