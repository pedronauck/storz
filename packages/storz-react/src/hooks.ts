/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { useSelector } from '@xstate/react';
import { useSyncExternalStore } from 'react';
import type { RestParams, Service, Store } from 'storz';

import useConstant from './useConstant';

export const useStoreSelector = useSelector;

export function useStoreService<S extends Store>(
  store: S,
  key: keyof S['__store']['__TMachines']
) {
  const { __store } = store;
  return useSyncExternalStore(__store.subscribe.bind(__store), () => {
    const service = __store.services.get(key) as Service<
      S['__store']['__TMachines']
    >;
    if (!service?.initialized) {
      service?.start();
    }
    return service!;
  });
}

export function useSetMachineConfig<
  S extends Store,
  K extends keyof S['__store']['__TMachines']
>(
  store: S,
  machineKey: K,
  ...[opts = {}]: RestParams<S['__store']['__TMachines'][K]>
) {
  useConstant(() => {
    const _store = store.__store;
    const service = _store.services.get(machineKey) as Service<
      S['__store']['__TMachines']
    >;
    const key = service?.__storeKey;
    const machine = _store.machines.get(key);
    const newMachine = _store.createMachine(key, machine!, opts as any);
    _store.createService(key, newMachine, opts as any);
  });
}
