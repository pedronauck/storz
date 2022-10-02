import { createStore } from '@storz/react';

import { counterMachine } from './counterMachine';

export const store = createStore(
  { counter: counterMachine },
  {
    events: (store) => ({
      increment() {
        store.send('counter', { type: 'INCREMENT' });
      },
      decrement() {
        store.send('counter', { type: 'DECREMENT' });
      },
    }),
  }
);

export type Store = typeof store;
