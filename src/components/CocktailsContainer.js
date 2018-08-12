import React, { Component } from 'react'
import CocktailsList from './CocktailsList'
import CocktailDisplay from './CocktailDisplay'
import Form from './Form'

class CocktailsContainer extends Component {
  constructor() {
    super()
    //it would be optimal to not have cocktails in state, since they won't change!
    this.state = {
      cocktails: [],
      currentCocktail: null,
      //do i need this here?
      currentProportionsAndIngredients: [],
    }
  }
  //fetch all cocktails when document created
  componentDidMount() {
    this.fetchCocktails()
  }

  fetchCocktails = () => {
    fetch("http://localhost:3000/api/v1/cocktails")
    .then(r => r.json()).then(results => {
      this.setState({
        cocktails: results
      })
    })
  }

  setCurrentCocktail = (cocktailObj) => {
    this.setState({
      currentCocktail: cocktailObj
    }, this.getIngredientsForCurrentCocktail)
  }

  getIngredientsForCurrentCocktail = () => {
    //fetch the data for current cocktail, set current ingredients to be that!
    fetch(`http://localhost:3000/api/v1/cocktails/${this.state.currentCocktail.id}`).then(r => r.json())
    .then(cocktail => {
      this.setState({
        currentProportionsAndIngredients: cocktail.proportions
      })
    })
  }

  render(){
    return (
      <div className="container">
        <CocktailsList cocktails={this.state.cocktails} handleCocktailDisplay={this.setCurrentCocktail}/>

        <CocktailDisplay cocktail={this.state.currentCocktail} proportions={this.state.currentProportionsAndIngredients}/>
        
        <Form 
        updateCocktailList={this.fetchCocktails}
        displayNewCocktail={this.setCurrentCocktail}/>
      </div>
    )
  }
}

export default CocktailsContainer
