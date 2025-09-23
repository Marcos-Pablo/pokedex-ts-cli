import { State } from '../state';

export async function commandExplore(state: State, ...args: string[]) {
  const locationAreaName = args[0];
  if (!locationAreaName) {
    throw new Error('You must provide a location name');
  }
  const { pokeApi } = state;
  const locationArea = await pokeApi.fetchLocation(locationAreaName);

  console.log(`Exploring ${locationAreaName}`);
  console.log('Found Pokemon:');
  for (const { pokemon } of locationArea.pokemon_encounters) {
    console.log(` - ${pokemon.name}`);
  }
  console.log();
}
