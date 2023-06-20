import { useEffect, useState } from "react";

import axios from "axios";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "styles/main.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMessages, setPrivateMemberMessages] = useState({});
  const [newMessages, setNewMessages] = useState({});

  axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

  useEffect(() => setIsSSR(false));

  if (isSSR) return null;

  return (
    <Provider store={store}>
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
}
