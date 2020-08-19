import * as actions from './actions'

export const photosPerPage = [5, 10, 25, 50, 100, 250, 500]

export const initialState = {
  selected: [],
  photosPerPage: 10
}

export function photosReducer (state, action) {
  switch (action.type) {
    case actions.togglePhoto().type: {
      const photoId = action.payload
      let nextSelected

      if (state.selected.indexOf(photoId) === -1) {
        nextSelected = [...state.selected, photoId]
      } else {
        nextSelected = state.selected.filter(id => id !== photoId)
      }

      return {
        ...state,
        selected: nextSelected
      }
    }

    case actions.setPhotosPerPage().type: {
      const { payload } = action
      let nextPerPage

      if (photosPerPage.includes(payload)) {
        nextPerPage = payload
      } else {
        nextPerPage = 10
      }

      return {
        ...state,
        photosPerPage: nextPerPage
      }
    }

    case actions.resetSelection().type:
      return {
        ...state,
        selected: []
      }

    default:
      throw new Error(`Unsupported action ${action.type}`)
  }
}
