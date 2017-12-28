import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';
import Form from './components/form.js';

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))
let peopleContractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "getPeople",
      "outputs": [
        {
          "name": "",
          "type": "bytes32[]"
        },
        {
          "name": "",
          "type": "bytes32[]"
        },
        {
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "type": "function",
      "stateMutability": "view"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_firstName",
          "type": "bytes32"
        },
        {
          "name": "_lastName",
          "type": "bytes32"
        },
        {
          "name": "_age",
          "type": "uint256"
        }
      ],
      "name": "addPerson",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function",
      "stateMutability": "nonpayable"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "people",
      "outputs": [
        {
          "name": "firstName",
          "type": "bytes32"
        },
        {
          "name": "lastName",
          "type": "bytes32"
        },
        {
          "name": "age",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function",
      "stateMutability": "view"
    }
  ];
let peopleContractAddress = '0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6';
let peopleContract = web3.eth.contract(peopleContractABI).at(peopleContractAddress);
web3.eth.defaultAccount = web3.eth.accounts[0];
let balance = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase)).toString();

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstNames: [],
      lastNames: [],
      ages: [],
    //  transactionTime: '',
    }
  }
  // updateTransactionTime()=>{
  //
  // }
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
          <td>{web3.toAscii(this.state.firstNames[index])}</td>
          <td>{web3.toAscii(this.state.lastNames[index])}</td>
          <td>{this.state.ages[index]}</td>
        </tr>
      )
    })

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>{"Aaron's Blockchain People Database Extrodinaire!"}</h3>
        </div>
        <div className="App-content">
          <p>{balance}</p>
          <Form updateTransactionTime={this.state.updateTransactionTime}/>
          <div className="App-table-div">
              <table className="App-table">
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
      </div>
    );
  }
}

export default App;
