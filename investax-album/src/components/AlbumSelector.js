import React from 'react'
import Selector from './Selector'

const albums = ['Travel', 'Personal', 'Food', 'Nature', 'Other']

function AlbumSelector (props) {
  return (
    <Selector {...props} options={albums} />
  )
}

export default AlbumSelector
