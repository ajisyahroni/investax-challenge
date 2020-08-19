import React from 'react'
import usePhotosList from '../hooks/usePhotosList'

function Pagination () {
  const { fetchMore, status, canFetchMore, isFetchingMore } = usePhotosList()
  const handleFetchMore = () => fetchMore()

  let content = canFetchMore
    ? <button className='button' onClick={handleFetchMore}>Load More</button>
    : <div>You're up to date...</div>

  if (status === 'loading' || isFetchingMore) {
    content = <div>Loading...</div>
  }

  return (
    <div className='pagination'>
      {content}
    </div>
  )
}

export default Pagination
