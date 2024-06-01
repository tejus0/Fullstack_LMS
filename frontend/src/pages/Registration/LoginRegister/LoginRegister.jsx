import React, { useState } from "react";
import './LoginRegister.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiSolidUserDetail } from "react-icons/bi";

import firebase from "../../../component/firebase_config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";


const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  
  const auth = getAuth(firebase);

const Login = () =>
    {
        const[action,setAction] = useState('');
        const registerLink = () =>{
            setAction('active');
        };
        const loginLink = ()=>{
            setAction('');
        };

        const [employee_id, setEId] = useState("");
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [mobile, setPhone] = useState("");
        const [password, setPass] = useState("");
        const [verifyButton, setverifyButton] = useState(false);
        const [verifyOtp, setverifyOtp] = useState(false);
        const [otp, setOtp] = useState("");
        const [otpVerified, setOtpVerified] = useState(false);
      
        const [showPassword, setShowPassword] = useState(false);
        // // Inputs Errors
        const [emailError, setEmailError] = useState(false);
        const [passwordError, setPasswordError] = useState(false);
        // // Overall Form Validity
        const [formValid, setFormValid] = useState();
        const [success, setSuccess] = useState();
        // Handles Display and Hide Password
        const handleClickShowPassword = () => setShowPassword((show) => !show);
        const handleMouseDownPassword = (event) => {
          event.preventDefault();
        };
        // Validation for onBlur Email
        const handleEmail = () => {
          console.log(isEmail(email));
          if (!isEmail(email)) {
            setEmailError(true);
            return;
          }
      
          setEmailError(false);
        };
        // Validation for onBlur Password
        const handlePassword = () => {
          if (
            !password
            // ||
            // passwordInput.length < 5 ||
            // passwordInput.length > 20
          ) {
            setPasswordError(true);
            return;
          }
      
          setPasswordError(false);
        };
      
        const navigate = useNavigate();
      
        const onCaptchaVerify = () => {
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                onSignInSubmit();
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
              },
            }
          );
        };
      
        const onSignInSubmit = () => {
          onCaptchaVerify();
          const phoneNumber = "+91" + mobile;
          const appVerifier = window.recaptchaVerifier;
      
          signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              alert("OTP Sent Successfully !");
              setverifyOtp(true);
              // ...
            })
            .catch((error) => {
              console.log(error);
              // alert("OTP sent failed ")
              // Error; SMS not sent
              // ...
            });
        };
      
        const verifyCode = () => {
          window.confirmationResult
            .confirm(otp)
            .then((result) => {
              // User signed in successfully.
              const user = result.user;
              console.log(user);
              alert("Verification DOne !");
              setOtpVerified(true);
              setverifyOtp(false);
              // ...
            })
            .catch((error) => {
              alert("Invalid OTP !");
              // User couldn't sign in (bad verification code?)
              // ...
            });
        };
      
        const changeMobile = (e) => {
          setPhone(e.target.value);
          if (mobile.length == 9) {
            setverifyButton(true);
          } else {
            console.log(mobile.length);
          }
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          setSuccess(null);
          //First of all Check for Errors
      
          // If Email error is true
          if (emailError || !email) {
            setFormValid("Email is Invalid. Please Re-Enter");
            return;
          }
          setFormValid(null);
          setSuccess("Form Submitted Successfully");
          if (otpVerified) {
            console.log("axios");
            await axios
              .post(`${process.env.REACT_APP_BASE_URL}/register`, {
                employee_id,
                username,
                email,
                mobile,
                password,
              })
              .then((response) => {
                console.log(response);
                if (response.status == 200) {
                  if(response.data.error=="User Exists !"){
                    alert("UserId exists.")
                  }else{
                  alert("Registration successfull !");
                  window.location.href = "./";
                  }
                }
              })
              .catch((error) => console.log(error.message));
          } else {
            alert("Please Verify MObile First !");
          }
        };

      return (
          <div className={`wrapper ${action}`}>
          <div className="form-box login">
            <form action="">
        <h1>Login</h1>
        <div className="input-box">
           <input  type="text" placeholder="Username" required/>
           <FaUser className="icon" />
        </div>
        <div className="input-box">
           <input type="password" placeholder="Password" required/>
           <FaLock className="icon"/>
        </div>
        <div className="remember-forgot">
         <label><input type='checkbox' />Remember me</label>
         <a href="#">Forgot Password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
            <p>
                Don't have an account?<a href="#" onClick={registerLink}>Register </a>
            </p>
        </div>
            </form>

          </div>
          <div className="form-box register">
            <form action="">
        <h1>Register</h1>
        <div className="input-box">
           <input type="text" placeholder="Employee ID" required/>
           < BiSolidUserDetail className="icon" />
        </div>
        <div className="input-box">
           <input type="text" placeholder="Username" required/>
           <FaUser className="icon" />
        </div>
        <div className="input-box">
           <input type="tel" placeholder="Phone no." required/>
           <  BsFillTelephoneFill className="icon"/>
        </div>
        <div className="input-box">
           <input type="email" placeholder="E-mail " required/>
           < IoMailSharp className="icon"/>
        </div>
        <div className="input-box">
           <input type="password" placeholder="Password" required/>
           <FaLock className="icon"/>
        </div>
        <div className="input-box">
           <input type="password" placeholder="Confirm Password" required/>
           <FaLock className="icon"/>
        </div>
        <div className="remember-forgot">
         <label><input type='checkbox' />I agree to the terms & conditions</label>
         
        </div>
        <button type="submit">Register</button>
        <div className="register-link">
            <p>
                Already have an account?<a href="#" onClick={loginLink}>Login </a>
            </p>
        </div>
            </form>

          </div>
          </div>
      )
    };  
    export default Login;