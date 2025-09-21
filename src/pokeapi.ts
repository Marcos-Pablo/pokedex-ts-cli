export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocationAreas> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return (await response.json()) as ShallowLocationAreas;
    } catch (err) {
      throw new Error(`Error fetching location areas: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    }
  }

  async fetchLocation(locationName: string): Promise<LocationArea> {
    try {
      const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return (await response.json()) as LocationArea;
    } catch (err) {
      throw new Error(`Error fetching location area details: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    }
  }
}

export type ShallowLocationAreas = {
  count: number;
  next: string;
  previous: string;
  results: NamedApiResource[];
};

export type LocationArea = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: NamedApiResource;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
};

export type NamedApiResource = {
  name: string;
  url: string;
};

export type EncounterMethodRate = {
  encounter_method: NamedApiResource;
  version_details: VersionDetail[];
};

export type VersionDetail = {
  rate: number;
  version: NamedApiResource;
};

export type Name = {
  name: string;
  language: NamedApiResource;
};

export type PokemonEncounter = {
  pokemon: NamedApiResource;
  version_details: VersionEncounterDetails[];
};

export type VersionEncounterDetails = {
  version: NamedApiResource;
  max_chance: number;
  encounter_details: Encounter[];
};

export type Encounter = {
  min_level: number;
  max_level: number;
  condition_values: NamedApiResource;
  chance: number;
  method: NamedApiResource;
};
