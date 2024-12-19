
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from './utils/constants';
import { removeUser } from './utils/userSlice';

const NavBar = () => {

  const user = useSelector((store) => store.user);
 const navigate=useNavigate();
 const dispatch=useDispatch();

   const handleLogout=async()=>
   {
    await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
    dispatch(removeUser());
    navigate("/login")



   }


  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">daisyUI</Link>
      </div>
      <div className="flex-none gap-2">
        {/* <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div> */}
        {user && (<div className="dropdown dropdown-end flex">
          <div className='py-3 px-2'>welcome,{user.firstName}</div>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>)}
      </div>
    </div>
  )
}

export default NavBar