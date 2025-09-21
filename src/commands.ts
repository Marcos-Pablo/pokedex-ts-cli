import { commandExit } from './command-exit.js';
import { commandHelp } from './command-help.js';
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
    exit: {
      name: 'exit',
      description: 'Exits the pokedex',
      callback: commandExit,
    },
  };
}
