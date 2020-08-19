import React, { createContext, useReducer } from 'react'
import { initialState, photosReducer } from './reducer'

export const PhotosStateContext = createContext()
export const PhotosDispatchContext = createContext()

export function PhotosProvider ({ children }) {
  const [state, dispatch] = useReducer(photosReducer, initialState)

  return (
    <PhotosStateContext.Provider value={state}>
      <PhotosDispatchContext.Provider value={dispatch}>
        {children}
      </PhotosDispatchContext.Provider>
    </PhotosStateContext.Provider>
  )
}
