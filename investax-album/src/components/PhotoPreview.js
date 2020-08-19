import React, { useEffect, useState } from 'react'
import Photo from './Photo'

function PhotoPreview ({ data }) {
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    const objectURL = URL.createObjectURL(data.raw)
    setPreview(objectURL)

    return () => {
      URL.revokeObjectURL(objectURL)
    }
  }, []) // eslint-disable-line

  return <Photo data={{ ...data, raw: preview }} />
}

export default PhotoPreview
