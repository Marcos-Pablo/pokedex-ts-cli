import { State } from '../state';

export async function commandPokedex(state: State) {
  const { pokedex } = state;
  console.log('Your Pokedex:');
  if (Object.keys(pokedex).length === 0) {
    console.log(' - empty');
  }
  for (const pokemonName in pokedex) {
    console.log(` - ${pokemonName}`);
  }
}
