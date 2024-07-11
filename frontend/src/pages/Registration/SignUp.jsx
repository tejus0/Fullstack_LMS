
import { useState } from 'react'
import InputField from '../../component/InputField'
import validationSchema from '../../FormValidationSchema/SignupSchema'
import firebase from "../../component/firebase_config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";


const auth = getAuth(firebase);


const SignUp = () => {
  const baseUrl = import.meta.env.VITE_API;
  const [err, setErr] = useState([])
  const [verifyButton, setverifyButton] = useState(false)
  const [verifyOtp, setverifyOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    employeeId: '',
    userName: '',
    emailAddress: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setformdata({ ...formdata, [name]: value })
  }

  // for sending otp to user
  const changeMobile = (e) => {
    setformdata({ ...formdata, mobileNumber: e.target.value });
    if (e.target.value.length === 10) {
      setverifyButton(true);
    } else {
      setverifyButton(false);
    }
  };

  const onCaptchaVerify = () => {
    console.log("ok");
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
        },
      }
    );
    console.log("ok one");
  };

  const onSignInSubmit = () => {

    onCaptchaVerify();
    console.log("ok");
    console.log(formdata);
    const phoneNumber = "+91" + formdata.mobileNumber;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert("OTP Sent Successfully !");
        setverifyOtp(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyCode = () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        console.log(user);
        alert("Verification Done !");
        setOtpVerified(true);
        setverifyOtp(false);
      })
      .catch((error) => {
        alert("Invalid OTP !");
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await validationSchema.validate(formdata, { abortEarly: false })
      setErr([])
      if (!otpVerified) {
        alert("Please verify your mobile number.");
        return;
      }

      // calling api to store data  
      await axios
        .post(`${baseUrl}/register`, {
          employee_id: formdata.employeeId,
          username: formdata.userName,
          email: formdata.emailAddress,
          mobile: formdata.mobileNumber,
          password: formdata.password,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            if (response.data.error === "User Exists !") {
              alert("User already exists.");
            } else {
              alert("Registration successful!");
              navigate("/login");
            }
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      const newError = {}
      error.inner.forEach(elem => {
        newError[elem.path] = elem.message
      });
      setErr(newError)
    }
  }


  return (
    <div className=' rounded-lg gap-8 flex flex-col w-full justify-center z-[999] max-w-[12000px]'>
      <form onSubmit={handleSignup} className='flex flex-col justify-center m-auto w-full rounded-lg md:w-[50%] gap-8 bg-white p-10'>
        <div id="recaptcha-container"></div>

        {/* name & id field */}
        <div className='flex md:flex-row flex-col gap-3 md:gap-10 '>

          <div className='w-full'>
            <InputField label={"User ID"} value={formdata.employeeId} name="employeeId" onChange={handleChange} />
            {err && <p className=" text-red-500">{err.employeeId}</p>}
          </div>

          <div className='w-full'>
            <InputField label={"Enter Name"} value={formdata.userName} name="userName" onChange={handleChange} />
            {err && <p className=" text-red-500">{err.userName}</p>}
          </div>

        </div>

        {/* for email  */}
        <div className='flex flex-col w-full gap-3'>
          <InputField label={"Enter Email "} value={formdata.emailAddress} name="emailAddress" onChange={handleChange} />
          {err && <p className=" text-red-500">{err.emailAddress}</p>}
        </div>


        {/* for mobile number */}
        <div className='flex flex-col w-full gap-3'>
          <div className='flex flex-col w-full gap-3 relative'>

            <input type="text"
              id="Mobile Number"
              name="mobileNumber"
              className=' p-3 focus:border-blue-500 w-full placeholder-transparent rounded-md text-blue-900 border-2 outline-none peer border-gray-400 '
              placeholder="Mobile Number"
              value={formdata.mobileNumber}
              onChange={changeMobile}
            />

            <label htmlFor="Mobile Number" className=' absolute -top-[11px] text-sm text-blue-500  left-2.5 peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-600 transition-all  peer-placeholder-shown:text-base peer-placeholder-shown:font-normal px-2 bg-white' >Mobile Number</label>
          </div>

          {
            verifyButton && <button type="button" onClick={onSignInSubmit} className='bg-blue-500 w-[30%] m-auto p-2 text-white'>
              {otpVerified ? "Verified" : "Verify"}
            </button>
          }
          {err && <p className=' text-red-500'>{err.mobileNumber}</p>}
        </div>

        {/* for otp  */}

        {
          verifyOtp &&
          <div className='flex flex-col w-full gap-3'>
            <div className='flex flex-col w-full gap-3 relative'>
              <input type="text"
                id="otp"
                name="otp"
                className=' p-3 focus:border-blue-500 w-full placeholder-transparent rounded-md text-blue-900 border-2 outline-none peer border-gray-400 '
                placeholder="Mobile Number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <label htmlFor="otp" className=' absolute -top-[11px] text-sm text-blue-500  left-2.5 peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-600 transition-all  peer-placeholder-shown:text-base peer-placeholder-shown:font-normal px-2 bg-white' >Enter OTP</label>
            </div>

            <button type="button" onClick={verifyCode} className='bg-blue-500'>
              Verify OTP
            </button>

          </div>
        }


        {/* for passsword */}
        <div className='flex flex-col w-full gap-3'>
          <InputField label={"Enter Password"} value={formdata.password} name="password" onChange={handleChange} />

          {err && <p className=' text-red-500'>{err.password}</p>}
        </div>

        {/* for confirm password */}
        <div className='flex flex-col w-full gap-3'>
          <InputField label={"Confirm Password"} value={formdata.confirmPassword} name="confirmPassword" onChange={handleChange} />

          {err && <p className=' text-red-500'>{err.confirmPassword}</p>}
        </div>

        <button type='submit' className='border-2 p-2 bg-blue-500 text-white text-lg'>
          Sign Up
        </button>


        <Link to="/login" className='text-blue-500 font-normal flex justify-end text-lg'>
          Already have an account? Sign in
        </Link>

        <div className='flex justify-center'>
          Copyright ©<Link to="" className='mx-2 text-blue-700'> Ntechzy </Link> 2024.
        </div>
      </form>
    </div>
  )
}

export default SignUp
