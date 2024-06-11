import React from 'react'
import { useState } from 'react'
import InputField from '../../component/InputField'
import validationSchema from '../../FormValidationSchema/SignupSchema'

const SignUp = () => {
  const [err, setErr] = useState([])
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

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await validationSchema.validate(formdata, { abortEarly: false })
      setErr([])
      console.log("api called");
    } catch (error) {
      const newError = {}
      error.inner.forEach(elem => {
        newError[elem.path] = elem.message
      });
      setErr(newError)
    }
  }

  
  return (
    <div className='p-4 rounded-lg gap-8 flex flex-col w-full justify-center z-[999] max-w-[12000px]'>
      <form onSubmit={handleSignup} className='flex flex-col justify-center m-auto w-full rounded-lg md:w-[50%] gap-8 bg-white p-10'>

        {/* name & id field */}
        <div className='flex md:flex-row flex-col gap-3 md:gap-10 '>

          <div className='w-full'>
            <InputField label={"Employee ID"} value={formdata.employeeId} name="employeeId" onChange={handleChange} />
            {err && <p className=" text-red-500">{err.employeeId}</p>}
          </div>

          <div className='w-full'>
            <InputField label={"Enter username"} value={formdata.userName} name="userName" onChange={handleChange} />
            {err && <p className=" text-red-500">{err.userName}</p>}
          </div>

        </div>


        <div className='flex flex-col w-full gap-3'>
          <InputField label={"Email Email "} value={formdata.emailAddress} name="emailAddress" onChange={handleChange} />
          {err && <p className=" text-red-500">{err.emailAddress}</p>}
        </div>


        <div className='flex flex-col w-full gap-3'>
          <InputField label={"Mobile Number"} value={formdata.mobileNumber} name="mobileNumber" onChange={handleChange} />
          {err && <p className=' text-red-500'>{err.mobileNumber}</p>}
        </div>

        <div className='flex flex-col w-full gap-3'>
          <InputField label={"Enter Password"} value={formdata.password} name="password" onChange={handleChange} />

          {err && <p className=' text-red-500'>{err.password}</p>}
        </div>

        <div className='flex flex-col w-full gap-3'>
          <InputField label={"Confirm Password"} value={formdata.confirmPassword} name="confirmPassword" onChange={handleChange} />

          {err && <p className=' text-red-500'>{err.confirmPassword}</p>}
        </div>

        <button type='submit' className='border-2 p-4 rounded-full bg-[#de0000] text-white text-xl font-bold'>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp
