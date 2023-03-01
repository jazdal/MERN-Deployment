import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(props) {
  const {authorized, setAuthorized} = props;
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [fnameError, setFnameError] = useState(true);
  const [lname, setLname] = useState("");
  const [lnameError, setLnameError] = useState(true);
  const [regEmail, setRegEmail] = useState("");
  const [regEmailError, setRegEmailError] = useState(true);
  const [regPassword, setRegPassword] = useState("");
  const [regPasswordError, setRegPasswordError] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(true);
  const [logEmail, setLogEmail] = useState("");
  const [logEmailError, setLogEmailError] = useState(true);
  const [logPassword, setLogPassword] = useState("");
  const [logPasswordError, setLogPasswordError] = useState(true);
  const [regError, setRegError] = useState([]);
  const [loginError, setLoginError] = useState("");

  const handleFnameInput = (e) => {
    setFname(e.target.value);
    e.target.value.length > 1 ? 
      setFnameError(false) : 
      setFnameError(true);
  }

  const handleLnameInput = (e) => {
    setLname(e.target.value); 
    e.target.value.length > 1 ?
      setLnameError(false) : 
      setLnameError(true);
  }

  const handleRegEmailInput = (e) => {
    setRegEmail(e.target.value);
    const pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/;
    e.target.value.length > 1 && pattern.test(e.target.value) ? 
      setRegEmailError(false) :
      setRegEmailError(true);
  }

  const handleRegPasswordInput = (e) => {
    setRegPassword(e.target.value);
    e.target.value.length > 1 ? 
      setRegPasswordError(false) :
      setRegPasswordError(true);
  }

  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value); 
    e.target.value.length > 1 && e.target.value === regPassword ? 
      setConfirmPasswordError(false) : 
      setConfirmPasswordError(true);
  }
  
  const handleRegistration = (e) => {
    e.preventDefault();
    setAuthorized("");
    setRegError([]);

    const newUser = {
      fname: fname, 
      lname: lname, 
      email: regEmail,
      password: regPassword, 
      confirmPassword: confirmPassword
    }

    axios.post(`http://localhost:8000/api/register`, newUser, {withCredentials: true})
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setRegError(err.response.data.err.errors);
      })
    
    if(fnameError, lnameError, regEmailError, regPasswordError, confirmPasswordError) {
      window.alert("Please complete the registration form first with the required data.");
    } else {
      window.alert("Registration successful!");
    }
  }

  const handleLogEmailInput = (e) => {
    setLogEmail(e.target.value); 
    const pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/;
    e.target.value.length > 1 && pattern.test(e.target.value) ? 
      setLogEmailError(false) :
      setLogEmailError(true);
  }

  const handleLogPasswordInput = (e) => {
    setLogPassword(e.target.value);
    e.target.value.length > 1 ? 
      setLogPasswordError(false) : 
      setLogPasswordError(true);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthorized("");
    setLoginError("");

    const login = {
      email: logEmail, 
      password: logPassword
    }

    axios.post(`http://localhost:8000/api/login`, login, {withCredentials: true})
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setLoginError(err.response.data.message);
      })
    if(logEmailError, logPasswordError) {
      window.alert("You need to login to access the site!")
    } else {
      window.alert("Login successful!")
    }
  }

  return(
    <div className="container">
      <h2 className="auth-error">{authorized}</h2>
      <div className="top-bar">
        <h1>Project Manager</h1>
      </div>
      <div className="box">
        <div className="register">
          <h2 className="auth-heading">Register</h2>
          <form onSubmit={handleRegistration}>
            <fieldset className="input-field">
              <label>{fname.length < 1 ? "First name is required*" : null}</label><br />
              <legend>First Name</legend>
              <input className={fname.length < 1 ? "border-red" : null} type="text" value={fname} placeholder="First Name" onChange={handleFnameInput} />
              {
                regError.fname ? <p>{regError.fname.message}</p> : null
              }
            </fieldset>
            <fieldset className="input-field">
              <label>{lname.length < 1 ? "Last name is required*" : null}</label><br />
              <legend>Last Name</legend>
              <input className={lname.length < 1 ? "border-red" : null} type="text" value={lname} placeholder="Last Name" onChange={handleLnameInput} />
              {
                regError.lname ? <p>{regError.lname.message}</p> : null
              }
            </fieldset>
            <fieldset className="input-field">
              <label>{regEmail.length < 1 ? "Email is required*" : null}</label><br />
              <legend>Email</legend>
              <input className={regEmail.length < 1 ? "border-red" : null} type="text" value={regEmail} placeholder="Email" onChange={handleRegEmailInput} />
              {
                regError.email ? <p>{regError.email.message}</p> : null
              }
            </fieldset>
            <fieldset className="input-field">
              <label>{regPassword.length < 1 ? "Password is required*" : null}</label><br />
              <legend>Password</legend>
              <input className={regPassword.length < 1 ? "border-red" : null} type="text" value={regPassword} placeholder="Password" onChange={handleRegPasswordInput} />
              {
                regError.password ? <p>{regError.password.message}</p> : null
              }
            </fieldset>
            <fieldset className="input-field">
              <label>{regPassword === confirmPassword ? null : "Passwords must match"}</label><br />
              <legend>Confirm Password</legend>
              <input className={regPassword === confirmPassword ? null : "border-red"} type="text" value={confirmPassword} placeholder="Confirm Password" onChange={handleConfirmPasswordInput} />
              {
                regError.confirmPassword ? <p>{regError.confirmPassword.message}</p> : null
              }
            </fieldset>
            <input className="reg-btn" type="submit" value="Register" />
          </form>
        </div>
        <div className="login">
        <h2 className="auth-heading">Login</h2>
          <form onSubmit={handleLogin}>
            <fieldset className="input-field">
                <label>{logEmail.length < 1 ? "Email is required*" : null}</label><br />
                <legend>Email</legend>
                <input className={logEmail.length < 1 ? "border-red" : null} type="text" name="email" placeholder="Email" onChange={handleLogEmailInput} />
            </fieldset>
            <fieldset className="input-field">
                <label>{logPassword.length < 1 ? "Password is required*" : null}</label><br />
                <legend>Password</legend>
                <input className={logPassword.length < 1 ? "border-red" : null} type="text" name="password" placeholder="Password" onChange={handleLogPasswordInput} />
            </fieldset>
            <div className="log-err">
              {
              loginError ? <p>{loginError}</p> : null
              }
            </div>
            <input className="reg-btn" type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
}