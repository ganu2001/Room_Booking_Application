import { Route, Routes } from 'react-router'
import './App.css'
import { LoginPage } from './pages/loginPage/LoginPage'
import { SignupPage } from './pages/signupPage/SignupPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<>Hi</>}></Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </>
  )
}

export default App
