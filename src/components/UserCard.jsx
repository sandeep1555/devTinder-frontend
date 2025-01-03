import axiosInstance from "../context/AuthInterceptor";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UserCard = ({ user, disabled }) => {

  const dispatch = useDispatch();
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isIgnoreLoading, setIsIgnoreLoading] = useState(false);
  const { firstName, lastName, photoURL, age, skills, about, _id, gender } = user;
  const [isTruncated, setIsTruncated] = useState(true);
  const [rotate, setRotate] = useState(0); // State to track real-time rotation while dragging
  const [swipeDirection, setSwipeDirection] = useState(null); // Track swipe direction for logic when drag ends
  const [opacity, setOpacity] = useState(false)

  const handleSendRequest = async (status, userId) => {
    setIsRequestLoading(status === "interested");
    setIsIgnoreLoading(status === "ignored");
    try {
      await axiosInstance.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      console.error(err);
    } finally {
      setIsRequestLoading(false);
      setIsIgnoreLoading(false);
      setSwipeDirection(null)
    }
  };

  const toggleText = () => {
    setIsTruncated(!isTruncated);
  };
  console.log(opacity)
  return (<AnimatePresence>
    <motion.div
      drag
      dragElastic={1}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }} // Initial rotation is 0
      animate={{ opacity: 1, scale: 1, rotate }} // Rotate dynamically based on drag
      exit={{ opacity: 0, rotate: 20 }}
      onDrag={(event, info) => {
        const { x } = info.offset; // Get the x-axis offset
        setRotate(x / 10); // Update rotation while dragging

        // Show bubble based on swipe direction
        if (x > 70) {
          setOpacity(true)
          setSwipeDirection("right");
        } else if (x < -70) {
          setSwipeDirection("left");
          setOpacity(true)
        } else {
          setSwipeDirection(null); // No valid swipe
        }
      }}
      onDragEnd={(event, info) => {
        const { x } = info.offset;
        const swipeThreshold = 70;

        if (x > swipeThreshold) {

          handleSendRequest("interested", _id);
        } else if (x < -swipeThreshold) {

          handleSendRequest("ignored", _id);
        }

        setSwipeDirection(null); // Reset swipe direction
        setRotate(0); // Reset rotation
        setOpacity(false)
      }}
      className={`card bg-base-100 shadow-xl  ${!disabled ? "mx-3 w-[340px] md:w-96" : "mx-1  w-[340px] md:w-96"
        } md:my-10 my-5 md:mt-0 relative`} // Add `relative` for bubble positioning
    >
      {/* Bubble for swipe feedback */}
      {swipeDirection && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`absolute md:top-1/4 top-0 transform -translate-y-1/2 px-6 py-3 rounded-xl text-white font-bold md:text-2xl shadow-lg  ${swipeDirection === "right"
            ? "bg-green-500 md:left-full left-[-150px] ml-4" // Position on the right
            : "bg-red-500 md:right-full right-[-100px] mr-4" // Position on the left
            }`}
          style={{
            borderRadius: window.innerWidth < 768
              ? swipeDirection === "right"
                ? "24px 24px 8px 24px" // Mobile reversed for right
                : "24px 24px 24px 8px" // Mobile reversed for left
              : swipeDirection === "right"
                ? "24px 24px 24px 8px" // Default for right
                : "24px 24px 8px 24px", // Default for left
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          }}
        >
          {swipeDirection === "right" ? "Send Request" : "Ignore"}
        </motion.div>

      )}

      {/* Card Content */}
      <div className={`card-body  ${opacity && 'opacity-70'} `}>
        <figure>
          <img
            draggable="false"
            className={disabled ? "h-[520px]" : "h-[450px]"}
            src={photoURL || ""}
            alt="photo"
          />
        </figure>
        <h2 className="card-title text-2xl">
          {firstName + " " + lastName}
          {age && (
            <div className="badge badge-secondary text-xl">
              {age}
              {gender && <span>{"(" + gender[0] + ")"}</span>}
            </div>
          )}
        </h2>
        {skills.length > 0 && (
          <h3 className="font-medium">
            <span className="font-black">Skills:</span> {skills}
          </h3>
        )}
        <p className={isTruncated ? "truncate" : ""}>
          <span className="font-black">About:</span> {about}
        </p>
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
          {!disabled && (
            <>
              <button
                className="btn btn-primary"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                {isIgnoreLoading ? (
                  <span className="loading loading-spinner loading-md mx-[9px]"></span>
                ) : (
                  "ignore"
                )}
              </button>
              <button
                className="btn btn-primary bg-black text-white"
                onClick={() => handleSendRequest("interested", _id)}
              >
                {isRequestLoading ? (
                  <span className="loading loading-spinner loading-md mx-[32px]"></span>
                ) : (
                  "send Request"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  </AnimatePresence>


  );
};

export default UserCard;
