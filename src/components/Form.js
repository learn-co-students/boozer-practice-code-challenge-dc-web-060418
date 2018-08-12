import React, { Component } from 'react'

class Form extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      description: "",
      instructions: "",
      newProportions: [{ingredient_name: "", amount: ""}] //holds proportions objects
    }
  }

  handleChanges = (e) => {
    const property = e.target.name
    const value = e.target.value
    this.setState({
      [property]: value
    })
  }

  handleProportionChanges = (e) => {
    const property = e.target.name
    const value = e.target.value
    const i = e.target.id
    const newProportion = this.state.newProportions[i]
    
    
    newProportion[property] = value
    let newProportionArray = this.state.newProportions

    newProportionArray.splice(i, 1, newProportion)
    console.log(newProportionArray)
    this.setState({
        newProportions: [...newProportionArray]
      })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    //backend needs cocktails to be in one object and proportions to be in an array inside of cocktails obj.
    //proportions array should hold proportions object, each with a key of ingredient_name and amount
    //const newProportion = {ingredient_name: this.state.ingredient, amount: this.state.amount}
    const newCocktail = {
      name: this.state.name, 
      description: this.state.description, 
      instructions: this.state.instructions,
      proportions: this.state.newProportions
    }
    fetch("http://localhost:3000/api/v1/cocktails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"cocktail": newCocktail})
    }).then(r => r.json()).then(cocktailObj => {
      this.props.displayNewCocktail(cocktailObj)
      this.props.updateCocktailList()
      console.log(cocktailObj)
      //reset the state and form after submission
      
      this.setState({
        name: "",
        description: "",
        instructions: "",
        newProportions: [{ingredient_name: "", amount: ""}]
      })
    })
    e.target.reset()
  }

  addNewIngredientToForm = (e) => {
    e.preventDefault()
    const newProportion = {ingredient_name: "", amount: ""}
    this.setState({
      newProportions: [...this.state.newProportions, newProportion]
    })
  }

  generateProportionFields() {
    return (this.state.newProportions.map(proportion => {
      const index = this.state.newProportions.indexOf(proportion)
      return (<div className="container" key={index}>
          <p>Ingredient Name<br/>
          <input id={index} name="ingredient_name" type="text" onChange={this.handleProportionChanges}/>
          </p>

          <p>Quantity<br/>
          <input id={index} name="amount" type="text" onChange={this.handleProportionChanges}/>
          </p>
      </div>)
    }))
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Create a Cocktail</h3>

        <p>Name</p>
        <input name="name" type="text" onChange={this.handleChanges}/>

        <p>Description</p>
        <input name="description" type="text" onChange={this.handleChanges}/>

        <p>Instructions</p>
        <input name="instructions" type="text" onChange={this.handleChanges}/>

        <h3>Proportions</h3>
        {this.generateProportionFields()}

        <p><button onClick={this.addNewIngredientToForm}> + </button></p>

        <input type="submit"/>
      </form>
    )
  }
}

export default Form
