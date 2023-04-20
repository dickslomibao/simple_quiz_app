import React from 'react'

const ButtonComponents = ({label, onClick}) => {
  return (
    <button className='btn' value={label} onClick={onClick}>{label}</button>
  )
}

export default ButtonComponents