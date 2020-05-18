import React, {Component} from 'react'
import NoteList from './NoteList'
import UserStore from '../stores/UserStore'

const SERVER = 'http://18.220.130.149:8080'


class LoginForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstName:'',
            lastName:'',
            classNr:-1,
            faculty:'',
            email: '',
            password:'',
            loginForm: true,
            registerForm: false,
            user: null
        }
        this.store = new UserStore()
        
        this.handleChange = (evt) =>{
            this.setState({
                [evt.target.name] : evt.target.value
            })
        }
        
        
        this.handleClick = async () => {
            var req = {
                email: this.state.email,
                password: this.state.password
            }
            try{
            let response = await fetch(`${SERVER}/login`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                    body : JSON.stringify(req) 
                }).then(res => { 
                    if(res.status === 200){
                     return res.json()
                    }
                     else
                     {
                         return null
                     }
                })
                .then((json) => {
                    if(json !== null)
                    {
                        localStorage.setItem('user', JSON.stringify(json))
                        this.setState({
                          loginForm: false,
                          user: json
                          })
                    }
                })
            }
            catch(err){
                console.warn(err)
            }
        }
        
        this.goToRegister = async () =>{
            this.setState({
                registerForm: true
            })
        }
        
        this.goToLogin = async () =>{
            this.setState({
                registerForm: false
            })
        }
        
        this.register = async () =>{
            var user={
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                classNr: this.state.classNr,
                faculty: this.state.faculty,
                email: this.state.email,
                password: this.state.password
            }
            try{
            await fetch(`${SERVER}/register`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)           
            })
            }
            catch(err){
                console.warn(err)
            }
        
            this.setState({
                registerForm: false
            })
        }
         this.logOut = () =>{
                localStorage.removeItem("user") 
                this.setState({
                    loginForm: true,
                    user: null
                })
            }
    }
    componentDidMount(){
       
        console.log(localStorage.getItem('user'))
        if(localStorage.getItem('user')!==null){
           
            this.setState({
                loginForm: false,
                user: JSON.parse(localStorage.getItem('user'))
            })
        }
    }

    
    render(){
       
        if(this.state.loginForm === true){
        return <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic">
                        <img src="https://i.ibb.co/PQSzB2m/tehnologii-Web.png"></img>
                    </div>
                    <div className="login100-form">
    					<span className="login100-form-title">
    						Member Login
    					</span>
                        <div className="wrap-input100 validate-input">
                            <input className="input100" type="email" placeholder="email" name="email" onChange={this.handleChange}/>
                            <span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<i className="fa fa-envelope" aria-hidden="true"></i>
    						</span>
                        </div>
                        <div className="wrap-input100 validate-input">
                            <input className="input100" type="password" placeholder="password" name="password" onChange={this.handleChange}/>
                            <span className="focus-input100"></span>
    						<span className="symbol-input100">
    							<i className="fa fa-lock" aria-hidden="true"></i>
    						</span>
                        </div>
                            {
                             this.state.registerForm === true &&
                             <div>
                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="text" placeholder="First Name" name="firstName" onChange={this.handleChange}/>
                                <span className="focus-input100"></span>
        						<span className="symbol-input100">
        							<i className="fa fa-user" aria-hidden="true"></i>
        						</span>
                            </div>
                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="text" placeholder="Last Name" name="lastName" onChange={this.handleChange}/>
                                <span className="focus-input100"></span>
        						<span className="symbol-input100">
        							<i className="fa fa-user" aria-hidden="true"></i>
        						</span>
                            </div>
                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="number" placeholder="Class" name="classNr" onChange={this.handleChange}/>
                                <span className="focus-input100"></span>
    						    <span className="symbol-input100">
    							<i className="fa fa-users" aria-hidden="true"></i>
    						</span>
                            </div>
                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="text" placeholder="Faculty" name="faculty" onChange={this.handleChange}/>
                                <span className="focus-input100"></span>
        						<span className="symbol-input100">
        							<i className="fa fa-building" aria-hidden="true"></i>
        						</span>
                            </div>
                            <div className="container-login100-form-btn">
                                <input className="login100-form-btn" type="button" value="Submit" onClick={this.register}/>
                            </div>
                            <div className="container-login100-form-btn">
                                <input className="login100-form-btn" type="button" value="Cancel" onClick={this.goToLogin}/>
                            </div>
                            </div>
                            }
                            {
                            this.state.registerForm === false &&
                            <div>
                                <div className="container-login100-form-btn">
                                    <input className="login100-form-btn" type="button" value="Login" onClick={this.handleClick}/>
                                </div>
                                <div className="container-login100-form-btn">
                                <div className="text-center">
            						<p className="txt2" onClick={this.goToRegister}>
            							Register
            						<span> 	<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i> </span>
            						</p>
            					
                                </div>
                                </div>
                            </div>
                            }
                    </div>
                </div>
            </div>
        </div>
        }
        else
        {
            return <div>
                <div className="limiter">
                    <div className="container-navBar">
                        <NoteList item={this.state.user}/>
                        <div className="navbar-logOutButton">
                        
                            <input type="button" value="Logout" onClick={this.logOut}/>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
}

export default LoginForm