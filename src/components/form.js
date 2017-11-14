import React, { Component } from 'react';
import request from 'superagent';
import Web3 from 'web3';

let ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))
let peopleContractABI = [
  { "constant":true,"inputs":[],
    "name":"getPeople","outputs":[
      {"name":"","type":"bytes32[]"},
      {"name":"","type":"bytes32[]"},
      {"name":"","type":"uint256[]"}
    ],
    "payable":false,
    "type":"function"
  },
  {"constant":false,"inputs":[
      {"name":"_firstName","type":"bytes32"},
      {"name":"_lastName","type":"bytes32"},
      {"name":"_age","type":"uint256"}
    ],
    "name":"addPerson",
    "outputs":[{"name":"success","type":"bool"}],
    "payable":false,"type":"function"},
    {"constant":true,"inputs":[
      {"name":"","type":"uint256"}
    ],
    "name":"people",
    "outputs":[
      {"name":"firstName","type":"bytes32"},
      {"name":"lastName","type":"bytes32"},
      {"name":"age","type":"uint256"}
    ],
    "payable":false,
    "type":"function"
  }
];
let peopleContractAddress = '0xddff46dc8686cc18c40489e56b2443a897ed6bd8';
let peopleContract = ETHEREUM_CLIENT.eth.contract(peopleContractABI).at(peopleContractAddress);

class Form extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName: '',
      lastName: '',
      age: 0,
    }
    this.handleTextChange=this.handleTextChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleTextChange = (event) => {
    event.preventDefault();
    if (this.state[event.target.id] !== undefined){
      this.setState({[event.target.id]: event.target.value});
    }
  }
  handleSubmit = (event) => {
    var payload = JSON.stringify(this.state);
    console.log(payload);
  }

  render() {
    const formStyle = {
      "backgroundColor": "deepskyblue",
      "flexGrow": 1,
    };
    return (
      <div className="form" style={formStyle}>
        <form>
          <label>
            First Name:
            <input id="firstName" onChange={this.handleTextChange} type="text" value={this.state.userName}/>
          </label>
          <hr/>
          <label>
            Last Name:
            <input id="lastName" onChange={this.handleTextChange} type="text" value={this.state.songArtist}/>
          </label>
          <hr />
          <label>
            Age:
            <input id="age" onChange={this.handleTextChange} type="text" value={this.state.songTitle}/>
          </label>
          <hr />
          <input id="submit" type="button" value="Submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    );
  }
}

export default Form;
