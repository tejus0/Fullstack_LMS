import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  followUpOne,
  followUpTwo,
  followUpThree,
  associateCollegeOptions,
  paidCounselling
} from "../../data/followUpDropdown";
import NotesList from "./NotesList";
import SlotBooking from "../TimeSlot/SlotBooking";
import { useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API;

const FollowUpSteps = ({ studentId }) => {
  // console.log(studentId,"studid")
  const [FolloupStage, setFolloupStage] = useState("FollowUp1");
  const [dropDown, setDropDown] = useState([]);
  const [SelectedOption, setSelectedOption] = useState("");
  const [notesByStage, setNotesByStage] = useState({});


  // FollowUp1: [],
  // FollowUp2: [],
  // FollowUp3: [],

  const [secondDropdown, setSecondDropdown] = useState("")

  const [additionalDropdown, setAdditionalDropdown] = useState([]);
  const [showAdditionalDropdown, setShowAdditionalDropdown] = useState(false);
  const [preBookingAmount, setPreBookingAmount] = useState('');
  const [showPreBookingAmount, setShowPreBookingAmount] = useState(false);
  const [countaa, setCountaa] = useState(0)

  const [totalAmount, setTotalAmount] = useState(0); // State to store the total amount
  const [pendingAmount, setPendingAmount] = useState(0); // State to store the pending amount
  const [backendOptions, setBackendOptions] = useState([])


  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [UploadImage, setUploadImage] = useState()
  const [file, setfile] = useState()
  const [Url, setUrl] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getTodos/${studentId}`);
        setNotesByStage(response.data[0].remarks); // Update notesByStage with the fetched data
        console.log(response.data[0].remarks, "remarks"); // Log the fetched data for debugging
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again.");
      }
    };

    fetchData(); // Call the fetchData function
  }, [studentId, countaa]); // Include studentId and countaa in the dependency array

  useEffect(() => {
    if (FolloupStage === "FollowUp3" && notesByStage.FollowUp3?.length > 0) {
      const backendOptions = notesByStage.FollowUp3.map(note => note.subject);
      setBackendOptions(notesByStage.FollowUp3);
      console.log(notesByStage.FollowUp3, "notesByStage.FollowUp3");
      console.log(backendOptions, "backendOptions");
      setDropDown(followUpThree.filter(item => backendOptions.includes(item.option)));
      setAdditionalDropdown(followUpThree.filter(item => backendOptions.includes(item.option)));
      console.log(secondDropdown, "dropdown in formsteps");
    } else {
      switch (FolloupStage) {
        case "FollowUp1":
          setDropDown(followUpOne);
          break;
        case "FollowUp2":
          setDropDown(followUpTwo);
          break;
        case "FollowUp3":
          setDropDown(followUpThree);
          break;
        default:
          setDropDown(followUpOne);
          break;
      }
    }
  }, [FolloupStage, notesByStage]); // Include FolloupStage and notesByStage in the dependency array


  const handleSecondDropDown = (option) => {
    setSecondDropdown(option)

    const price = parseInt(option.split('-')[1].replace('K', '000'));
    setTotalAmount(price);
    // setPendingAmount(totalAmount-backendOptions[0].preBookingAmount);

    // Calculate the sum of preBookingAmount from backendOptions
    const preBookingTotal = backendOptions.reduce((acc, curr) => {
      return acc + parseInt(curr.preBookingAmount || 0);
    }, 0);
    setPendingAmount(price - preBookingTotal);

  }

  const handleSelectedOption = (option) => {
    setSelectedOption(option);

    setSecondDropdown("")

    // Reset additional dropdown and input states based on selected option
    // if (dropDown.length==1) {
    //   setAdditionalDropdown()
    // } else {
    setAdditionalDropdown([]);
    setShowAdditionalDropdown(false);
    setPreBookingAmount('');
    setShowPreBookingAmount(false);

    // Conditionally set additional dropdown and input based on selected option
    switch (option) {
      case 'Paid Counselling':
        let filteredPaidCounselling = paidCounselling;
        if(notesByStage?.FollowUp3.length){
          filteredPaidCounselling = paidCounselling.filter((item)=> item.option == notesByStage?.FollowUp3[0].additionalOption);
        }
        setAdditionalDropdown(filteredPaidCounselling);
        setShowAdditionalDropdown(true);
        break;
      case 'Associate College':
        let filteredAssociateCollege = associateCollegeOptions;
        console.log("Paid conselling" , paidCounselling)
        if(notesByStage?.FollowUp3.length){
          filteredAssociateCollege = associateCollegeOptions.filter((item)=> item.option == notesByStage?.FollowUp3[0].additionalOption);
        }
        // Assuming options are fetched from an external JavaScript file
        setAdditionalDropdown(filteredAssociateCollege); // Replace with your actual options from an external file
        setShowAdditionalDropdown(true);
        break;
      default:
        break;
    }
    // }

    setShowPreBookingAmount(true);
  };

  const keyFollow = (e) => {
    if (e.key == "Enter") {
      addFollowUp()
    }
  }

  const addFollowUp = async (e) => {
    e.preventDefault();
    // Your existing addFollowUp function remains unchanged
    if (SelectedOption !== "") {
      const newItem = {
        option: SelectedOption,
        additionalOption: "",
        preBookingAmount: ""
      };

      const subject =
        FolloupStage === "FollowUp2"
          ? SelectedOption + "+" + text
          : SelectedOption;

      // Handle different scenarios based on SelectedOption
      switch (SelectedOption) {
        case 'Paid Counselling':
          newItem.additionalOption = additionalDropdown.find(
            (item) => item.option === SelectedOption
          );
          newItem.preBookingAmount = preBookingAmount;
          break;
        case 'Associate College':
          newItem.additionalOption = additionalDropdown.find(
            (item) => item.option === SelectedOption
          );
          newItem.preBookingAmount = preBookingAmount;
          break;
        default:
          break;
      }
      // console.log(studentId,preBookingAmount,"amount data client side");
      try {
        if (FolloupStage === "FollowUp3") {
          if(!preBookingAmount){
            toast.error("Please Enter Prebooking Amount")
            throw new Error("Please Enter Prebooking Amount")
          }else if(preBookingAmount > pendingAmount){
            toast.error("Prebooking Amount Should Be Less Than Pending Amount");
            throw new Error("Prebooking Amount Should Be Less Than Pending Amount")
          }
          if(!file || !UploadImage){
            toast.error("Please Upload Fee Receipt")
          }
          // console.log(SelectedOption,secondDropdown,preBookingAmount,"follow3 hai")
          await axios.post(`${baseUrl}/createFollowUp3`, {
            _id: studentId,
            name: subject,
            followUpStage: FolloupStage,
            additionalOption: secondDropdown, // Include additionalOption in API call
            preBookingAmount: newItem.preBookingAmount, // Include preBookingAmount in API call
            file: file
          }, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          });
        }
        else {

          await axios.post(`${baseUrl}/createTodos`, {
            _id: studentId,
            name: subject,
            followUpStage: FolloupStage,
          });
        }

        setNotesByStage((prevState) => ({
          ...prevState,
          [FolloupStage]: [...prevState[FolloupStage], newItem],
        }));

        setCountaa(prev => prev + 1)
        toast.success("Follow Up Added Successfully !");
        setSelectedOption("");
        setSecondDropdown("")
        setPreBookingAmount("")
        setText("")
        setfile(null)
        setUploadImage(null)
        closeModal();
      } catch (error) {
        console.error("Error adding follow-up:", error);
        toast.error("Failed to add follow-up. Please try again.");
      }
    } else {
      toast.error("Select an option first!");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setUploadImage(reader.result)
        setfile(file)
      }
    }
  }

  const handleChangePreBookingAmount = (e)=>{
    try {
      let val = e.target.value;
      let reg = /^\d*$/;
      if(reg.test(val)){
        setPreBookingAmount(val)
      }else{
        toast.error("Please Enter Valid Input")
      }
    } catch (err) {
      console.error(err)
    }
  }


  // first create to send image seprately 
  // const uploadFee = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post(`${baseUrl}/upload-receipt/${studentId}`, { file: file }, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       }
  //     })

  //     console.log(data.url);
  //     setUrl(data.url)
  //   } catch (error) {
  //     console.log(error);
  //     console.log("error while upaloding");
  //   }
  // }


  return (
    <div className="flex gap-5 overflow-hidden">
      <div className="flex-initial w-72">
        <ul className="flex md:flex-col md:gap-3 m-auto">
          {/* Your list items for different FollowUp stages */}
          <li
            onClick={() => setFolloupStage("FollowUp1")}
            className={`${FolloupStage === "FollowUp1"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-purple-900"
              } font-medium rounded-lg py-3 px-2 cursor-pointer`}
          >
            Follow one
          </li>
          {notesByStage.FollowUp1?.some((person) => person.subject === "First Call Done") ? <li
            onClick={() => setFolloupStage("FollowUp2")}
            className={`${FolloupStage === "FollowUp2"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-purple-900"
              } font-medium rounded-lg py-3 px-2 cursor-pointer`}
          >
            Follow Two
          </li> : <li
            // onClick={() => setFolloupStage("FollowUp2")}
            className={`${
              // FolloupStage === "FollowUp2"
              //  "bg-blue-500 text-white"
              // :
              "bg-gray-300 text-purple-900"
              } font-medium rounded-lg py-3 px-2 cursor-pointer`}
          >
            Follow Two
          </li>}
          {notesByStage.FollowUp2?.some((person) => person.subject === "Hot Lead+INTERESTED" || person.subject === "Hot Lead+INTERESTED") ? <li
            onClick={() => setFolloupStage("FollowUp3")}
            className={`${FolloupStage === "FollowUp3"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-purple-900"
              } font-medium rounded-lg py-3 px-2 cursor-pointer`}
          >
            Follow three
          </li> : <li
            className={`${"bg-gray-300 text-purple-900"
              } font-medium rounded-lg py-3 px-2 cursor-pointer`}
          >
            Follow Three
          </li>}
        </ul>
      </div>

      <div className="bg-blue-500 flex-1 p-10 gap-5 rounded-md">
        <div className="flex gap-4 justify-center items-start">
          <select
            value={SelectedOption}
            onChange={(e) => handleSelectedOption(e.target.value)}
            className="w-[250px] py-3 rounded-lg"
          >
            {/* Your select options based on dropdown */}
            <option value="">Select</option>
            {dropDown.map((item, index) => (
              <option key={index} value={item.option}>
                {item.option}
              </option>
            ))}
          </select>
          {FolloupStage != "FollowUp3" && <button
            className="bg-white py-2 px-6 rounded-xl"
            onClick={FolloupStage === "FollowUp2" ? openModal : addFollowUp}
          >
            Add
          </button>}
        </div>

        {/* Additional dropdown for Paid Counselling or Associate college */}
        {showAdditionalDropdown && FolloupStage === "FollowUp3" && (
          <div className="mt-4">
            <select
              value={secondDropdown}
              onChange={(e) => handleSecondDropDown(e.target.value)}
              className="w-[250px] p-3 rounded-lg"
            >
              <option value="">Select additional option</option>
              {additionalDropdown.map((item, index) => (
                <option key={index} value={item.option}>
                  {item.option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Input for Pre-Booking Amount */}
        {showPreBookingAmount && FolloupStage === "FollowUp3" && (
          <form onSubmit={addFollowUp} encType="multipart/form-data" className="mt-4 gap-4 flex flex-col">
            < label className="block text-sm font-medium text-gray-700">
              Pre-Booking Amount
            </label>
            <input
              type="text"
              value={preBookingAmount}
              onChange={(e) => handleChangePreBookingAmount(e)}
              className="w-[250px] p-3 border rounded-lg"
              placeholder="Enter pre-booking amount..."
            />

            <div className="flex gap-6  items-center">

              <input className="w-[250px] h-[50px] bg-white border-0 rounded-lg" type="file" name="file" onChange={handleImage} />

              {UploadImage && <img className="w-20 h-20 my-5 " src={UploadImage} alt="" />}
              {/* <button disabled={!UploadImage} type="submit" className="bg-white disabled:bg-gray-500 p-3 rounded-xl">Upload</button> */}
              
            </div>

            {(FolloupStage === "FollowUp3") && <button
              // disabled={!Url}
              className="bg-white p-3 rounded-xl disabled:bg-slate-300 text-blue-800 "
              // onClick={addFollowUp}
              type="submit"
            >
              Submit
            </button>}
            <div>Pending Amount: {pendingAmount}</div>
            <div>Total Amount: {totalAmount}</div>
          </form>
        )
        }

        < NotesList FolloupStage={FolloupStage} notesByStage={notesByStage} studentId={studentId} countaa={countaa} />
      </div >

      {/* Modal */}
      {
        FolloupStage === "FollowUp2" && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isModalOpen ? "" : "hidden"
              }`}
          >
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-lg font-bold mb-4">
                Enter additional note for {FolloupStage}
              </h2>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={keyFollow}
                className="w-full p-3 border rounded-lg mb-4"
                rows="4"
                placeholder="Enter your note..."
              />
              <strong className="mb-2 block text-gray-700">Note : To open follow up 3 add remark <strong>"INTERESTED"</strong> </strong>
              <div className="flex gap-4">

                <button
                  className={`px-4 py-2 rounded-lg text-white ${text.trim() === '' ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'}`}
                  onClick={addFollowUp}
                  disabled={text.trim() === ''}
                >
                  Submit
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => setText('')}
                >
                  Reset
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default FollowUpSteps;