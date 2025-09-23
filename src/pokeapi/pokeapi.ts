import { Cache } from './pokecache.js';

export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';
  private readonly cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocationAreas> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    const cached = this.cache.get<ShallowLocationAreas>(url);

    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const shallowLocationAreas: ShallowLocationAreas = await response.json();
      this.cache.add<ShallowLocationAreas>(url, shallowLocationAreas);
      return shallowLocationAreas;
    } catch (err) {
      throw new Error(`Error fetching location areas: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    }
  }

  async fetchLocation(locationName: string): Promise<LocationArea> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.cache.get<LocationArea>(url);

    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const locationArea: LocationArea = await response.json();
      this.cache.add<LocationArea>(url, locationArea);

      return locationArea;
    } catch (err) {
      throw new Error(`Error fetching location area details: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.cache.get<Pokemon>(url);

    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const pokemon: Pokemon = await response.json();
      this.cache.add<Pokemon>(url, pokemon);

      return pokemon;
    } catch (err) {
      throw new Error(`Error fetching pokemon: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    }
  }
}

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: NamedApiResource;
  }[];
  types: { type: NamedApiResource }[];
};

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
