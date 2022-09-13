import { SetStateAction } from 'react'
import { CharactersFilter } from '../api/rick-morty'
import { firsLetterToUpperCase } from '../utilities'

interface FiltersBarProps {
  filter: CharactersFilter
  useFilter: React.Dispatch<SetStateAction<CharactersFilter>>
}

const FiltersBar = ({ filter, useFilter }: FiltersBarProps) => {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4">
      {Object.keys(filter).map(key => {
        const currentValue = filter[key as keyof CharactersFilter]
        if (key !== 'name' && currentValue !== undefined) {
          return (
            <div
              key={key}
              className="bg-gray-900 px-3 rounded-xl w-fit text-lime-500 hover:cursor-pointer"
              onClick={() =>
                useFilter(v => {
                  return { ...v, [key]: undefined }
                })
              }
            >
              {`${firsLetterToUpperCase(key)}: ${firsLetterToUpperCase(
                currentValue
              )} x`}
            </div>
          )
        }
      })}
    </div>
  )
}

export default FiltersBar
