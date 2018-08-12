import React from 'react'

const CocktailDisplay = (props) => {

  return (
    <div id="cocktail-display">
      <h1>{props.cocktail ? props.cocktail.name : null}</h1>
      <h3>{props.cocktail ? props.cocktail.description : null}</h3>
      <p>{props.cocktail ? props.cocktail.instructions : null}</p>
      <h3>Ingredients</h3>
      <ul>{props.proportions.map(item => <li key={item.id}><strong>{item.amount}</strong> {item.ingredient_name}</li>)}</ul>
    </div>
  )
}

export default CocktailDisplay
