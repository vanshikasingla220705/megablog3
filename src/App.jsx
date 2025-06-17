import {useDispatch} from'react-redux'//iuhgriunkjnijbnriubin
import React from 'react'
import { useState ,useEffect} from 'react'
import './App.css'
import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()
  
  useEffect(() => {
  setLoading(true);
  authService.getCurrentUser()
    .then(user => {
      if(user) {
        dispatch(login(user));  // user data, not {userdata: user}
      } else {
        dispatch(logout());
      }
    })
    .catch(() => dispatch(logout()))
    .finally(() => setLoading(false));
}, []);



  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400 '>
      <div className='w-full block'>
         <Header/>
          <main>
            todo:<Outlet/>

          </main>
         <Footer/>
      </div>
    </div>
  ):(null)
}

export default App
