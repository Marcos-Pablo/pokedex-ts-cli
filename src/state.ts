import { createInterface, type Interface } from 'readline';
import { getCommands } from './commands.js';
import { PokeAPI } from './pokeapi.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeApi: PokeAPI;
  prevLocationsURL?: string;
  nextLocationsURL?: string;
};

export function initState(cacheInterval = 1000 * 60 * 10): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex > ',
  });

  return {
    rl,
    commands: getCommands(),
    pokeApi: new PokeAPI(cacheInterval),
    prevLocationsURL: undefined,
    nextLocationsURL: undefined,
  };
}
