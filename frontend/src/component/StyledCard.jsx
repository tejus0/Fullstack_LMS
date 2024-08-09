import React from 'react'
import { FaPercentage } from "react-icons/fa";

const StyledCard = ({ icon, label, value, isPercentage }) => {
    return (
        <div
            className="border-[1px] p-5 rounded-lg cursor-pointer px-12 hover:bg-purple-300 bg-purple-100 shadow-purple-300 shadow-2xl flex flex-col gap-4 hover:scale-110 transition-all flex-1 items-center"
        >
            <div className="flex flex-col gap-2">
                <p className="font-extralight text-lg">{label}</p>
                <div className="flex gap-5 items-center text-lg">
                    <div className="text-gray-500">{icon}</div>
                    <p>{value}</p>
                    {isPercentage && <FaPercentage />}

                    {/* <ArrowUpward color="success" /> */}
                </div>
            </div>
        </div>
    )
}

export default StyledCard