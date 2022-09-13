import React from 'react'
import usePagination from '../hooks/usePagination'

export interface PageNavigationProps {
  totalCount: number
  pageSize: number
  currentPage: number
  onPageClick: React.Dispatch<React.SetStateAction<number>>
  error: boolean
  siblings?: number
}

const PageNavigation = ({
  totalCount,
  pageSize,
  currentPage,
  onPageClick,
  error,
  siblings = 4
}: PageNavigationProps) => {
  const pageCount = Math.ceil(totalCount / pageSize)

  const pageRange = usePagination(pageCount, currentPage, siblings)

  const leftArrowsClass =
    currentPage === 1 ? 'bg-zinc-900 text-green-700' : 'bg-gray-900'
  const rightArrowsClass =
    currentPage === pageCount ? 'bg-zinc-900 text-green-700' : 'bg-gray-900'

  if (error) return <div className="hidden"></div>

  if (totalCount === 0)
    return (
      <div className="flex justify-center pt-4 gap-2 text-gray-400 text-lg child:h-10 child:w-10 child:rounded-md child:bg-gray-900 child:animate-pulse">
        {Array.from({ length: siblings * 2 + 5 }).map((_, index) => {
          return <div key={index}></div>
        })}
      </div>
    )

  return (
    <div className="flex justify-center pt-4 gap-2 text-lime-400 text-lg child:h-10 child:w-10 child:rounded-md">
      <button className={leftArrowsClass} onClick={() => onPageClick(1)}>
        {'<<'}
      </button>
      <button
        className={leftArrowsClass}
        onClick={() => onPageClick(currentPage === 1 ? 1 : currentPage - 1)}
      >
        {' '}
        {'<'}{' '}
      </button>
      {pageRange.map((page, index) => {
        return (
          <button
            key={index}
            className={`bg-gray-900 ${
              page === currentPage ? 'bg-lime-700 text-lime-200' : ''
            }`}
            onClick={() => onPageClick(page)}
          >
            {page}
          </button>
        )
      })}
      <button
        className={rightArrowsClass}
        onClick={() =>
          onPageClick(currentPage === pageCount ? pageCount : currentPage + 1)
        }
      >
        {'>'}
      </button>
      <button
        className={rightArrowsClass}
        onClick={() => onPageClick(pageCount)}
      >
        {' '}
        {'>>'}{' '}
      </button>
    </div>
  )
}

export default PageNavigation
