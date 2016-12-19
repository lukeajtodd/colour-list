import React, { Component } from 'react';
import Card from './Card';
import CardAdder from './CardAdder';
import Overwrite from './Overwrite.js';
import './App.css';
import Rebase from 're-base';

const base = Rebase.createClass({
      apiKey: "AIzaSyCAm3V_uRmpMgfKb34cajkFcEUJBLb83XI",
      authDomain: "colour-list.firebaseapp.com",
      databaseURL: "https://colour-list.firebaseio.com",
      storageBucket: "colour-list.appspot.com",
      messagingSenderId: "59197291170"
});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCollection: {},
      collections: [],
      colours: []
    }
  }

  removeClick = (thisColour) => {
    const amendedColours = this.state.colours.filter((colour) => {
      if (thisColour !== colour) return colour
    });

    this.setState({
      colours: amendedColours
    });
  }

  submitHandler = (e, value) => {
    e.preventDefault();
    if (value.match(/^#(?:[0-9a-f]{3}){1,2}$/i) && value !== '' && value !== '#') {
      let tempArr = this.state.colours;
      tempArr.push(value);
      this.setState({
        colours: tempArr
      });
    };
  }

  saveCollection = (e, nameInput) => {
    e.preventDefault();
    if (this.state.colours.length < 1) return false;
    if (this.checkCollections(nameInput.value)) {
      return false;
    };
    let newColl = {
      name: nameInput.value,
      colours: this.state.colours
    }
    this.state.collections.push(newColl);
    base.post(`collections`, {
      data: this.state.collections
    });
  }

  checkCollections = (name) => {
    let exists = false;
    this.state.collections.filter((collection) => {
      if (collection.name === name) exists = true;
    });
    return exists;
  }

  loadCollection = (collection) => {
    this.setState({
      currentCollection: collection,
      colours: collection.colours
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
      let spanColor = collection.colours.map((color) => {
        return (<span key={Date.now() + Math.random() * Math.random()} style={Object.assign({ background: color }, spanBlobStyles)}></span>)
      });
      return (
        <div key={Date.now() + Math.random() * Math.random()} style={{ cursor: "pointer" }} onClick={() => {this.loadCollection(collection)}}>
          <div style={{background: "black", maxWidth: 70}}>
            {spanColor}
          </div>
          <li style={collectionStyles}>{collection.name}</li>
        </div>
      )
    });

    return (
      <div className="App">
        <div className={this.state.collections === '' ? 'hidden' : ''}>
          <div className="ContentCard CardCollections">
            <ul>{Collections}</ul>
          </div>
        </div>
        <div className="ContentCard CardInput">
          <CardAdder submit={this.submitHandler} save={this.saveCollection} clear={this.clearColours}/>
        </div>
        <div className="Cards">
          <h1>{this.state.currentCollection.name}</h1>
          {Cards}
        </div>
      <Overwrite />
      </div>
    );
  }
}
