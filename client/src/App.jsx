import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import { LoginPage } from './pages/loginPage/LoginPage'
import { SignupPage } from './pages/signupPage/SignupPage'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/homePage/HomePage'
import { useEffect } from 'react'
import { isLoggedIn } from './utils/helperFunctions'
import { HotelInforPage } from './pages/hotelInforPage/HotelInforPage'

function App() {

  function Protected({ children }) {
    if (!isLoggedIn()) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>

        <Route path='/' element={<Layout />}>
            <Route path='/' element={
              <Protected>
                <HomePage />
              </Protected>}
            />
            <Route path='/hotel/:hotelId' element={
              <Protected>
                <HotelInforPage />
              </Protected>}
            />
        </Route>

      </Routes>
    </>
  )
}

export default App
