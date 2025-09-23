import { State } from './state';

export async function commandCatch(state: State, ...args: string[]) {
  const pokemonName = args[0];
  const { pokeApi, pokedex } = state;

  if (!pokemonName) {
    throw new Error("You must provide the pokemon's name");
  }

  const pokemon = await pokeApi.fetchPokemon(pokemonName);

  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  const caugth = Math.floor(Math.random() * pokemon.base_experience) <= 40;

  if (!caugth) {
    console.log(`${pokemonName} escaped!`);
    return;
  }

  console.log(`${pokemonName} was caugth!`);
  pokedex[pokemonName] = pokemon;
}
