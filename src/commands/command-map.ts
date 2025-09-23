import { State } from '../state';

export async function commandMapForward(state: State) {
  await mapDirection(state, 'next');
}

export async function commandMapBack(state: State) {
  if (!state.prevLocationsURL) {
    throw new Error("You're on the first page");
  }
  await mapDirection(state, 'prev');
}

async function mapDirection(state: State, direction: 'prev' | 'next') {
  const { pokeApi } = state;
  const url = direction === 'prev' ? state.prevLocationsURL : state.nextLocationsURL;
  const locationAreas = await pokeApi.fetchLocations(url);
  state.prevLocationsURL = locationAreas.previous;
  state.nextLocationsURL = locationAreas.next;
  for (const { name } of locationAreas.results) {
    console.log(name);
  }
  console.log();
}
