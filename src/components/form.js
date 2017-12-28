import React, { Component } from 'react';
import Web3 from 'web3';

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
// let addPersonInstance = '';
web3.eth.defaultAccount = web3.eth.accounts[0];
// defaultAccount = web3.eth.defaultAccount;

class Form extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName: '',
      lastName: '',
      age: '',
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
    var payload1 = web3.fromAscii(this.state.firstName,32);
    var payload2 = web3.fromAscii(this.state.lastName,32);
    var payload3 = web3.toBigNumber(this.state.age);
    var payload = ("'" + payload1 + "','" + payload2 + "',"+ payload3);
    console.log(payload);
    console.log(web3.eth.defaultAccount);
    peopleContract.addPerson(payload1, payload2, payload3, {from: web3.eth.accounts[0], gas: 3000000})
    // .then(function(result){
    //   console.log(result);
    // });
    this.setState({
      firstName: '',
      lastName: '',
      age: '',
    });
    // this.props.updateTransactionTime();
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
            <input id="firstName" onChange={this.handleTextChange} type="text" value={this.state.firstName}/>
          </label>
          <hr/>
          <label>
            Last Name:
            <input id="lastName" onChange={this.handleTextChange} type="text" value={this.state.lastName}/>
          </label>
          <hr />
          <label>
            Age:
            <input id="age" onChange={this.handleTextChange} type="text" value={this.state.age}/>
          </label>
          <hr />
          <input id="submit" type="button" value="Submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    );
  }
}

export default Form;
