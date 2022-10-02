/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyState, AnyStateMachine, StateFrom } from 'xstate';
import { interpret } from 'xstate';

import type {
  StateObj,
  Service,
  MachinesObj,
  Opts,
  ValueOf,
  Events,
} from './types';

interface IStore<T extends MachinesObj> {
  /** @deprecated an internal property acting as a "phantom" type, not meant to be used at runtime */
  __TMachines: T;
}

export class InteralStore<T extends MachinesObj> implements IStore<T> {
  private listeners = new Set<(state: StateObj<T>) => void>();
  readonly services = new Map<keyof T, Service<T>>();
  public machines = new Map<keyof T, AnyStateMachine>();
  __TMachines = {} as T;

  #prevState!: StateObj<T>;
  #currentState!: StateObj<T>;
  #initialState: StateObj<T> = {} as StateObj<T>;

  constructor(machines: T) {
    Object.entries(machines).forEach(([key, machine]) => {
      const item = this.createMachine(key, machine);
      this.createService(key, item);
    });
  }

  public getState() {
    return { ...(this.#currentState ?? this.#initialState) };
  }

  public getPrevState() {
    return { ...(this.#prevState ?? this.#initialState) };
  }

  public getInitialState() {
    return { ...this.#initialState };
  }

  public subscribe(listener: (state: StateObj<T>) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public send<K extends keyof T>(key: K, ev: T[K]['__TEvent']) {
    const service = this.services.get(key);
    service?.send(ev);
  }

  public broadcast(ev: ValueOf<T>['__TEvent']) {
    Array.from(this.services.values()).forEach((service) => {
      service.send(ev);
    });
  }

  public setState<S extends AnyState>(key: keyof T, next: S) {
    const curr = { ...this.getState()[key as string] } as S;
    this.#prevState = { ...this.getState(), [key]: curr };
    this.#currentState = { ...this.getState(), [key]: next };
    this.listeners.forEach((listener) => {
      listener(this.#currentState);
    });
  }

  public createMachine<M extends AnyStateMachine>(
    key: keyof T,
    machine: M,
    opts: Opts<M> = {}
  ) {
    const { context, guards, actions, services, delays } = opts;
    const machineConfig = {
      context,
      guards,
      actions,
      services,
      delays,
    };
    const newMachine = machine?.withConfig(machineConfig as any, () => ({
      ...machine.context,
      ...context,
    }));
    this.machines.set(key, newMachine);
    return newMachine;
  }

  /**
   * This method was heavilly inspired on @xstate/react
   */
  public createService<M extends AnyStateMachine>(
    key: keyof T,
    machine: M,
    opts: Opts<M> = {}
  ): Service<T> {
    const { guards, actions, services, delays, ...interpreterOps } = opts;
    const service = interpret(machine, interpreterOps);
    Object.assign(service.machine.options.actions!, actions);
    Object.assign(service.machine.options.guards!, guards);
    Object.assign(service.machine.options.services!, services);
    Object.assign(service.machine.options.delays!, delays);
    (service as Service<T>).__storeKey = key;
    this.services.set(key, service as Service<T>);
    return service as Service<T>;
  }
}

export function createStore<T extends MachinesObj, E extends Events>(
  machines: T,
  opts?: { events(store: InteralStore<T>): E }
) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _store = new InteralStore<T>(machines);
  const store = {
    /** @deprecated */
    __store: _store,
    send: _store.send.bind(_store),
    broadcast: _store.broadcast.bind(_store),
    subscribe: _store.subscribe.bind(_store),
    getState: _store.getState.bind(_store),
  };

  const evts = opts?.events ? opts.events(_store) : ({} as E);
  const methods = Object.entries(evts).reduce((obj, [key, fn]) => {
    if (Object.keys(store).includes(key)) {
      throw new Error(
        `You cannot use "${key}" as event, because it's already a store property`
      );
    }
    return { ...obj, [key]: fn };
  }, {} as E);

  return {
    ...store,
    ...methods,
  } as typeof store & {
    [K in keyof E]: E[K];
  };
}

export type Store<
  T extends MachinesObj = any,
  E extends Events = any
> = ReturnType<typeof createStore<T, E>>;

type StoreMachine<T extends Store> = T['__store']['__TMachines'];
export type StateKeys<T extends Store> = keyof StoreMachine<T>;
export type StateOf<K extends StateKeys<T>, T extends Store> = StateFrom<
  StoreMachine<T>[K]
>;
