import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./Body"
import Login from "./LogIn"
import Profile from "./Profile"
import SignUp from "./SignUp"


function App() {


  return (
    <>

    <BrowserRouter basename="/">
      <Routes>
        <Route path="/">
        <Route path="/" element={<Body/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Signup" element={<SignUp/>}/>
        <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
