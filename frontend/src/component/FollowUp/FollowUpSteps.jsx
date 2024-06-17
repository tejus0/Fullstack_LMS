import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming axios is imported elsewhere in your actual file
import { toast } from 'react-hot-toast'; // Assuming toast is imported elsewhere in your actual file
import { followUpOne, followUpTwo, followUpThree } from '../../data/followUpDropdown';

const baseUrl = import.meta.env.VITE_API;

const FollowUpSteps = ({studentId}) => {
    console.log(studentId,"id");
    const [FolloupStage, setFolloupStage] = useState("FollowUp1");
    const [dropDown, setDropDown] = useState([]);
    const [SelectedOption, setSelectedOption] = useState("");
    const [notesByStage, setNotesByStage] = useState({
        FollowUp1: [],
        FollowUp2: [],
        FollowUp3: []
    });

    useEffect(() => {
        switch (FolloupStage) {
            case 'FollowUp1':
                setDropDown(followUpOne);
                break;
            case 'FollowUp2':
                setDropDown(followUpTwo);
                break;
            case 'FollowUp3':
                setDropDown(followUpThree);
                break;
            default:
                setDropDown(followUpOne);
                break;
        }
    }, [FolloupStage]);

    const addFollowUp = async() => {
        if (SelectedOption !== "") {
            const newItem = {
                option: SelectedOption
            };

            // console.log(text, "text is here");
            await axios
              .post(`${baseUrl}/createTodos`, {_id:studentId, name: SelectedOption, followUpStage: FolloupStage}).catch(err => {
                console.log(err, "error");
              })
            //   .then((response) => {
            //     toast.success("task added successfully !", { position: "top-right" });
            setNotesByStage(prevState => ({
                ...prevState,
                [FolloupStage]: [...prevState[FolloupStage], newItem]
            }));
            toast.success("Follow Up Added Successfully !")
            setSelectedOption("");
        } else {
            toast.error("Select an option first!");
        }
    };

    return (
        <div className='flex gap-5 overflow-hidden'>
            <div className='flex-initial w-72'>
                <ul className='flex md:flex-col md:gap-3 m-auto'>
                    <li onClick={() => setFolloupStage("FollowUp1")} className={`${FolloupStage === "FollowUp1" ? 'bg-blue-500 text-white' : 'bg-gray-300 text-purple-900'} font-medium rounded-lg py-3 px-2 cursor-pointer`}>
                        Follow one
                    </li>
                    <li onClick={() => setFolloupStage("FollowUp2")} className={`${FolloupStage === "FollowUp2" ? 'bg-blue-500 text-white' : 'bg-gray-300 text-purple-900'} font-medium rounded-lg py-3 px-2 cursor-pointer`}>
                        Follow Two
                    </li>
                    <li onClick={() => setFolloupStage("FollowUp3")} className={`${FolloupStage === "FollowUp3" ? 'bg-blue-500 text-white' : 'bg-gray-300 text-purple-900'} font-medium rounded-lg py-3 px-2 cursor-pointer`}>
                        Follow three
                    </li>
                </ul>
            </div>

            <div className='bg-blue-500 flex-1 py-5 gap-5'>
                <div className='flex gap-4 justify-center items-start'>
                    <select value={SelectedOption} onChange={(e) => setSelectedOption(e.target.value)} className='w-[250px] p-3 rounded-lg'>
                        <option value="">Select</option>
                        {dropDown.map((item, index) => (
                            <option key={index} value={item.option}>{item.option}</option>
                        ))}
                    </select>
                    <button className='bg-white p-3 rounded-xl' onClick={addFollowUp}>Add</button>
                </div>

                <div>
                    {notesByStage[FolloupStage].length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-bold mb-2">Notes for {FolloupStage}</h3>
                            {notesByStage[FolloupStage].map((item, index) => (
                                <div key={index} className="mb-2">
                                    {item.option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FollowUpSteps;
