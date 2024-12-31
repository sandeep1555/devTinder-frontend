import axios from "axios";
import {  useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import ErrorIcon from '../assets/icons/error-icon.png';
import { useAuth } from "../context/AuthContext";



const LogIn = () => {
  const [password, setPassword] = useState("");
  const [emailId, setemailId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
  const { logIn } = useAuth();



  const handleLogInButton = async () => {
    setError("")
    setIsLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true })
      dispatch(addUser(res?.data?.data))
      logIn(res?.data?.token);
      navigate("/feed")

    }
    catch (err) {
      setError(err.response.data || "something went wrong")
      console.log(err)

    }
    finally {
      setIsLoading(false)
    }
  }

  const handleSignUpButton = async () => {
    setError("")
    setIsLoading(true)
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true })
      dispatch(addUser(res.data.data))
      logIn(res?.data?.token);
      navigate("/profile")
    }
    catch (err) {
      setError(err.response.data || "something went wrong")
      console.log(err)
    }
    finally {
      setIsLoading(false)
    }
  }

 

  return (
    <div className={`flex justify-center  ${isLoginForm ? "md:mt-[15vh] mt-[5vh] " : "md:mt-[10vh]   "} `}>
      <div className="card bg-base-100 w-96 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title  justify-center mb-8">{isLoginForm ? "Log In" : "Sign Up"}</h2>
          <div>


            {!isLoginForm &&
              <><label className="form-control w-full max-w-xs mb-2">
                <div className="label">
                  <span className="label-text">First Name:</span>
                </div>
                <input type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs " onChange={(e) => setFirstName(e.target.value)} value={firstName} />
              </label>


                <label className="form-control w-full max-w-xs mb-2">
                  <div className="label">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs " onChange={(e) => setLastName(e.target.value)} value={lastName} />
                </label>
              </>}



            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input type="text" placeholder="Email ID" className="input input-bordered w-full max-w-xs " onChange={(e) => setemailId(e.target.value)} value={emailId} />
            </label>


            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text">Password:</span>
              </div>
              <input type="password" placeholder="password" className="input input-bordered w-full max-w-xs " onChange={(e) => setPassword(e.target.value)} value={password} />
            </label>


          </div>
          {error && (
            <p className="text-red-500 flex items-center">
              <img src={ErrorIcon} alt="Error Icon" className="w-4 h-4 mr-1" />
              {error}
            </p>
          )}          <div className="card-actions justify-center">
            <button
              className="btn btn-primary px-8 my-4"
              onClick={isLoginForm ? handleLogInButton : handleSignUpButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md mx-2"></span>
              ) : isLoginForm ? "LogIn" : "Sign Up"}
            </button>

          </div>
          <p className="my-2">{isLoginForm ? "new user," : "already have account,"}<span className="underline text-blue-500 cursor-pointer" onClick={() => { setIsLoginForm(!isLoginForm); setemailId(""); setPassword(""); setFirstName(""); setLastName(""); setError("") }}>{isLoginForm ? "sign Up" : "LogIn"}</span></p>
        </div>
      </div>
    </div>
  )
}

export default LogIn