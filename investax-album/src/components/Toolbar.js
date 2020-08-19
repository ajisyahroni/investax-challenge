import React, { useState } from 'react'
import { usePhotos } from '../hooks/usePhotos'
import SVGIcon from './SVGIcon'
import { useDeletePhotos } from '../hooks/useDeletePhotos'
import useClickOutside from '../hooks/useClickOutside'
import PhotosPerPageSelector from './PhotosPerPageSelector'

function Toolbar ({ toggleModal }) {
  const [menuVisible, setMenuVisible] = useState(false)
  const { state } = usePhotos()
  const ref = useClickOutside(() => {
    if (menuVisible) setMenuVisible(false)
  })
  const { deletePhotos, status } = useDeletePhotos()
  const handleDeletePhotos = () => deletePhotos(state.selected)
  const handleTriggerClick = () => setMenuVisible(v => !v)

  return (
    <div className='toolbar' ref={ref}>
      <div className='toolbar__trigger'>
        <button className='button' onClick={handleTriggerClick}>
          <SVGIcon name='more' />
        </button>
      </div>
      <div className={`toolbar__actions ${menuVisible ? 'visible' : ''}`}>
        {!!state.selected.length && (
          <>
            <button
              className='button'
              onClick={handleDeletePhotos}
              disabled={status === 'loading'}
            >
              <SVGIcon name='trash' />
              <span className='button__text'>
                {status === 'loading'
                  ? 'Deleting...'
                  : `Delete ${state.selected.length} photos`}
              </span>
            </button>
            <span className='button-divider' />
          </>
        )}
        <button className='button' onClick={toggleModal}>
          <SVGIcon name='upload' />
          <span className='button__text'>Upload</span>
        </button>
        <span className='button-divider' />
        <PhotosPerPageSelector />
      </div>
    </div>
  )
}

export default Toolbar
