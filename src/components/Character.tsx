import { useState } from 'react'
import { Character as Char } from '../graphql/rick-morty'
import { firstLetterToUpperCase } from '../utilities/'

interface CharacterProps {
  character: Char
  filterSet: React.Dispatch<React.SetStateAction<{}>>
}
const Character = ({ character, filterSet }: CharacterProps) => {
  const [imgLoaded, imgLoadedSet] = useState(false)

  const { name, species, image, status, gender, location, episode } = character

  return (
    <div className="flex flex-col border border-lime-800 rounded-xl bg-gray-900 w-full">
      {!imgLoaded && (
        <div className="w-auto aspect-square bg-gray-700 rounded-t-xl animate-pulse"></div>
      )}
      <img
        className={`w-full aspect-square rounded-t-xl ${
          !imgLoaded ? 'hidden' : ''
        }`}
        src={image}
        onLoad={() => imgLoadedSet(true)}
      />

      <div className="p-4 text-white">
        <h2 className="text-lg xl:text-2xl text-lime-500">{name}</h2>
        <label className="text-gray-400">Status:</label>
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full flex ${
              status === 'Alive' ? 'bg-green-500' : 'bg-gray-600'
            } `}
          ></div>
          <div
            className="hover:underline hover:cursor-pointer"
            onClick={() =>
              filterSet(v => {
                return { ...v, status: status }
              })
            }
          >
            {firstLetterToUpperCase(status)}
          </div>
        </div>
        <label className="text-gray-400">Species:</label>
        <div
          className="hover:underline hover:cursor-pointer"
          onClick={() =>
            filterSet(v => {
              return { ...v, species: species }
            })
          }
        >
          {species}
        </div>
        <label className="text-gray-400">Gender:</label>
        <div
          title="Gender"
          className="hover:underline hover:cursor-pointer"
          onClick={() =>
            filterSet(v => {
              return { ...v, gender: gender }
            })
          }
        >
          {gender === 'unknown' ? 'Unknown' : gender}
        </div>
        <label className="text-gray-400">First seen in:</label>
        <div>{episode[0].name}</div>
        <label className="text-gray-400">Location:</label>
        <div>{location.name}</div>
      </div>
    </div>
  )
}

export default Character
