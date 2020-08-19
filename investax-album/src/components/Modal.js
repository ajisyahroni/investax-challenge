import React, { useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import UploadPhotos from './UploadPhotos'
import SVGIcon from './SVGIcon'

const modalContainer = document.getElementById('modal')
const appContainer = document.getElementById('root')

function Modal ({ show, toggleShow }) {
  useLayoutEffect(() => {
    if (show) {
      appContainer.classList.add('modal-is-open')
    } else {
      appContainer.classList.remove('modal-is-open')
    }
  }, [show])

  if (!show) {
    return null
  }

  return createPortal(
    (
      <>
        <div className='modal__overlay' onClick={toggleShow} />
        <div className='modal__container'>
          <div className='modal__header'>
            <h2>Upload photos</h2>
            <span onClick={toggleShow}>
              <SVGIcon name='cancel' />
            </span>
          </div>
          <UploadPhotos />
        </div>
      </>
    ),
    modalContainer
  )
}

export default Modal
