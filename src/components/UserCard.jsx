import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { useState } from "react";


const UserCard = ({ user, disabled }) => {
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isIgnoreLoading, setIsIgnoreLoading] = useState(false);
  const dispatch = useDispatch();

  const { firstName, lastName, photoURL, age, skills, about, _id, gender } = user;


  const [isTruncated, setIsTruncated] = useState(true)


  const handleSendRequest = async (status, userId) => {

    setIsRequestLoading(status === "interested");
    setIsIgnoreLoading(status === "ignored");
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true })
      dispatch(removeFeed(userId))
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setIsRequestLoading(false)
      setIsIgnoreLoading(false)
    }
  }

  const toggleText = () => {
    setIsTruncated(!isTruncated);
  };



  return (

    <div className={`card  bg-base-100  shadow-xl ${!disabled ? "mx-3 w-96" : "mx-1 w-96"} md:my-10 my-5 md:mt-0 `}>
      <figure>
        <img className={disabled ? "h-[520px]" : "h-[450px]"}
          src={photoURL && photoURL}
          alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + " " + lastName}
          {age && <div className="badge badge-secondary">{age}{gender && <span>{"(" + gender[0] + ")"}</span>}</div>}
        </h2>
        {skills.length > 0 && <h3 className="font-medium">Skills: {skills}</h3>}
        <p className={isTruncated ? 'truncate' : ''}>About: {about}</p>
        {isTruncated && about.length >= 45 && (
          <span
            className="text-blue-500 cursor-pointer"
            onClick={toggleText}
          >
            Read more
          </span>
        )}
        {!isTruncated && about.length >= 45 && (
          <span
            className="text-blue-500 cursor-pointer"
            onClick={toggleText}
          >
            Show less
          </span>
        )}
        <div className="card-actions justify-end">
          {!disabled && <><button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>{isIgnoreLoading ? <span className="loading loading-spinner loading-md mx-[9px]"></span> : "ignore"}</button>
            <button className="btn btn-primary bg-black text-white" onClick={() => handleSendRequest("interested", _id)}>{isRequestLoading ? <span className="loading loading-spinner loading-md  mx-[32px]"></span> : "send Request"}</button></>}
        </div>
      </div>
    </div>
  )
}

export default UserCard