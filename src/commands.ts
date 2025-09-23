import { commandCatch } from './command-catch.js';
import { commandExit } from './command-exit.js';
import { commandExplore } from './command-explore.js';
import { commandHelp } from './command-help.js';
import { commandInspect } from './command-inspect.js';
import { commandMapForward, commandMapBack } from './command-map.js';
import { CLICommand } from './state.js';

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: 'help',
      description: 'Displays a help message',
      callback: commandHelp,
    },
    map: {
      name: 'map',
      description: 'Displays the next 20 location areas',
      callback: commandMapForward,
    },
    mapb: {
      name: 'mapb',
      description: 'Displays the previous 20 location areas',
      callback: commandMapBack,
    },
    explore: {
      name: 'explore <location-area-name>',
      description: 'Explore a location area',
      callback: commandExplore,
    },
    catch: {
      name: 'catch <pokemon-name>',
      description: 'Attempt to catch a pokemon',
      callback: commandCatch,
    },
    inspect: {
      name: 'inspect <pokemon-name>',
      description: 'Inspect a pokemon from the pokedex',
      callback: commandInspect,
    },
    exit: {
      name: 'exit',
      description: 'Exits the pokedex',
      callback: commandExit,
    },
  };
}
