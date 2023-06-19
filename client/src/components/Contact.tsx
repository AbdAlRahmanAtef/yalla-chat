import React, { useContext } from "react";
import { UserProps } from "interfaces";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setContact } from "redux/slices/currentContact";
import user from "assets/user.png";

interface IProps {
  contact: UserProps;
  handleClick: any;
}
const Contact: React.FC<IProps> = ({ contact, handleClick }) => {
  const { currentContact } = useSelector((state: any) => state.currentContact);
  const dispatch = useDispatch();
  const bgColor = currentContact._id === contact._id ? "#2a3942" : "#111b21";

  return (
    <div
      className={`flex items-center relative bg-[${bgColor}] gap-2 cursor-pointer px-4 py-1 rounded-md hover:bg-[#2a3942] transition-colors `}
      onClick={() => {
        handleClick();
        dispatch(setContact(contact));
      }}
    >
      {contact.avatar ? (
        <Image
          className="rounded-full w-10 h-10"
          src={contact.avatar}
          width={49}
          height={49}
          alt={contact.name}
        />
      ) : (
        <Image
          className="rounded-full w-10 h-10"
          src={user}
          width={49}
          height={49}
          alt={contact.name}
        />
      )}
      <p className="hidden md:block text-xs font-bold text-[#FCFCFC]">
        {contact.name}
      </p>
    </div>
  );
};

export default Contact;
