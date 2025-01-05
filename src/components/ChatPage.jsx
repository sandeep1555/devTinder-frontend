import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../context/AuthInterceptor';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, removeMessage } from '../utils/messageSlice';
import { BASE_URL } from "../utils/constants";
import { senderProfile } from '../utils/senderSlice';


const ChatPage = () => {

  const { senderId } = useParams();
  const navigate = useNavigate()
  const [content, setContent] = useState("");
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const receiverId = user && user._id;
  const messages = useSelector((store) => store.message);
  const senderProfileData = useSelector((store) => store.sender);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getAllMessages = async () => {

    try {
      const res = await axiosInstance.get("/message/" + senderId, { withCredentials: true })
      dispatch(addMessage(res.data?.data))
      scrollToBottom();
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleSendMessage = async () => {
    try {
      if (content === "") {
        return;
      }
      const res = await axiosInstance.post("/message/send/" + senderId, { senderId: senderId, receiverId: receiverId, content: content }, { withCredentials: true })
      getAllMessages()
      setContent("")
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    !messages && getAllMessages()
  }, [])


  const getSenderDetails = async () => {
    try {
      const res = await axiosInstance.get(BASE_URL + "/profile/" + senderId);
      dispatch(senderProfile(res?.data?.data));
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSenderDetails()
  }, [])

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  return user && (
    <div className="flex flex-col h-screen ">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-none">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => { navigate("/connections"); dispatch(removeMessage()); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <img src={senderProfileData?.photoURL} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
          <span className="ml-2 font-medium">{senderProfileData && `${senderProfileData.firstName} ${senderProfileData.lastName}`}</span>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-12">
        {messages && messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${msg.senderId._id === receiverId ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={msg.senderId.photoURL || msg.receiverId.photoURL} alt={`${msg.senderId.firstName || ""} ${msg.senderId.lastName || ""}`} className='object-contain' />
              </div>
            </div>
            <div className="chat-bubble">
              <p>{msg.content}</p>
              <small className="chat-footer">{new Date(msg.timeStamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="navbar bg-base-100 shadow-md fixed bottom-0">
        <div className="flex w-full space-x-2">
          <input
            type="text"
            value={content}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered w-full"
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-9.588-5.524a1 1 0 00-1.516.857v11.998a1 1 0 001.516.857l9.588-5.524a1 1 0 000-1.714z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage