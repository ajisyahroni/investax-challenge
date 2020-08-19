import React, { useState } from 'react'
import PhotoGrid from './PhotoGrid'
import Header from './Header'
import Modal from './Modal'

function Photos () {
  const [showModal, setShowModal] = useState(false)
  const toggleShowModal = () => setShowModal(v => !v)

  return (
    <div className='app'>
      <Header toggleModal={toggleShowModal} />
      <PhotoGrid />
      <Modal show={showModal} toggleShow={toggleShowModal} />
    </div>
  )
}

export default Photos
