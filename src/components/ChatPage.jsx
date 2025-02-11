import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axiosInstance from "../context/AuthInterceptor";
import { removeSenderProfile, senderProfile } from "../utils/senderSlice";


const ChatPage = () => {

  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const receiverProfileData = useSelector((store) => store.sender);
  const chatContainerRef = useRef(null);



  const fetchChatMessages = async () => {
    const chat = await axiosInstance.get(BASE_URL + "/message/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.data.messages);

    const chatMessages = chat?.data?.data?.messages.map((msg) => {

      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        photoURL: senderId?.photoURL,
        createdAt: createdAt,
        text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
    getReceiverDetails();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, photoURL, text }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, photoURL, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const handleSendMessage = () => {
    if (newMessage == "") {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      photoURL: user.photoURL,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };


  const getReceiverDetails = async () => {
    try {
      const res = await axiosInstance.get(BASE_URL + "/profile/" + targetUserId);
      dispatch(senderProfile(res?.data?.data));
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen ">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-none">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => { navigate("/connections"); setMessages(null); dispatch(removeSenderProfile()) }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <img src={receiverProfileData?.photoURL} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
          <span className="ml-2 font-medium">{receiverProfileData && `${receiverProfileData.firstName} ${receiverProfileData.lastName}`}</span>
        </div>
      </div>

      {/* Chat Content */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 mb-12">
        {messages && messages.map((msg) => (
          <div
            key={msg?._id}
            className={`chat ${user?.firstName === msg.firstName ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={user?.firstName === msg.firstName ? user.photoURL : msg?.photoURL} alt={`${msg.firstName || ""} ${msg.lastName || ""}`} className='object-contain' />
              </div>
            </div>
            <div className="chat-bubble">
              <p>{msg.text}</p>
              <small className="chat-footer">{msg.createdAt ? new Date(msg?.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "just now"}</small>
            </div>
          </div>
        ))}
        <div />
      </div>

      {/* Input Area */}
      <div className="navbar bg-base-100 shadow-md fixed bottom-0">
        <div className="flex w-full space-x-2">
          <input
            type="text"
            value={newMessage}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered w-full"
          />
          <button className="btn btn-secondary " onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage