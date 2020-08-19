import React, { useEffect } from 'react'
import { queryCache } from 'react-query'
import Selector from './Selector'
import { photosPerPage } from '../state/reducer'
import { usePhotos } from '../hooks/usePhotos'

function PhotosPerPageSelector () {
  const { setPhotosPerPage, resetSelection, state } = usePhotos()
  const options = photosPerPage
  const handleChange = (value) => setPhotosPerPage(value)

  useEffect(() => {
    resetSelection()
    queryCache.invalidateQueries('photos')
  }, [state.photosPerPage]) // eslint-disable-line

  return (
    <Selector
      placeholder='Per page'
      onChange={handleChange}
      options={options}
    />
  )
}

export default PhotosPerPageSelector
