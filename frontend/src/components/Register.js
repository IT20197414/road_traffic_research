import React from 'react';
import '../App.css';
import swal from 'sweetalert';
import axios from 'axios';

const initialState = {
    id: "",
    fname: "",
    fnameError: "",
    lname: "",
    lnameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    cPassword: "",
    cPasswordError: ""
}

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        if(localStorage.getItem('usertype')==='admin'){
            window.location.href = "/admin";
        }else if(localStorage.getItem('usertype')==='seller'){
            window.location.href = "/seller";
        }else if(localStorage.getItem('usertype')==='user'){
            window.location.href = "/user";
        }
    }

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    onClear(){
        this.setState(initialState);
    }

    validation = async() => {

        let fnameError = "";
        let lnameError = "";
        let emailError = "";
        let passwordError = "";
        let cPasswordError = "";

        if(!this.state.fname){
            fnameError="First Name Required!"
        }

        if(!this.state.lname){
            lnameError="Last Name Required!"
        }

        if(!this.state.email){
            emailError="Email Required!"
        }

        if(!this.state.password){
            passwordError="Password Required!"
        }

        if(!this.state.cPassword){
            cPasswordError="Confirm Password Required!"
        }

        if(this.state.cPassword!==this.state.password){
          cPasswordError="Password & Confirm Password Not Match!"
      }

        if( fnameError|| lnameError || emailError || passwordError || cPasswordError){
            
            await this.setState({ fnameError , lnameError , emailError , passwordError , cPasswordError });
            
            return false;

        }else{

            await this.setState({ fnameError , lnameError , emailError , passwordError , cPasswordError });
            return true;
            
        }

    }

    SubmitForm = async(e) => {
        e.preventDefault();
        if(await this.validation()){
          console.log(this.state);
          const url = 'http://localhost:3500/user/';
          const data = JSON.stringify({ fname: this.state.fname , lname: this.state.lname , email: this.state.email ,  password: this.state.password });
          console.log(data);
          await axios.post(url,data,{
              headers: {'Content-Type': 'application/json'}
          })
          .then(res => {
              console.log(res.data);
              this.setState(initialState)
              swal("Success!", "Add Successful!", "success")
          })
        }
    }

    render (){
        return (
            <div class="container">
            <div className="col-lg-12">
            <br/><br/>
            <div class="card justify-content-center">
                    <h1>Register</h1>
                    <div class="x_scroll">
                    <hr/>
                        <form autoComplete="off" onSubmit={this.SubmitForm}>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">First Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="fname" value={this.state.fname} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.fnameError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Last Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="lname" value={this.state.lname} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.lnameError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Email</label>
                            <div class="col-md-6">
                                <input type="email" class="form-control" name="email" min="0" max="100" value={this.state.email} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.emailError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Password</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control" name="password" min="0" max="100" value={this.state.password} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.passwordError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Confirm Password</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control" name="cPassword" min="0" max="100" value={this.state.cPassword} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.cPasswordError}</div>
                            </div>
                        </div>
                        <br/>   
                        <div class="col-md-4 offset-md-4">
                            <button type="submit" class="btn btn-primary" >Submit</button>
                            <br/><br/>  
                            <button type="button" class="btn btn-danger" onClick={() => this.onClear()} >Clear</button>
                        </div>
                        <br/><br/>   
                    </form>
                    </div>
                </div>
                </div>
                <br/><br/>   
                <br/><br/>   
            </div>
        );
    }
}

export default Register;
