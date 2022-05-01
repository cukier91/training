import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/authSlice";

const ExampleRedux = () => {

    const dispatch=useDispatch()
    const authToken=useSelector((state) => state.auth.authToken)

  return (
    <div>
        <button onClick={() => dispatch(login("token"))}>Login</button>
        <span>{authToken}</span>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>

  )
}

export default ExampleRedux