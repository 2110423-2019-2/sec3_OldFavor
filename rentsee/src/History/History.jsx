import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import utils from "../utils.js";
import FormInput from "../Components/FormInput";
import Header from "../Components/Header";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyResult: [],
      historyValue: ''
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("https://hueco.ml/rentsee/api/profile", {
      method: "GET",
      headers: utils.authHeader()
    })
      .then(response => {
        return response.json();
      })
      .then(resJson => {
        console.log(resJson);
        this.setState({
          
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch("https://hueco.ml/rentsee/api/users/me", {
      method: "PATCH",
      headers: utils.authHeader(),
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        fullName: this.state.fullname,
        dateOfBirth: this.state.dateOfBirth,
        phoneNumber: this.state.phoneNumber,
        drivingLisense: this.state.drivingLisense,
        address: this.state.address,
        
        bankOwner:this.state.bankOwner,
        bankAccountNumber: this.state.bankAccountNumber,
        
        creditCardName:this.state.creditCardName,
        creditCardNumber: this.state.creditCardNumber,
        creditCardEXP_M:this.state.creditCardEXP_M,
        creditCardEXP_Y:this.state.creditCardEXP_Y,
        creditCardPas:this.state.creditCardPas,

        emailVerified: this.state.emailVerified,
        licenseVerified: this.state.lisenseVerified

      })
    })
      .then(response => {
        if (response.status === 200) {
          alert("Profile Updated");
          //return response.json();
        } else {
          alert("Request is fucked up");
        }
      })
      .catch(error => {
        console.log("error: ", error);
      });
  }
  handleFormChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("change: " + [name] + " " + value);
    this.setState({ [name]: value });
  }
  handleFormChangeWithValidate(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("change: " + [name] + " " + value);
    this.setState({ [name]: value });
    if(this.state.emailVerified == false){
      
    }
    else{

    }
  }
  render() {
    return (
      <div className="container-fluid full-screen" >
        <Header />
        <div className="row mb-4"></div>
        <div className="row mb-4"></div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col">
            <h1 className="ml-0">Rental History</h1>
          </div>
          <div className="col"></div>
          <div className="col-2"></div>
        </div>
        <div className="row mb-4"></div>
        </div>
    );
  }
}

export default withRouter(Profile);
