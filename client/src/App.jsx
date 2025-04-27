import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import { LoginPage } from './pages/loginPage/LoginPage'
import { SignupPage } from './pages/signupPage/SignupPage'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/homePage/HomePage'
import { useEffect } from 'react'
import { isAdminLoggedIn, isLoggedIn } from './utils/helperFunctions'
import { HotelInforPage } from './pages/hotelInforPage/HotelInforPage'
import { AdminViewPage } from './pages/adminViewPage/AdminViewPage'

function App() {

  function Protected({ children }) {
    const res = isLoggedIn();
    console.log("----", res)
    if (res == "Logged out") {
      return <Navigate to="/login" replace />
    }
    // else if (res == "admin") {
    //   // return <Navigate to="/adminView" replace />
    //   navigate("/adminView")
    // }
    // else {
      return children;
    // }
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

            <Route path='/adminView' element={
              <Protected>
                <AdminViewPage />
              </Protected>}
            />
        </Route>

      </Routes>
    </>
  )
}

export default App
