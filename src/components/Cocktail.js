import React from 'react'

const Cocktail = (props) => {
  return (
    <li onClick={() => props.handleClick(props.cocktail)}>{props.cocktail.name}</li>
  )
}

export default Cocktail
