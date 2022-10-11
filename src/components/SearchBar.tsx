import { SetStateAction } from 'react'

interface SearchBarProps {
  search: string
  searchSet: React.Dispatch<SetStateAction<string>>
}

const SearchBar = ({ search, searchSet }: SearchBarProps) => {
  return (
    <div className="flex items-center bg-gray-900 rounded-xl mx-[20%] my-2">
      <input
        value={search}
        onChange={v => searchSet(v.target.value)}
        className="text-lime-500 rounded-xl bg-gray-900 w-full h-10 focus:outline-none px-4"
      />
      <svg
        fill="none"
        stroke="rgb(163 230 53)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        className="w-6 h-6 mx-2"
      >
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
  )
}

export default SearchBar
