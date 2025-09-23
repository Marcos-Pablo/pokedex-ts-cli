import { State } from '../state.js';

export async function commandInspect(state: State, ...args: string[]) {
  const pokemonName = args[0];
  const { pokedex } = state;

  if (!pokemonName) {
    throw new Error("You must provide the pokemon's name");
  }

  const pokemon = pokedex[pokemonName];
  if (!pokemon) {
    throw new Error(`${pokemonName} is not available in your pokedex!`);
  }

  console.log();
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log('Stats:');
  for (const { base_stat, stat } of pokemon.stats) {
    console.log(`  -${stat.name}: ${base_stat}`);
  }
  console.log('Types:');
  for (const { type } of pokemon.types) {
    console.log(`  -${type.name}`);
  }
  console.log();
}
