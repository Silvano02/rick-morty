import { useQuery } from '@tanstack/react-query'
import { getEpisodes } from '../api/rick-morty'

const Episodes = () => {
  const { data: episodes, isLoading } = useQuery(['episodes'], getEpisodes)

  return (
    <div className="flex flex-col gap-2">
      {isLoading
        ? 'Loading...'
        : episodes?.results.map((episode: any) => (
            <p className="border p-4 rounded-xl text-center hover:border-4 ">
              {episode.name}
            </p>
          ))}
    </div>
  )
}

export default Episodes
