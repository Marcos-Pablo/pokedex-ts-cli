import { startREPL } from './repl/repl';
import { initState } from './state';

async function main() {
  const state = initState(1000 * 60 * 5);
  await startREPL(state);
}

main();
