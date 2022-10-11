import { gql } from '@apollo/client'

export interface CharactersFilter {
  name?: string
  status?: 'Alive' | 'Dead' | 'unknown'
  species?: string
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown'
}

interface Location {
  name: string
}

interface Episode {
  name: string
}

export interface Info<T> {
  results: T
  info: {
    count: number
    pages: number
  }
}

export interface Character {
  id: string
  name: string
  species: string
  status: 'Alive' | 'Dead' | 'unknown'
  image: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  location: Location
  episode: Episode[]
}

export const GET_CHARACTERS = gql`
  query GetCharacters($filter: FilterCharacter, $page: Int) {
    characters(filter: $filter, page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        gender
        image
        episode {
          name
        }
        location {
          name
        }
      }
    }
  }
`
