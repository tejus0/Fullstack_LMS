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


  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getTodos/${studentId}`);
        setNotesByStage(response.data[0].remarks); // Update notesByStage with the fetched data
        // console.log(notesByStage,"remarks");
      } catch (error) {

        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again.");
      }
      
      // Update dropdown based on FolloupStage
      if (FolloupStage === "FollowUp3" && notesByStage.FollowUp3.length>0) {
        // const backendOptions = notesByStage.FollowUp3.map(note => note.subject);
        const backendOptions = notesByStage.FollowUp3;
        console.log( backendOptions," backendOptions");
        setDropDown(followUpThree.filter(item => backendOptions[0].subject.includes(item.option)));
        setAdditionalDropdown(followUpThree.filter(item=> backendOptions[0].additionalOption.includes(item.option)))
        console.log(secondDropdown,"dropdown in formsteps")
        
        // const preBookingTotal = backendOptions[0].preBookingAmount?.reduce((acc, curr) => {
          //   return acc + parseInt(curr.preBookingAmount || 0);
          // }, 0) || 0;
          // setPendingAmount(totalAmount - preBookingTotal); // Calculate pending amount
          
          
          // const total = backendOptions.reduce((acc, curr) => {
            //   const amount = parseInt(curr.split('-')[1].replace('K', '000'));
            //   return acc + amount;
            // }, 0);
            // setTotalAmount(total);
            // console.log(totalAmount,"totalAmount")
            
          }else{
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
                };
              
                fetchData(); // Call the fetchData function
                }, [FolloupStage, countaa]); // Include FolloupStage and studentId in the dependency array
                
                const handleSecondDropDown=(option)=>{
    setSecondDropdown(option)

    const price = parseInt(option.split('-')[1].replace('K', '000'));
    setTotalAmount(price);
    setPendingAmount(price + parseInt(preBookingAmount || 0));

    // Calculate the sum of preBookingAmount from backendOptions
    // const preBookingTotal = backendOptions.reduce((acc, curr) => {
    //   return acc + parseInt(curr.preBookingAmount || 0);
    // }, 0);
    // setPendingAmount(price - preBookingTotal);

  }

  const handleSelectedOption = (option) => {
    setSelectedOption(option);

    setSecondDropdown("")

    // Reset additional dropdown and input states based on selected option
    setAdditionalDropdown([]);
    setShowAdditionalDropdown(false);
    setPreBookingAmount('');
    setShowPreBookingAmount(false);

    // Conditionally set additional dropdown and input based on selected option
    switch (option) {
      case 'Paid Counselling':
        setAdditionalDropdown(paidCounselling);
        setShowAdditionalDropdown(true);
        break;
      case 'Associate College':
        // Assuming options are fetched from an external JavaScript file
        setAdditionalDropdown(associateCollegeOptions); // Replace with your actual options from an external file
        setShowAdditionalDropdown(true);
        break;
        default:
          break;
        }
        
        setShowPreBookingAmount(true);
  };

  const keyFollow = (e) => {
if(e.key == "Enter"){
  addFollowUp()
}
  }

  const addFollowUp = async () => {
    // Your existing addFollowUp function remains unchanged
    if (SelectedOption !== "") {
        const newItem = {
          option: SelectedOption,
          additionalOption:"",
          preBookingAmount:""
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
          if(FolloupStage==="FollowUp3"){
            // console.log(SelectedOption,secondDropdown,preBookingAmount,"follow3 hai")
            await axios.post(`${baseUrl}/createFollowUp3`, {
              _id: studentId,
              name: subject,
              followUpStage: FolloupStage,
              additionalOption: secondDropdown, // Include additionalOption in API call
              preBookingAmount: newItem.preBookingAmount, // Include preBookingAmount in API call
            });
          }
          else{

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
  
          setCountaa(prev => prev+1)
          toast.success("Follow Up Added Successfully !");
          setSelectedOption("");
          setSecondDropdown("")
          setPreBookingAmount("")
          setText("")
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

  return (
    <div className="flex gap-5 overflow-hidden">
      <div className="flex-initial w-72">
        <ul className="flex md:flex-col md:gap-3 m-auto">
          {/* Your list items for different FollowUp stages */}
          <li
            onClick={() => setFolloupStage("FollowUp1")}
            className={`${
              FolloupStage === "FollowUp1"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-purple-900"
            } font-medium rounded-lg py-3 px-2 cursor-pointer`}
          >
            Follow one
          </li>
          {notesByStage.FollowUp1?.some((person) => person.subject === "First Call Done")?  <li
            onClick={() => setFolloupStage("FollowUp2")}
            className={`${
              FolloupStage === "FollowUp2"
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
          {notesByStage.FollowUp2?.some((person) => person.subject === "Hot Lead+INTERESTED" || person.subject === "Hot Lead+INTERESTED")?<li
            onClick={() => setFolloupStage("FollowUp3")}
            className={`${
              FolloupStage === "FollowUp3"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-purple-900"
            } font-medium rounded-lg py-3 px-2 cursor-pointer`}
          >
            Follow three
          </li>: <li
            className={`${
                 "bg-gray-300 text-purple-900"
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
          {FolloupStage !="FollowUp3" && <button
            className="bg-white py-2 px-6 rounded-xl"
            onClick={FolloupStage === "FollowUp2" ? openModal : addFollowUp}
          >
            Add
          </button>}
        </div>

        {/* Additional dropdown for Paid Counselling or Associate college */}
        {showAdditionalDropdown && FolloupStage==="FollowUp3" && (
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
        {showPreBookingAmount && FolloupStage==="FollowUp3" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Pre-Booking Amount
            </label>
            <input
              type="text"
              value={preBookingAmount}
              onChange={(e) => setPreBookingAmount(e.target.value)}
              className="w-[250px] p-3 border rounded-lg"
              placeholder="Enter pre-booking amount..."
            />
            {FolloupStage ==="FollowUp3" && <button
            className="bg-white p-3 rounded-xl"
            onClick={addFollowUp}
          >
            Submit
          </button>}
          <div>Pending Amount: {pendingAmount}</div>
          <div>Total Amount: {totalAmount}</div>
          </div>
        )}
        
        < NotesList FolloupStage= {FolloupStage} notesByStage={notesByStage} studentId={studentId} countaa={countaa}/>
        </div>

      {/* Modal */}
      {FolloupStage === "FollowUp2" && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
            isModalOpen ? "" : "hidden"
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
      )}
    </div>
  );
};

export default FollowUpSteps;
