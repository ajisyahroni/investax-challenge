import React from 'react'

function SVGIcon ({ name, size }) {
  return (
    <svg className='svg-icon' style={{ width: size, height: size }}>
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}

export default SVGIcon
