import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { removeConnections } from '../utils/connectionsSlice';
import { resetFeed } from '../utils/feedSlice';
import { resetRequest } from '../utils/requestsSlice';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logOut, isLoggedIn } = useAuth();

  const isUserLoggedIn = isLoggedIn() && user;

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeConnections());
      dispatch(resetFeed());
      dispatch(resetRequest());
      logOut();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      <div className="flex-none gap-2">
        {isUserLoggedIn && (
          <>
            <button className="font-bold text-sm hover:text-gray-600 mr-1 md:text-lg md:mr-6" onClick={() => navigate("/feed")}>Home</button>
            <button className="font-bold hover:text-gray-600 text-sm mr-1 md:text-lg md:mr-6 md:block hidden" onClick={() => navigate("/requests")}>Requests</button>
            <button className="font-bold hover:text-gray-600 text-sm mr-1 md:text-lg md:mr-6" onClick={() => navigate("/connections")}>Connections</button>
            <div className='py-3 hidden md:block'>Hi, {user.firstName.length > 10 ? `${user.firstName.slice(0, 10)}...` : user.firstName}</div>
          </>
        )}
        {isUserLoggedIn && (
          <div className="dropdown dropdown-end flex">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.photoURL || "https://via.placeholder.com/40"} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><Link to="/feed">Home</Link></li>
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
