import React from 'react'

function Photo ({ data, onLoad }) {
  return (
    <section className='photo'>
      <div className='photo__image-wrapper'>
        <img className='photo__image' src={data.raw} alt='' />
      </div>
      <strong className='photo__name'>{data.name}</strong>
      <small className='photo__album'>{data.album}</small>
    </section>
  )
}

export default Photo
