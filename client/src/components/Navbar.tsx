import Image from "next/image";
import React from "react";

import user from "assets/user.png";

interface IProps {
  contact: {
    avatar: string;
    email: string;
    name: string;
    status: boolean;
    _id: string;
  };
}

const Navbar: React.FC<IProps> = ({ contact }) => {
  return (
    <div className="w-full bg-[#202c33]">
      <div className="px-4 py-2 flex gap-2 items-center">
        {contact.avatar ? (
          <Image
            className="rounded-full"
            src={contact.avatar}
            alt="Chat"
            width={40}
            height={40}
          />
        ) : (
          <Image
            className="rounded-full"
            src={user}
            alt="Chat"
            width={40}
            height={40}
          />
        )}
        <p className="text-white">{contact.name}</p>
      </div>
    </div>
  );
};

export default Navbar;
