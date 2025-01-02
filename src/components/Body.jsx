
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import Footer from './Footer'
import axiosInstance from '../context/AuthInterceptor'
import { useAuth } from '../context/AuthContext'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user)
  const {  isLoggedIn } = useAuth();


  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axiosInstance.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data.data));
      navigate("/feed")

    }
    catch (err) {
      if (err.status === 401) {
        navigate("/");
      }

      console.log(err);
    }



  }
  useEffect(() => {
    if (isLoggedIn()) {
      fetchUser();
      navigate("/feed");
    }
    else{
      navigate("/")
    }

  }, [isLoggedIn])
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-base-300 ">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body