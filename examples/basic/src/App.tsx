import {
  useSetMachineConfig,
  useStoreSelector,
  useStoreService,
} from '@storz/react';
import { useState } from 'react';

import { store } from './store';

function Increment() {
  return <button onClick={store.increment}>Inc</button>;
}

function Decrement() {
  return <button onClick={store.decrement}>Inc</button>;
}

function Counter() {
  const [double, setDouble] = useState(0);
  const service = useStoreService(store, 'counter');
  const value = useStoreSelector(service, (s) => s.context.value);

  useSetMachineConfig(store, 'counter', {
    actions: {
      setDoubleExternally(ctx) {
        setDouble(ctx.value * 2);
      },
    },
  });

  return (
    <>
      <div>Global: {value}</div>
      <div>Internal: {double}</div>
    </>
  );
}

export function App() {
  return (
    <div className="App">
      <Increment />
      <Decrement />
      <Counter />
    </div>
  );
}
