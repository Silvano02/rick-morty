import Character from './Character'
import { Character as Cha, Info } from '../graphql/rick-morty'
import { Fragment } from 'react'
import 'react-pagination-bar/dist/index.css'

interface CharactersProps {
  characters: Info<Cha[]>
  isLoading: boolean
  isError: boolean
  useFilter: React.Dispatch<React.SetStateAction<{}>>
}

const Characters = ({
  characters,
  isLoading,
  isError,
  useFilter
}: CharactersProps) => {
  return (
    <div
      className="flex flex-col justify-center pt-4 px-10 lg:px-20 xl:px-30 md:grid 
      md:grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {isLoading ? (
        <CharactersSkeleton />
      ) : isError ? (
        <div className="text-lime-500 text-lg">No results</div>
      ) : (
        characters?.results?.map((character: Cha) => (
          <Character
            character={character}
            filterSet={useFilter}
            key={character.id}
          />
        ))
      )}
    </div>
  )
}

const CharactersSkeleton = () => {
  return (
    <Fragment>
      {Array.from({ length: 20 }).map((_, index) => {
        return (
          <div
            key={index}
            className="flex flex-col border border-lime-800 rounded-xl bg-gray-900 w-full"
          >
            <div className="w-auto aspect-square bg-gray-700 rounded-t-xl animate-pulse"></div>
            <div className="w-auto h-48 m-4"></div>
          </div>
        )
      })}
    </Fragment>
  )
}

export default Characters
