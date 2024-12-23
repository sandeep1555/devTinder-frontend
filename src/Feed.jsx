import axios from "axios"
import { BASE_URL } from "./utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";


const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)
  const navigate = useNavigate();
  const handleFeedData = async () => {

    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeed(res.data));

    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    user ? handleFeedData() : navigate("/login")
  }, [])

  if (!feedData) return;
  if (feedData.length <= 0) return <h1 className="text-center mt-10">no new users found</h1>

  return (
    <div className="flex justify-center md:my-10 my-4  ">
      {feedData && <UserCard user={feedData[0]} disabled={false} />}
    </div>
  )
}

export default Feed