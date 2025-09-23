import { State } from '../state';

export async function commandHelp({ commands }: State) {
  console.log('Welcome to the Pokedex!');
  console.log('Usage:\n');
  for (const { name, description } of Object.values(commands)) {
    console.log(`${name}: ${description}`);
  }
  console.log('\n');
}
