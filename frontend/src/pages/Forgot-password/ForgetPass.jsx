import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

// import OtpInput from "otp-input-react"
import { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import firebase from "../../component/firebase_config";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import OtpInput from 'react-otp-input'
import axios from "axios";
import { useNavigate } from "react-router";

const ForgetPass = () => {
  const baseUrl = import.meta.env.VITE_API;
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const auth = getAuth(firebase);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // onSignup();
            console.log("%c Captcha verified", "font-size:40px;")
          }
        },
      );
    }
  }

  async function onSignup() {
    try {
      if (!ph) {
        toast.error("Please Enter Mobile Number")
        throw new Error("Please Provide Mobile Number")
      }
      const userData = await fetchUserDetails();
      if (!userData) {
        toast.error("User Does not Exists")
        setLoading(false)
      }else{
        setLoading(true);
        onCaptchVerify();
  
        const appVerifier = window.recaptchaVerifier;
  
        const formatPh = "+91" + ph;
  
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            setShowOTP(true);
            toast.success("OTP sent successfully!");
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }
    } catch (err) {

    }
  }

  function onOTPVerify() {
    setLoading(true);
    if (!otp) {
      toast.error("Please Enter OTP ")
      setLoading(false)
    } else {
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          console.log(res);
          setUser(res.user);
          setLoading(false);
          setOtpVerified(true);
          toast.success("OTP Verified Successfully")
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Wrong OTP")
        })
    }
  }

  function handlePhoneChange(value) {
    const regex = /^[0-9]*$/
    if (value.length > 10) {
      toast.error("Phone number should be of length 10 only")
    } else if (!regex.test(value)) {
      toast.error("Only Numbers are allowed")
    }
    else {
      setPh(value)
    }
  }

  async function fetchUserDetails() {
    try {
      const res = await axios.post(`${baseUrl}/getCounsellorByNumber`, {
        mobileNo: ph
      },{withCredentials:true});
      const data = res.data;
      setUserDetails(data.data);
      return data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async function handleSubmit() {
    try {
      if (!userDetails._id) {
        toast.error("There is some issue . Please Try Again")
      } else {
        if (!pass || !confirmPass) {
          toast.error("Please fill all the details");
        }
        else if (pass != confirmPass) {
          toast.error("Password and Confirm Password not matching");
        }
        const res = await axios.post(`${baseUrl}/updatePass`, { newPassword: pass, userId: userDetails._id },{withCredentials:true});
        if (res.status == 200) {
          toast.success("Password Updated Successfully")
          navigate('/login')
        }
      }
    } catch (err) {
      console.error(err)
      toast.error("Something Went Wrong . Please Try Again Later!")
    }
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {
          !user ?
            !showOTP ?
              // enter mobile no container
              <div className="rounded-md flex flex-col gap-5 bg-white p-12 ">
                <p className="text-2xl  font-bold">Enter Your Mobile Number</p>
                <input type="text" className="w-full rounded-lg" placeholder="Please Enter Mobile Number" value={ph} onChange={(e) => handlePhoneChange(e.target.value)} />
                <button className="bg-lime-500 text-white p-2 rounded-md flex gap-1 items-center justify-center py-2.5" onClick={onSignup}>
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send OTP</span>
                </button>
              </div>
              :
              // verify otp container
              <div className="w-fit flex flex-col gap-4 rounded-lg p-4">
                <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">

                </h1>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  containerStyle={"w-full h-full flex justify-between"}
                  inputStyle={{ width: "60px" }}
                />
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </div>
            :
            <div className="bg-white p-12 rounded-lg flex flex-col gap-4 items-start">
              <p className="text-2xl">Reset Password</p>
              {/* reset pass form */}
              <div className="flex flex-col gap-4">
                <input type="password" placeholder="New Password" className="rounded-md text-sm" onChange={(e) => setPass(e.target.value)} />
                <input type="password" placeholder="Confirm Password" className="rounded-md text-sm" onChange={(e) => setConfirmPass(e.target.value)} />
                <button className="bg-teal-400 px-4 p-2 rounded-md" onClick={handleSubmit}>Submit</button>
              </div>
            </div>

        }
      </div>
    </section>
  );
};

export default ForgetPass;
