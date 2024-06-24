import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'

const ProtectedRoutes = () => {
    // let auth = {'token':false};
    // localStorage.setItem("token",false)
    // console.log(auth.token,"token")
    return (
        // <Route>
    //   auth.token ? <Outlet/> : <Navigate to='/login'/>
      localStorage.getItem("token") ? <Outlet/> : <Navigate to='/login'/>
    //   </Route>
  )
}

export default ProtectedRoutes