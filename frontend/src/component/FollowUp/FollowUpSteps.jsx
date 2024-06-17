import React, { useEffect, useMemo, useState } from 'react'
import { followUpOne, followUpThree, followUpTwo } from '../../data/followUpDropdown';

const FollowUpSteps = () => {
    const [FolloupStage, setFolloupStage] = useState("follow_1")
    const [dropDown, setDropDown] = useState([])
    const [SelectedOption, setSelectedOption] = useState()
    const data = []

    useEffect(() => {
        switch (FolloupStage) {
            case 'follow_1':
                setDropDown(followUpOne);
                break;
            case 'follow_2':
                // console.log(followUpTwo);
                setDropDown(followUpTwo);
                break;
            case 'follow_3':
                setDropDown(followUpThree);
                break;
            default:
                setDropDown(followUpOne);
                break;
        }
    }, [FolloupStage])


    const addFollowUp = () => {
        console.log("api will be called here");
    }
    return (
        <div className='flex gap-5 overflow-hidden'>
            <div className=' flex-initial w-72'>
                <ul className='flex md:flex-col md:gap-3 m-auto'>
                    <li onClick={() => setFolloupStage("follow_1")} className={`${FolloupStage === "follow_1" ? 'bg-blue-500 text-white' : 'bg-gray-300 text-purple-900'} font-medium rounded-lg py-3 px-2 cursor-pointer`}>
                        Follow one
                    </li>
                    <li onClick={() => setFolloupStage("follow_2")} className={`${FolloupStage === "follow_2" ? 'bg-blue-500 text-white' : 'bg-gray-300 text-purple-900'} font-medium rounded-lg py-3 px-2 cursor-pointer`}>
                        Follow Two
                    </li>
                    <li onClick={() => setFolloupStage("follow_3")} className={`${FolloupStage === "follow_3" ? 'bg-blue-500 text-white' : 'bg-gray-300 text-purple-900'} font-medium rounded-lg py-3 px-2 cursor-pointer`}>
                        Follow three
                    </li>
                </ul>
            </div>

            <div className='bg-blue-500 flex-1 py-5 gap-5'>
                <div className='flex gap-4 justify-center items-start'>

                    <select name="" id="" className='w-[250px] p-3 rounded-lg' onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value="">Select</option>
                        {
                            dropDown.map((item, index) => (
                                <option key={index} value={item.option}>{item.option}</option>
                            ))
                        }
                    </select>
                    <button className='bg-white p-3 rounded-xl' onClick={addFollowUp}>add</button>
                </div>

                <div>
                    {/* {
                        data.map((obj, i) => (
                            <div>
                                {obj.}
                            </div>
                        ))
                    } */}
                </div>
                {/* {renderedDropdown} */}
            </div>
        </div>
    )
}

export default FollowUpSteps