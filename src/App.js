import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
  <div className="city-container">
    <div className="header">Header</div>
    <div className="content">
      <ul>
        <li>City: {props.city.City}</li>
        <li>Country: {props.city.Country}</li>
        <li>State: {props.city.State}</li>
      </ul>
    </div>
  </div>
  );
}


function ZipSearchField(props) {

  const handleInputChange = (value) => {
    if(value.length > 4) {
      fetch(`https://ctp-zip-api.herokuapp.com/zip/${value}`)
      .then(response => response.json())
      .then(cities => props.saveCities(cities))
    }
  }


  return (
  <div className="zip-input">
    <b>Zip Code:</b>
    <input onChange={(event) => handleInputChange(event.target.value)}/>
  </div>);
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cities: [],
    }
  }

  
  saveCities(cities) {
    this.setState({cities: cities})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField saveCities={(cities) => this.saveCities(cities)}/>
        <div>
          {!this.state.cities.length && <div>Empty</div>}
          {this.state.cities.map((city) => <City city={city}/>)}
        </div>
      </div>
    );
  }
}

export default App;
