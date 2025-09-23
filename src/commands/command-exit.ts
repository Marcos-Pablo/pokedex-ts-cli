import { State } from '../state';

export async function commandExit({ rl, pokeApi }: State) {
  console.log('Closing the Pokedex... Goodbye!');
  rl.close();
  pokeApi.closeCache();
  process.exit(0);
}
