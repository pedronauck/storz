/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import type {
  Events,
  InteralStore,
  MachinesObj,
  RestParams,
  Service,
} from '@storz/core';
import { createStore as createInternalStore } from '@storz/core';
import { useSelector } from '@xstate/react';
import { useSyncExternalStore } from 'react';

import useConstant from './useConstant';

export function createStore<T extends MachinesObj, E extends Events>(
  machines: T,
  opts?: { events(store: InteralStore<T>): E }
) {
  const store = createInternalStore<T, E>(machines, opts);
  return {
    ...store,
    useStoreSelector: useSelector,
    useStoreService(key: keyof T) {
      const { __store } = store;
      return useSyncExternalStore(__store.subscribe.bind(__store), () => {
        const service = __store.services.get(key) as Service<T>;
        if (!service?.initialized) {
          service?.start();
        }
        return service!;
      });
    },
    useSetMachineConfig<K extends keyof T>(
      machineKey: K,
      ...[opts = {}]: RestParams<T[K]>
    ) {
      useConstant(() => {
        const _store = store.__store;
        const service = _store.services.get(machineKey) as Service<T>;
        const key = service?.__storeKey;
        const machine = _store.machines.get(key);
        const newMachine = _store.createMachine(key, machine!, opts as any);
        _store.createService(key, newMachine, opts as any);
      });
    },
  };
}
