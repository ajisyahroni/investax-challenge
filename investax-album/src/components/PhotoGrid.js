import React from 'react'
import Pagination from './Pagination'
import SelectablePhoto from './SelectablePhoto'
import usePhotosList from '../hooks/usePhotosList'
import Photo from './Photo'
import SVGIcon from './SVGIcon'

function PhotoGrid () {
  const photoList = usePhotosList()
  const { data, error, status } = photoList
  let content = null

  if (status === 'loading') {
    content = new Array(10)
      .fill(null)
      .map((_, index) => (
        <Photo
          key={index}
          data={{ name: '', raw: null }}
        />
      ))
  }

  if (data) {
    content = data
      .flatMap(({ documents }) => documents)
      .map(photo => (
        <SelectablePhoto
          key={`${photo.id}-${photo.title}`}
          data={photo}
        />
      ))
  }

  if (status === 'error') {
    return (
      <section className='error'>
        <div className='error__container'>
          <h2>
            <SVGIcon name='warning' size={30} />
            <span>Error</span>
          </h2>
          <p>{error.message || 'Ooops, something went wrong'}</p>
        </div>
        <button className='button' onClick={() => window.location.reload()}>
          <span className='button__text'>Reload page</span>
          <SVGIcon name='reload' />
        </button>
      </section>
    )
  }

  return (
    <>
      <div className='photo-grid'>
        {content}
      </div>
      <Pagination />
    </>
  )
}

export default PhotoGrid
