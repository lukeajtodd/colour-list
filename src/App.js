import React, { Component } from 'react';
import Card from './Card';
import CardAdder from './CardAdder';
import './App.css';
import Rebase from 're-base';

const base = Rebase.createClass({
      apiKey: "AIzaSyCAm3V_uRmpMgfKb34cajkFcEUJBLb83XI",
      authDomain: "colour-list.firebaseapp.com",
      databaseURL: "https://colour-list.firebaseio.com",
      storageBucket: "colour-list.appspot.com",
      messagingSenderId: "59197291170"
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      colours: []
    }
  }

  removeClick = (thisColour) => {
    const amendedColours = this.state.colours.filter((colour) => {
      if (thisColour != colour) return colour
    });

    this.setState({
      colours: amendedColours
    });
  }

  submitHandler = (e, value) => {
    e.preventDefault();
    if (value.match(/^#(?:[0-9a-f]{3}){1,2}$/i) && value != '' && value != '#') {
      let tempArr = this.state.colours;
      tempArr.push(value);
      this.setState({
        colours: tempArr
      });
    };
  }

  saveCollection = (e) => {
    e.preventDefault();
    this.state.collections.push(this.state.colours);
    base.post(`collections`, {
      data: this.state.collections
    });
  }

  loadCollection = (collectionToLoad) => {
    this.setState({
      colours: collectionToLoad
    });
  }

  clearColours = (e) => {
    e.preventDefault();
    this.setState({
      colours: []
    });
  }

  componentWillMount() {
    base.syncState(`colours`, {
      context: this,
      state: 'colours',
      asArray: true
    });

    base.syncState(`collections`, {
      context: this,
      state: 'collections',
      asArray: true
    });
  }

  render() {

    let i = 1;

    const collectionStyles = {
      padding: 5,
      margin: 5
    }

    const spanBlobStyles = {
      display: "inline-block",
      width: 10,
      height: 10
    }

    const Cards = this.state.colours.map((colour) => {
      return (<Card key={Date.now() + Math.random()} color={colour} removeClick={this.removeClick}/>)
    });

    const Collections = this.state.collections.map((collection) => {
      let spanColor = collection.map((color) => {
        return (<span key={Date.now() + Math.random() * Math.random()} style={Object.assign({ background: color }, spanBlobStyles)}></span>)
      });
      return (
        <div style={{ cursor: "pointer" }} onClick={() => {this.loadCollection(collection)}}>
          <div style={{background: "black", maxWidth: 70}}>
            {spanColor}
          </div>
          <li style={collectionStyles}>Coll. {i++}</li>
        </div>
      )
    });

    return (
      <div className="App">
        <div className={this.state.collections == '' ? 'hidden' : ''}>
          <div className="ContentCard CardCollections">
            <ul>{Collections}</ul>
          </div>
        </div>
        <div className="ContentCard CardInput">
          <CardAdder submit={this.submitHandler} save={this.saveCollection} clear={this.clearColours}/>
        </div>
        <div className="Cards">
          {Cards}
        </div>
      </div>
    );
  }
}

export default App;
