import React from 'react'

const SideNavigation = ({ selectedValues, setselectedValues }) => {

    return (
        <div>        
            <div className="form-container">
            </div>
        <div>
            <ul className='flex md:flex-col md:gap-3 m-auto'>
                <li onClick={() => setselectedValues("Visit")} className={`${selectedValues === 'Visit' && 'bg-blue-500 text-white'} rounded-lg py-3 px-2 text-blue-900`}>Visit</li>
                <li onClick={() => setselectedValues("Follow_Ups")} className={`${selectedValues === 'Follow_Ups' && 'bg-blue-500 text-white'} rounded-lg py-3 px-2 text-blue-900`}>Follow Ups</li>
                <li onClick={() => setselectedValues("Option_two")} className={`${selectedValues === 'Option_two' && 'bg-blue-500 text-white'} rounded-lg py-3 px-2 text-blue-900`}>Option two</li>
            </ul>
        </div>
        </div>
    )
}

export default SideNavigation