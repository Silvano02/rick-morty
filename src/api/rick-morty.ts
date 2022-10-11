import axios, { AxiosError } from 'axios'
import { Character, Episode, Info } from 'rickmortyapi/dist/interfaces'

export interface CharactersFilter {
  name?: string
  status?: 'Alive' | 'Dead' | 'unknown'
  species?: string
  gender?: string
}

export const RICKMORTY_API_URL = import.meta.env.VITE_RICKMORTY_API_URL

export const rickMortyApi = axios.create({
  baseURL: RICKMORTY_API_URL
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
  return parseInt(episode.replace(`${RICKMORTY_API_URL}/episode/`, ''))
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
  return parseInt(pageUrl.replace(`${RICKMORTY_API_URL}/character?page=`, ''))
}
