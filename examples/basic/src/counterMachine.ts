import { createMachine, assign } from 'xstate';

type MachineContext = {
  value: number;
};

type MachineEvents = { type: 'INCREMENT' } | { type: 'DECREMENT' };

export const counterMachine = createMachine(
  {
    predictableActionArguments: true,
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    tsTypes: {} as import('./counterMachine.typegen').Typegen0,
    id: '(machine)',
    initial: 'idle',
    schema: {
      context: {} as MachineContext,
      events: {} as MachineEvents,
    },
    context: {
      value: 0,
    },
    states: {
      idle: {
        on: {
          INCREMENT: {
            actions: ['increment', 'setDoubleExternally'],
          },
          DECREMENT: {
            actions: ['decrement', 'setDoubleExternally'],
          },
        },
      },
    },
  },
  {
    actions: {
      increment: assign({
        value: (ctx) => ctx.value + 1,
      }),
      decrement: assign({
        value: (ctx) => ctx.value - 1,
      }),
    },
  }
);
