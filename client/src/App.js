import React, {useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useDispatch } from "react-redux";
import { getMe } from './redux/features/auth/authSlice.js'
// import { ToastContainer } from 'react-toastify'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <AppRouter></AppRouter>
  );
}

export default App;
