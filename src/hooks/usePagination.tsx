import { useMemo } from 'react'

function usePagination(
  pageCount: number,
  currentPage: number,
  siblings: number
) {
  const paginationRange = useMemo(() => {
    if (pageCount !== 0 && currentPage > pageCount)
      throw new Error('Current page is higher than page count')

    const rangeStart =
      pageCount < siblings * 2 + 1
        ? 1
        : currentPage > pageCount - siblings
        ? pageCount - siblings * 2
        : currentPage > siblings + 1
        ? currentPage - siblings
        : 1

    const rangeEnd =
      pageCount < siblings * 2 + 1
        ? pageCount
        : currentPage < siblings + 2
        ? siblings * 2 + 1
        : currentPage < pageCount - (siblings + 1)
        ? currentPage + siblings
        : pageCount

    return range(rangeStart, rangeEnd)
  }, [pageCount, currentPage, siblings])

  return paginationRange
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start)
}

export default usePagination
