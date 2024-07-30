import React, { createContext, useContext, useState } from "react"

const Context = createContext();

export default function StateContext({children}){
    // const [office, setOffice] = useState("");
    return (
        <Context.Provider
            // value={{
            //     office,
            //     setOffice
            // }}
        >
            {children}
        </Context.Provider>
    )
}


export const useStateContext = () =>{
    return useContext(Context);
}