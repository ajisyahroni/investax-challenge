import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import PhotoPreview from './PhotoPreview'
import SVGIcon from './SVGIcon'
import { useUploadPhotos } from '../hooks/useUploadPhotos'
import AlbumSelector from './AlbumSelector'

function UploadPhotos () {
  const [files, setFiles] = useState([])
  const [album, setAlbum] = useState(null)
  const { progress, uploadPhotos, cancelUpload, reset } = useUploadPhotos()
  const dropzone = useDropzone({
    accept: 'image/*',
    onDrop: files => setFiles(files)
  })
  const containerClasses = ['upload-photos']
  let buttons = null
  let content = null

  function handleUpload () {
    uploadPhotos({ files, album })
  }

  function handleCancel () {
    cancelUpload()
  }

  function handleReset () {
    setFiles([])
    setAlbum(null)
    reset()
  }

  if (progress === 100) {
    containerClasses.push('upload-photos--loaded')
    content = (
      <div className='upload-photos__progress'>Successfully uploaded {files.length} photos</div>
    )
    buttons = (
      <button onClick={handleReset} className='button'>
        <span className='button__text'>Upload more</span>
      </button>
    )
  } else if (progress >= 0) {
    containerClasses.push('upload-photos--loading')
    content = (
      <div className='upload-photos__progress'>Ulpoading... {progress}%</div>
    )
    buttons = (
      <button onClick={handleCancel} className='button'>
        <span className='button__text'>Cancel</span>
      </button>
    )
  } else {
    content = (
      <>
        <div {...dropzone.getRootProps()} className='upload-photos__drop-area'>
          <input {...dropzone.getInputProps()} />
          {
            dropzone.isDragActive
              ? <p>Drop the files here ...</p>
              : <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
        {files.length
          ? (
            <div className='photo-grid small'>{files.map((file, index) => (
              <PhotoPreview
                key={index}
                data={{ raw: file, name: file.name }}
              />))}
            </div>
          )
          : <div className='upload-photos__empty'>No files selected...</div>}
      </>
    )
    buttons = (
      <>
        <AlbumSelector placeholder='Select album' onChange={(value) => setAlbum(value)} />
        <button onClick={handleUpload} className='button' disabled={!files.length || !album}>
          <SVGIcon name='upload' />
          <span className='button__text'>Upload</span>
        </button>
      </>
    )
  }

  return (
    <div className={containerClasses.join(' ')}>
      {content}
      <div className='upload-photos__actions'>
        {buttons}
      </div>
    </div>
  )
}

export default UploadPhotos
