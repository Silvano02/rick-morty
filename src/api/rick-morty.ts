import axios, { AxiosError } from 'axios'
import { Character, Episode, Info } from 'rickmortyapi/dist/interfaces'

export const baseURL = 'https://rickandmortyapi.com/api'

export interface CharactersFilter {
  name?: string
  status?: 'Alive' | 'Dead' | 'unknown'
  species?: string
  gender?: string
}

export const rickMortyApi = axios.create({
  baseURL
})

export const getEpisodes = async () => {
  const { data } = await rickMortyApi.get<Info<Episode[]>>('/episode')
  return data
}

export const getEpisode = async (id: number) => {
  const { data } = await rickMortyApi.get<Episode>(`/episode/${id}`)
  return data
}

export const getEpisodeID = (episode: string) => {
  return parseInt(episode.replace(`${baseURL}/episode/`, ''))
}

export const getCharacters = async (
  page: number,
  {
    name,
    status,
    species,
    gender
  }: { name?: string; status?: string; species?: string; gender?: string }
) => {
  try {
    const { data } = await rickMortyApi.get<Info<Character[]>>('/character', {
      params: {
        page,
        name,
        status,
        species,
        gender
      }
    })
    return data
  } catch (error) {
    return undefined
  }
}

export const getPageId = (pageUrl: string): number => {
  return parseInt(pageUrl.replace(`${baseURL}/character?page=`, ''))
}
