import { createInterface } from 'node:readline';
import { getCommands } from './command.js';

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex > ',
  });

  rl.prompt();

  rl.on('line', (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const commands = getCommands();
    const cmd = commands[commandName];

    if (!cmd) {
      console.log(`Unknow command name: "${commandName}. Type "help" for a list of commands\n`);
      rl.prompt();
      return;
    }

    try {
      cmd.callback(commands);
    } catch (err) {
      console.log(err);
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
