import Character from './Character'
import { Character as Cha, Info } from 'rickmortyapi/dist/interfaces'
import { Fragment } from 'react'
import 'react-pagination-bar/dist/index.css'
import { Character as Char } from 'rickmortyapi/dist/interfaces'

interface CharactersProps {
  characters: Info<Char[]>
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
  const renderLoading = () => {
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

  return (
    <div
      className="flex flex-col justify-center pt-4 px-10 lg:px-20 xl:px-30 md:grid 
      md:grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {isLoading ? (
        renderLoading()
      ) : isError ? (
        <div className="text-lime-500 text-lg">No results</div>
      ) : (
        characters?.results?.map((character: Cha) => (
          <Character
            character={character}
            filterSet={useFilter}
            key={character.id}
          ></Character>
        ))
      )}
    </div>
  )
}

export default Characters
