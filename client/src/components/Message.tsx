import { socket } from "@constants/index";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

interface IProps {
  message: any;
  messages: [];
  setMessages: (data: any) => void;
  handelEdit: (message: any) => void;
}

const Message: React.FC<IProps> = ({
  message,
  setMessages,
  messages,
  handelEdit,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const optionsRef = useRef<HTMLDivElement>(null);
  const customClass =
    message.sender === user._id
      ? "bg-[#005c4b]  rounded-tr-none items-end"
      : "bg-[#202c33] rounded-tl-none items-start";

  const handleDelete = async () => {
    try {
      socket.emit("delete_message", {
        id: message._id,
        socketId: message.socketId,
      });

      setMessages(messages.filter((msg: any) => msg._id !== message._id));

      setShowOptions(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handler = (e: any) => {
      if (
        showOptions &&
        optionsRef?.current &&
        !optionsRef?.current?.contains(e.target)
      ) {
        setShowOptions(false);
      }
    };

    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [showOptions]);

  return (
    <div
      className={`w-full flex ${
        message.sender === user._id ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-start justify-center ${
          message.sender === user._id ? "flex-row-reverse" : "flex-row"
        }`}
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}
      >
        <div
          className={`${
            message.sender === user._id ? "message-sender" : "message-receiver"
          }`}
        ></div>
        <div className="relative">
          <div
            className={`flex flex-col px-4 py-1 text-[#ECF2FF] rounded-lg ${customClass}`}
          >
            <p>{message.content}</p>
            <span className="text-[10px]">{message.time}</span>
          </div>
          <p
            className={`absolute top-0 left-0 transition-opacity rounded-full flex justify-center items-center p-1 z-10 cursor-pointer ${customClass} ${
              showArrow ? "opacity-1" : "opacity-0"
            }`}
            onClick={() => setShowOptions((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#7c8c95"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 10l5 5m0 0l5-5"
              />
            </svg>
          </p>
          {showOptions && (
            <div
              className={`bg-[#233138] absolute top-[30px] z-20 p-2 rounded-md text-white ${
                message.sender === user._id ? "right-0" : "left-0"
              }`}
              ref={optionsRef}
            >
              {user._id === message.sender && (
                <p
                  className="py-1 px-3 hover:bg-[#111b21] transition cursor-pointer rounded-md"
                  onClick={() => {
                    handelEdit(message);
                    setShowOptions(false);
                    setShowArrow(false);
                  }}
                >
                  Edit
                </p>
              )}
              <p
                className="py-1 px-3 hover:bg-[#111b21] transition cursor-pointer rounded-md"
                onClick={handleDelete}
              >
                Delete
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
