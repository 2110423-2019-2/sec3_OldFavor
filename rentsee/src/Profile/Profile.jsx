import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import utils from "../utils.js";
import FormInput from "../Components/FormInput";
import Header from "../Components/Header"

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      drivingLisense: "",
      email: "",
      bankAccountNumber: "",
      address: "",
      phoneNumber: "",
      creditCardNumber: ""
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("http://rentsee.krist7599555.ml/api/profile", {
      method: "GET",
      headers: utils.authHeader()
    })
      .then(response => {
        return response.json();
      })
      .then(resJson => {
        console.log(resJson);
        this.setState({
          username: resJson.username,
          password: resJson.password,
          drivingLisense: resJson.drivingLisense,
          email: resJson.email,
          bankAccountNumber: resJson.bankAccountNumber,
          address: resJson.address,
          phoneNumber: resJson.phoneNumber,
          creditCardNumber: resJson.creditCardNumber
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch("http://rentsee.krist7599555.ml/api/users/me", {
      method: "PATCH",
      headers: utils.authHeader(),
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        drivingLisense: this.state.drivingLisense,
        email: this.state.email,
        bankAccountNumber: this.state.bankAccountNumber,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        creditCardNumber: this.state.creditCardNumber
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
  render() {
    return (
      <div className="container-fluid full-screen" >
        <div className="col">
          <div className="row">
            <Header/>
          </div>
        </div>
        <div className="col">
          <h1 className="mb-4">Edit Profile</h1>
        </div>

        <div className="col-lg-6 col-md-6 col-xs-4 h-100 d-flex">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col">
                <p> Username</p>
                <FormInput
                  name="username"
                  handleFormChange={this.handleFormChange}
                  value={this.state.username}
                  placeholder="Username"
                  icon="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"
                />
              </div>
              <div className="col">
                <p>Password</p>
                <FormInput
                  name="password"
                  type="password"
                  width="200px"
                  handleFormChange={this.handleFormChange}
                  value={this.state.password}
                  placeholder="Password"
                  icon="M10 17c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm2-7v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.795-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z"
                />
              </div>
            </div>
            <hr/>
            <p>E-mail</p>
            <div className="input-with-icon mt-4">
              <input
                className="form-control"
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleFormChange}
              />
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#C4C4C4"
                >
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                </svg>
              </i>
            </div>
            <p style={{padding:"20px 0px 0px 0px"}}>Driving Lisense</p>
            <div className="input-with-icon mt-4">
              <input
                className="form-control"
                type="text"
                name="drivingLisense"
                placeholder="DrivingLisense"
                value={this.state.drivingLisense}
                onChange={this.handleFormChange}
              />
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#C4C4C4"
                >
                  <path d="M22 5v14h-20v-14h20zm2-2h-24v18h24v-18zm-10 13.597v.403h-10v-.417c-.004-1.112.044-1.747 1.324-2.043 1.403-.324 2.787-.613 2.122-1.841-1.973-3.637-.563-5.699 1.554-5.699 2.077 0 3.521 1.985 1.556 5.699-.647 1.22.688 1.51 2.121 1.841 1.284.297 1.328.936 1.323 2.057zm6-9.597h-4v2h4v-2zm0 4h-4v2h4v-2zm0 4h-4v2h4v-2z"/>
                </svg>
              </i>
            </div>
            <p style={{padding:"20px 0px 0px 0px"}}>Bank Account Number</p>
            <div className="input-with-icon mt-4">
              <input
                className="form-control"
                type="text"
                name="bankAccountNumber"
                placeholder="BankAccountNumber"
                value={this.state.bankAccountNumber}
                onChange={this.handleFormChange}
              />
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#C4C4C4"
                >
                  <path d="M7 21h-4v-11h4v11zm7-11h-4v11h4v-11zm7 0h-4v11h4v-11zm2 12h-22v2h22v-2zm-23-13h24l-12-9-12 9z" />
                </svg>
              </i>
            </div>
            <p style={{padding:"20px 0px 0px 0px"}}>Address</p>
            <div className="input-with-icon mt-4">
              <input
                className="form-control"
                type="text"
                name="address"
                placeholder="Address"
                value={this.state.address}
                onChange={this.handleFormChange}
              />
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#C4C4C4"
                >
                  <path d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 6h-3.135c-.385.641-.798 1.309-1.232 2h3.131l.5 1h-4.264l-.344.544-.289.456h.558l.858 2h-7.488l.858-2h.479l-.289-.456-.343-.544h-2.042l-1.011-1h2.42c-.435-.691-.848-1.359-1.232-2h-3.135l-4 8h24l-4-8zm-12.794 6h-3.97l1.764-3.528 1.516 1.528h1.549l-.859 2zm8.808-2h3.75l1 2h-3.892l-.858-2z"/>
                </svg>
              </i>
            </div>
            <p style={{padding:"20px 0px 0px 0px"}}>Phone Number</p>
            <div className="input-with-icon mt-4">
              <input
                className="form-control"
                type="text"
                name="phoneNumber"
                placeholder="PhoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleFormChange}
              />
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#C4C4C4"
                >
                  <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
                </svg>
              </i>
            </div>
            <p style={{padding:"20px 0px 0px 0px"}}>Creditcard Number</p>
            <div className="input-with-icon mt-4">
              <input
                className="form-control"
                type="text"
                name="creditCardNumber"
                placeholder="CreditcardNumber"
                value={this.state.creditCardNumber}
                onChange={this.handleFormChange}
              />
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#C4C4C4"
                >
                  <path d="M22 2h-14c-1.104 0-2 .896-2 2v4h16v3.5c0 .276-.224.5-.5.5h-1.5v2h2c1.104 0 2-.896 2-2v-8c0-1.104-.896-2-2-2zm0 3h-14v-.5c0-.276.224-.5.5-.5h13c.276 0 .5.224.5.5v.5zm-6 5h-14c-1.104 0-2 .896-2 2v8c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2v-8c0-1.104-.896-2-2-2zm-11 10h-2v-1h2v1zm3 0h-2v-1h2v1zm.32-3.377c-.383.239-.836.377-1.32.377-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5c.484 0 .937.138 1.32.377-.531.552-.857 1.3-.857 2.123 0 .824.326 1.571.857 2.123zm3.68 3.377h-2v-1h2v1zm-1-3c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm4 3h-2v-1h2v1z" />
                </svg>
              </i>
            </div>
            <input
              className="btn mt-4 d-flex"
              type="submit"
              value="Edt Profile"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
