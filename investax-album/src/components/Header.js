import React from 'react'
import Toolbar from './Toolbar'

function Header ({ toggleModal }) {
  return (
    <header className='header'>
      <h1>Photos</h1>
      <Toolbar toggleModal={toggleModal} />
    </header>
  )
}

export default Header
