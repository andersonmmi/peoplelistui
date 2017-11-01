import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

let ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
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
let peopleContractAddress = '0x7a7e1a11b22322418d670c6e1f984cf8f8f02d25';
let peopleContract = new ETHEREUM_CLIENT.eth.Contract(peopleContractABI,peopleContractAddress);

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstNames: [],
      lastNames: [],
      ages: []
    }
  }

  componentWillMount() {
    var data = peopleContract.methods.getPeople();
    this.setState({
      firstNames: String(data[0]).split(','),
      lastNames: String(data[1]).split(','),
      ages: String(data[2]).split(',')
    });
    console.log(typeof data);
    console.log(data);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="App-content">
          <pre>{this.state.firstNames}</pre>
          <pre>{this.state.lastNames}</pre>
          <pre>{this.state.ages}</pre>
        </div>
      </div>
    );
  }
}

export default App;
