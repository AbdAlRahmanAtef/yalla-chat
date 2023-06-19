import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { UserProps } from "@interfaces/";
import { logOut } from "redux/slices/userSlice";
import Contact from "./Contact";
import logo from "assets/logo.png";
import userImage from "assets/user.png";
import { setRoom } from "redux/slices/currentContact";
import axios from "axios";
import { socket } from "@constants/index";

const Sidebar = ({ setMessagesList }: { setMessagesList: any }) => {
  const [members, setMembers] = useState([]);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const getUsers = async () => {
    const { data } = await axios.get(`users/${user._id}`);
    setMembers(data);
  };

  const joinRoom = (room: any) => {
    const socketId =
      user._id > room ? room + "-" + user._id : user._id + "-" + room;
    socket.emit("join_room", socketId);
    socket.on("receive_message", (data: any) => {
      setMessagesList(data);
    });

    dispatch(setRoom(room));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex flex-col justify-between w-[100px] md:min-w-[200px] bg-[#111b21] pb-4 h-screen overflow-hidden border-r border-[#374045] ">
      <div className="flex items-center gap-2 px-4 py-2 shadow-sm shadow-[#412626] mb-4 bg-[#202c33]">
        <Image
          className="rounded-full"
          src={logo}
          alt="Chat"
          width={40}
          height={40}
        />
        <p className="text-white hidden md:block">Yalla Chat</p>
      </div>
      <div className="flex px-2 h-[90%] flex-col justify-between gap-1">
        <div className="flex h-[90%] flex-col gap-1 overflow-y-auto">
          {members?.map((contact: UserProps) => (
            <Contact
              key={contact._id}
              contact={contact}
              handleClick={() => joinRoom(contact._id)}
            />
          ))}
        </div>
        <div className="flex flex-col md:flex-row px-3 py-2 gap-3 justify-between bg-[#202c33] items-center rounded-md">
          {user.avatar ? (
            <Image
              className="rounded-full h-[40px] w-[40px]"
              src={user.avatar}
              width={40}
              height={40}
              alt={user.name}
            />
          ) : (
            <Image
              className="rounded-full h-[40px] w-[40px]"
              src={userImage}
              width={40}
              height={40}
              alt={user.name}
            />
          )}
          <button
            className="p-2 w-fit transition-colors hover:bg-red-500 rounded-full "
            onClick={() => {
              dispatch(logOut());
            }}
          >
            <AiOutlineLogout size={20} fill="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
