import React from 'react'
import './App.css'
import Photos from './components/Photos'
import { PhotosProvider } from './state/context'
import { ReactComponent as SVGSprite } from './sprite.svg'

function App () {
  return (
    <>
      <PhotosProvider>
        <Photos />
      </PhotosProvider>
      <SVGSprite />
    </>
  )
}

export default App
