import React from 'react'

const AssignAuto = () => {
  const baseUrl = import.meta.env.VITE_API;
  return (
    <div>
        <button onClick={`${baseUrl}/autoassign`}>Fetch</button>
    </div>
  )
}

export default AssignAuto