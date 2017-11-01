import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';

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
let peopleContract = ETHEREUM_CLIENT.eth.contract(peopleContractABI).at(peopleContractAddress);

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
    var data = peopleContract.getPeople();
    this.setState({
      firstNames: String(data[0]).split(','),
      lastNames: String(data[1]).split(','),
      ages: String(data[2]).split(',')
    });
    console.log(typeof data);
    console.log(data);
  }

  render() {

    let TableRows = []

    _.each(this.state.firstNames, (value, index) => {
      TableRows.push(
        <tr key={index}>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.firstNames[index])}</td>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.lastNames[index])}</td>
          <td>{this.state.ages[index]}</td>
        </tr>
      )
    })

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>{"Aaron's Verson"}</h3>
        </div>
        <div className="App-content">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {TableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
