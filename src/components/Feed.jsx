import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import axiosInstance from "../context/AuthInterceptor";
import swipeRightIcon from "../assets/icons/swipe-right.png"
import swipeLeftIcon from "../assets/icons/swipe-left.png"


const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)
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
    !feedData && handleFeedData()
  }, [feedData])

  if (!feedData) return;
  if (feedData.length <= 0) return <h1 className="text-center mt-10">no new users found</h1>

  return (
    <div className="flex justify-around items-center md:my-10 my-[-10px]">
      <div className="md:flex justify-center items-center hidden">
        <span className="mx-4">swipe left to ignore</span>
        <img src={swipeLeftIcon} className="w-10 h-10" />

      </div>

      {feedData && <div className="relative">
        <div className="absolute md:top-1/2 md:right-1/2 top-1/4 left-32 flex-col justify-center  text-center">
          <span className="loading loading-spinner loading-md "></span>
          <h1 className="">searching developers......</h1>
        </div>
        <div className="flex justify-between text-xs mt-4 mb-[-10px] md:hidden font-semibold">
          <h1 className="flex justify-between"> <img src={swipeLeftIcon} className="w-4 h-4 mx-1" /> to ignore</h1>
          <h1 className="flex justify-between">  <img src={swipeRightIcon} className="w-4 h-4 mx-1" /> to send request</h1>
        </div>
        <UserCard user={feedData[0]} disabled={false} />
      </div>}
      <div className="md:flex justify-center items-center hidden">
        <img src={swipeRightIcon} className="w-10 h-10" />
        <span className="mx-4">swipe right to send request</span>
      </div>
    </div>
  )
}

export default Feed