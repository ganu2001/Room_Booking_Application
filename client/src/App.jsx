import { Route, Routes } from 'react-router'
import './App.css'
import { LoginPage } from './pages/loginPage/LoginPage'
import { SignupPage } from './pages/signupPage/SignupPage'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/homePage/HomePage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>

        <Route path='/' element={<Layout />}>
            <Route path='/' element={<HomePage />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
