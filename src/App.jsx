import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./Body"
import LogIn from "./LogIn"
import Profile from "./Profile"
import SignUp from "./SignUp"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./Feed"


function App() {


  return (
    <>
 <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>

        <Route path="/" element={<Body/>}>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/Signup" element={<SignUp/>}/>
        <Route path="/profile" element={<Profile/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
