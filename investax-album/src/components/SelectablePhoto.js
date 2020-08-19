import React from 'react'
import { usePhotos } from '../hooks/usePhotos'
import Photo from './Photo'
import SVGIcon from './SVGIcon'

function SelectablePhoto ({ data }) {
  const { togglePhoto, state } = usePhotos()
  const selected = state.selected.includes(data.id)
  const selection = !!state.selected.length

  function handleClick () {
    togglePhoto(data.id)
  }

  return (
    <div
      className='selectable-photo'
      style={{ opacity: getOpacity(selected, selection) }}
      onClick={handleClick}
    >
      {selected && (
        <div className='selectable-photo__checkbox'>
          <SVGIcon name='check' size={12} />
        </div>
      )}
      <Photo data={data} />
    </div>
  )
}

function getOpacity (selected, selection) {
  if (!selection) return 1
  return selected ? 1 : 0.5
}

export default SelectablePhoto
