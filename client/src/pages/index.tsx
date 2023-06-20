import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import Message from "@components/Message";
import Sidebar from "@components/Sidebar";
import { socket } from "@constants/index";
import Navbar from "@components/Navbar";

const Home = () => {
  const [messagesList, setMessagesList] = useState<any>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<any>({});
  const [mode, setMode] = useState("send");
  const [message, setMessage] = useState("");
  const { currentContact, currentRoom } = useSelector(
    (state: any) => state.currentContact
  );
  const { user, token } = useSelector((state: any) => state.user);
  const messagesRef = useRef(null);
  const pickerRef = useRef(null);
  const router = useRouter();

  const handleEdit = (message: any) => {
    setMessage(message.content);
    setMode("update");
    setCurrentMessage(message);
    console.log(message);
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prevMessage) => prevMessage + emoji.native);
  };

  const sendMessage = async () => {
    const socketId =
      user._id > currentRoom
        ? currentRoom + "-" + user._id
        : user._id + "-" + currentRoom;

    if (message !== "" && socketId !== "") {
      const messageData = {
        socketId,
        to: currentRoom,
        sender: user._id,
        author: user,
        content: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("send_message", messageData);

      setMessagesList((list: any) => [...list, messageData]);
    }

    setMessage("");

    //@ts-ignore
    messagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleSendClick = (e: any) => {
    e.preventDefault();
    if (mode === "update") {
      try {
        socket.emit("update_message", {
          id: currentMessage._id,
          content: message,
          socketId: currentMessage.socketId,
        });

        const found = messagesList.map((msg: any) =>
          msg._id === currentMessage._id ? (msg.content = message) : msg
        );
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    } else {
      sendMessage();
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      if (
        showEmojiPicker &&
        pickerRef?.current &&
        //@ts-ignore
        !pickerRef?.current?.contains(e.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      setMessagesList(data);

      console.log(process.env.NEXT_PUBLIC_BASE_URL);

      //@ts-ignore
      messagesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  }, [socket]);

  if (!user) return null;

  return (
    <div className="flex">
      <Sidebar setMessagesList={setMessagesList} />
      <div className="w-full relative flex flex-col justify-between h-screen bg-[#001d3d] bg-[url('../assets/loading.png')]">
        {currentContact._id && <Navbar contact={currentContact} />}
        <div className="p-4 h-[85%]  overflow-y-auto">
          <div className="flex flex-col gap-1">
            {messagesList.length !== 0 &&
              messagesList.map((message: any, idx: number) => (
                <>
                  <Message
                    key={message._id}
                    message={message}
                    handelEdit={handleEdit}
                    setMessages={setMessagesList}
                    messages={messagesList}
                  />
                  {idx === messagesList?.length - 1 && messagesRef && (
                    <>
                      <div className="h-[50px]" />
                      <div className="" ref={messagesRef} />
                    </>
                  )}
                </>
              ))}
          </div>
        </div>
        {currentRoom ? (
          <form
            onSubmit={handleSendClick}
            className="p-4 bg-[#202c33] flex items-center justify-center w-full gap-3"
          >
            <p
              className="cursor-pointer"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 16 16"
              >
                <g fill="#8696a0">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75a.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25a.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                </g>
              </svg>
            </p>
            <input
              className="bg-[#2a3942] w-full text-[#fff] px-3 py-3 text-lg rounded-md caret-inherit border-none outline-none"
              type="text"
              placeholder="Write Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {showEmojiPicker && (
              <div className="absolute bottom-[86px] left-0" ref={pickerRef}>
                {" "}
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
            <div
              className={`${
                message ? "cursor-pointer" : "cursor-not-allowed"
              } text-[#7c8c95]`}
              onClick={handleSendClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
              >
                <path
                  fill="currentColor"
                  d="M3.79 2.625c-.963-.46-2.021.42-1.746 1.451l2.016 7.533a1 1 0 0 0 .824.732l9.884 1.412c.286.04.286.454 0 .495l-9.883 1.411a1 1 0 0 0-.824.732l-2.017 7.537c-.275 1.03.783 1.91 1.746 1.451L25.288 15.13c.949-.452.949-1.804 0-2.257L3.79 2.626Z"
                />
              </svg>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] text-3xl font-bold">
            <p className="text-center">Send and Receive messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
