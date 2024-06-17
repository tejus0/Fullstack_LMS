import React from 'react'

const SideNavigation = ({ selectedValues, setselectedValues }) => {

    return (
        <div>
            <ul className='flex md:flex-col md:gap-3 m-auto'>
                <li onClick={() => setselectedValues("Option_one")} className={`${selectedValues === 'Option_one' && 'bg-blue-500 text-white'} rounded-lg py-3 px-2 text-blue-900`}>Option one</li>
                <li onClick={() => setselectedValues("Follow_Ups")} className={`${selectedValues === 'Follow_Ups' && 'bg-blue-500 text-white'} rounded-lg py-3 px-2 text-blue-900`}>Follow Ups</li>
                <li onClick={() => setselectedValues("Option_two")} className={`${selectedValues === 'Option_two' && 'bg-blue-500 text-white'} rounded-lg py-3 px-2 text-blue-900`}>Option two</li>
            </ul>
        </div>
    )
}

export default SideNavigation