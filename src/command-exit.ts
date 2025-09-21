import { State } from './state';

export function commandExit({ rl }: State) {
  console.log('Closing the Pokedex... Goodbye!');
  rl.close();
  process.exit(0);
}
