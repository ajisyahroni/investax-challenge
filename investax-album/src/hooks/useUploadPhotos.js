import { useRef, useState } from 'react'
import { useMutation, queryCache } from 'react-query'
import { CancelToken } from 'axios'
import axios from '../axios'

export function useUploadPhotos () {
  const cancelUpload = useRef(null)
  const [progress, setProgress] = useState(-1)
  const [mutate] = useMutation(
    ({ files, album, onUploadProgress }) => {
      const source = CancelToken.source()
      const formData = new FormData() // eslint-disable-line

      formData.append('album', album)
      files.forEach(file => formData.append('documents', file, file.name))

      const promise = axios.put('/photos', formData, {
        cancelToken: source.token,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress
      })

      cancelUpload.current = () => {
        source.cancel('Upload cancelled!')
        setProgress(-1)
      }

      return promise
    },
    {
      onSuccess: () => queryCache.invalidateQueries('photos')
    }
  )

  function onUploadProgress (uploadEvent) {
    const progress = Math.round((uploadEvent.loaded * 100) / uploadEvent.total)
    setProgress(progress)
  }

  return {
    progress,
    cancelUpload: cancelUpload.current,
    reset: () => setProgress(-1),
    uploadPhotos: (args) => mutate({
      ...args,
      onUploadProgress
    })
  }
}
