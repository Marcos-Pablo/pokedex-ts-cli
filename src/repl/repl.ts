import { State } from '../state.js';

export async function startREPL(state: State) {
  const { rl, commands } = state;
  rl.prompt();

  rl.on('line', async (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const args = words.slice(1);
    const cmd = commands[commandName];

    if (!cmd) {
      console.log(`Unknow command name: "${commandName}. Type "help" for a list of commands\n`);
      rl.prompt();
      return;
    }

    try {
      await cmd.callback(state, ...args);
    } catch (err) {
      if (err instanceof Error) {
        console.log(`${err.message}\n`);
      }
    }

    rl.prompt();
  });
}

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((word) => word !== '');
}
