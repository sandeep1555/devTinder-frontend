import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./Body"
import LogIn from "./LogIn"
import Profile from "./Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./Feed"
import Connections from "./Connections"
import Requests from "./Requests"


function App() {


  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>

            <Route path="/" element={<Body />}>
              <Route path="/login" element={<LogIn />} />
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
