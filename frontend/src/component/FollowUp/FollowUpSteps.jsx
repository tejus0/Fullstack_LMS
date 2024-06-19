import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  followUpOne,
  followUpTwo,
  followUpThree,
} from "../../data/followUpDropdown";

const baseUrl = import.meta.env.VITE_API;

const FollowUpSteps = ({ studentId }) => {
    console.log(studentId,"studid")
  const [FolloupStage, setFolloupStage] = useState("FollowUp1");
  const [dropDown, setDropDown] = useState([]);
  const [SelectedOption, setSelectedOption] = useState("");
  const [notesByStage, setNotesByStage] = useState({
    FollowUp1: [],
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getTodos/${studentId}`);
        console.log(response,"res")
        // Assuming response.data is like:
        // {
        //   "FollowUp2": [],
        //   "FollowUp3": [],
        //   "FollowUp1": [
        //     {
        //       "subject": "Not Reachable",
        //       "updatedAt": "2024-06-19T07:11:13.803Z"
        //     }
        //   ]
        // }
        setNotesByStage(response.data[0].remarks); // Update notesByStage with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again.");
      }
    };

    fetchData(); // Call the fetchData function

    // Update dropdown based on FolloupStage
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
  }, [FolloupStage]); // Include FolloupStage and studentId in the dependency array

  const addFollowUp = async () => {
    // Your existing addFollowUp function remains unchanged
    if (SelectedOption !== "") {
        const newItem = {
          option: SelectedOption,
        };
  
        const subject =
          FolloupStage === "FollowUp2"
            ? SelectedOption + "+" + text
            : SelectedOption;
  
        try {
          await axios.post(`${baseUrl}/createTodos`, {
            _id: studentId,
            name: subject,
            followUpStage: FolloupStage,
          });
  
          setNotesByStage((prevState) => ({
            ...prevState,
            [FolloupStage]: [...prevState[FolloupStage], newItem],
          }));
  
          toast.success("Follow Up Added Successfully !");
          setSelectedOption("");
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
          <li
            onClick={() => setFolloupStage("FollowUp2")}
            className={`${
              FolloupStage === "FollowUp2"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-purple-900"
            } font-medium rounded-lg py-3 px-2 cursor-pointer`}
          >
            Follow Two
          </li>
          <li
            onClick={() => setFolloupStage("FollowUp3")}
            className={`${
              FolloupStage === "FollowUp3"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-purple-900"
            } font-medium rounded-lg py-3 px-2 cursor-pointer`}
          >
            Follow three
          </li>
        </ul>
      </div>

      <div className="bg-blue-500 flex-1 py-5 gap-5">
        <div className="flex gap-4 justify-center items-start">
          <select
            value={SelectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-[250px] p-3 rounded-lg"
          >
            {/* Your select options based on dropdown */}
            <option value="">Select</option>
            {dropDown.map((item, index) => (
              <option key={index} value={item.option}>
                {item.option}
              </option>
            ))}
          </select>
          <button
            className="bg-white p-3 rounded-xl"
            onClick={FolloupStage === "FollowUp2" ? openModal : addFollowUp}
          >
            Add
          </button>
        </div>
{console.log(notesByStage, "dekho inhe")}
        <div>
          {
        //   notesByStage[FolloupStage].length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">
                Notes for {FolloupStage}
              </h3>
              {notesByStage[FolloupStage].map((item, index) => (
                <div key={index} className="mb-2">
                  {item.subject}
                </div>
              ))}
            </div>
        //   )
          }
        </div>
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
              className="w-full p-3 border rounded-lg mb-4"
              rows="4"
              placeholder="Enter your note..."
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={addFollowUp}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUpSteps;
