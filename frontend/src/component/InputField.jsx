import React from 'react'

const InputField = ({ label, value, onChange, name }) => {

    return (
        <div className='flex flex-col w-full gap-3 relative'>

            <input type="text"
                id={label}
                name={name}
                className=' p-3 focus:border-blue-500 w-full placeholder-transparent rounded-md text-blue-900 border-2 outline-none peer border-gray-400 '
                placeholder={label}
                value={value}
                onChange={onChange}
            // value={formdata.name}
            // onChange={handleChange}
            />

            <label htmlFor={label} className=' absolute -top-[11px] text-sm text-blue-500  left-2.5 peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-600 transition-all  peer-placeholder-shown:text-base peer-placeholder-shown:font-normal px-2 bg-white' >{label}</label>
            {/* {err && <p className=" text-red-500">{err.name}</p>} */}
        </div>
    )
}

export default InputField
