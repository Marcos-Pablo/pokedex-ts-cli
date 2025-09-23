import { commandCatch } from './command-catch';
import { commandExit } from './command-exit';
import { commandExplore } from './command-explore';
import { commandHelp } from './command-help';
import { commandInspect } from './command-inspect';
import { commandMapForward, commandMapBack } from './command-map';
import { commandPokedex } from './command-pokedex';
import { CLICommand } from '../state';

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
      name: 'explore <location_area_name>',
      description: 'Explore a location area',
      callback: commandExplore,
    },
    catch: {
      name: 'catch <pokemon-name>',
      description: 'Attempt to catch a pokemon',
      callback: commandCatch,
    },
    inspect: {
      name: 'inspect <pokemon_name>',
      description: 'View details about a caught pokemon',
      callback: commandInspect,
    },
    pokedex: {
      name: 'pokedex',
      description: "See all the pokemon you've caught",
      callback: commandPokedex,
    },
    exit: {
      name: 'exit',
      description: 'Exits the pokedex',
      callback: commandExit,
    },
  };
}
