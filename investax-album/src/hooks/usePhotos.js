import { useContext } from 'react'
import { PhotosDispatchContext, PhotosStateContext } from '../state/context'
import * as actions from '../state/actions'

function usePhotosState () {
  const context = useContext(PhotosStateContext)

  if (context === undefined) {
    throw new Error('usePhotosState must be used inside of PhotosProvider')
  }

  return context
}

function usePhotosDispatch () {
  const context = useContext(PhotosDispatchContext)

  if (context === undefined) {
    throw new Error('usePhotosDispatch must be used inside of PhotosProvider')
  }

  return context
}

export function usePhotos () {
  const state = usePhotosState()
  const dispatch = usePhotosDispatch()

  return {
    state,
    togglePhoto: (id) => dispatch(actions.togglePhoto(id)),
    resetSelection: () => dispatch(actions.resetSelection()),
    setPhotosPerPage: (count) => dispatch(actions.setPhotosPerPage(count))
  }
}
