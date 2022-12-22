import React, { useState } from 'react'
import Login from './components/account/Login'
import DataProvider from './context/DataProvider'
import Home from './components/Home/Home'

import Header from './components/Header/Header'


import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ isAuthenticated, ...props }) => {

  return isAuthenticated ?
    <>
      <Header />
      <Outlet />
    </>
    :
    <Navigate replace to='/login' />
}




const App = () => {

  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        
        <div style={{ marginTop: 70 }}>
          <Routes >
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/' element={<Home />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App