import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import LogIn from "./components/LogIn"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import ChatPage from "./components/ChatPage"


function App() {


  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>


            <Route path="/" element={<Body />}>
              <Route path="/message/:senderId" element={<ChatPage />} />
              <Route path="/" element={<LogIn />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />}></Route>
              <Route path="/requests" element={<Requests />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
