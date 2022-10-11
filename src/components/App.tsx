import { useQuery } from '@apollo/client'
import { SetStateAction, useEffect, useState } from 'react'
import { GET_CHARACTERS, CharactersFilter } from '../graphql/rick-morty'
import Characters from './Characters'
import FiltersBar from './FiltersBar'
import PageNavigation from './PageNavigation'
import SearchBar from './SearchBar'

const App = () => {
  const [page, pageSet] = useState(1)
  const [filter, filterSet] = useState<CharactersFilter>({})
  const [search, searchSet] = useState('')

  const [siblings, siblingsSet] = useState<number>(
    Math.floor(window.innerWidth / 300)
  )

  function handleWindowSizeChange() {
    siblingsSet(Math.floor(window.innerWidth / 300))
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const useFilter = (
    val: CharactersFilter | SetStateAction<CharactersFilter>
  ) => {
    pageSet(1)
    filterSet(val)
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      pageSet(1)
      filterSet((val: CharactersFilter) => {
        return { ...val, name: search }
      })
    }, 500)

    return () => clearTimeout(delay)
  }, [search])

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { filter: { ...filter, name: search }, page }
  })

  const { characters } = data ? data : { characters: {} }

  return (
    <div className="flex flex-col gap-4 pt-6 pb-16 w-full">
      <div className="flex justify-center items-center">
        <img className="w-20" src="/portal.png"></img>
        <h1 className="text-3xl md:text-6xl font-bold text-lime-400">
          Rick and Morty Api
        </h1>
      </div>
      <SearchBar search={search} searchSet={searchSet} />
      <FiltersBar filter={filter} useFilter={useFilter} />
      <PageNavigation
        totalCount={characters.info?.count ? characters?.info?.count : 0}
        pageSize={20}
        currentPage={page}
        onPageClick={pageSet}
        error={error ? true : false}
        siblings={siblings}
      />
      <Characters
        characters={characters ? characters : {}}
        isLoading={loading}
        isError={error ? true : false}
        useFilter={useFilter}
      />
      <PageNavigation
        totalCount={characters?.info?.count ? characters?.info?.count : 0}
        pageSize={20}
        currentPage={page}
        onPageClick={pageSet}
        error={!!error}
        siblings={siblings}
      />
    </div>
  )
}

export default App
