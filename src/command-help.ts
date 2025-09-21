import { CLICommand } from './command.js';

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log('Welcome to the Pokedex!');
  console.log('Usage:\n');
  for (const { name, description } of Object.values(commands)) {
    console.log(`${name}: ${description}`);
  }
  console.log('\n');
}
