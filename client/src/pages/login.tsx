import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { AiFillCamera } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "redux/slices/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Head from "next/head";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({ name: "", url: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    file &&
      reader(file).then((result: string) => {
        setImage({ name: file.name, url: result });
        setFormData({ ...formData, avatar: result });
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isSignUp) {
      if (
        formData.name !== "" &&
        formData.email !== "" &&
        formData.password !== ""
      ) {
        try {
          setLoading(true);

          const { data } = await axios.post(`/auth/register`, formData);

          dispatch(setUser({ user: data.user, token: data.token }));
          setFormData({ name: "", password: "", email: "", avatar: "" });
          setImage({ name: "", url: "" });
          router.push("/");
        } catch (error: any) {
          toast.error("Wrong Email or Password");
        } finally {
          setLoading(false);
        }
      }
    } else {
      if (formData.email !== "" && formData.password !== "") {
        try {
          setLoading(true);

          const { data } = await axios.post(`/auth/login`, formData);

          dispatch(setUser({ user: data.user, token: data.token }));
          setFormData({ name: "", password: "", email: "", avatar: "" });
          setImage({ name: "", url: "" });
          router.push("/");
        } catch (error: any) {
          toast.error("Wrong Email or Password");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      {" "}
      <Head>
        <title>Yalla-Chat</title>
      </Head>
      <div className="flex items-center justify-center w-screen h-screen p-4 bg-gradient-to-r from-[#373B44] to-[#4286f4]">
        <form
          className="p-6 rounded-lg bg-[#ECF2FF] relative"
          onSubmit={handleSubmit}
        >
          <span className=" flex items-center justify-center absolute top-[-40px] left-[50%] translate-x-[-50%] w-[80px] h-[80px] bg-[#13005A] rounded-full ">
            {image.url ? (
              <img className="rounded-full" src={image.url} alt="Chat" />
            ) : (
              <CiUser size={40} fill="#ECF2FF" />
            )}
          </span>

          <div className="mt-12 flex flex-col gap-5">
            {/* REGISTER */}
            {isSignUp && (
              <>
                <div className="flex items-center justify-center bg-[#00425A] h-14 w-full relative rounded-lg cursor-pointer ">
                  <span className=" absolute flex items-center justify-center w-fit">
                    <AiFillCamera fill="#ECF2FF" size={22} />
                  </span>
                  <input
                    className=" bg-[#00425A] h-full w-full opacity-0 absolute top-0 left-0 py-3 px-4 cursor-pointer "
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      //@ts-ignore
                      handleImageChange(e.target.files[0]);
                    }}
                  />
                  <p className="max-w-fit">
                    {image.name.length > 10
                      ? `${image.name.slice(0, 10)}...`
                      : image.name}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="flex items-center justify-center h-[56px] w-[56px] rounded-tl-lg rounded-bl-lg bg-[#13005A]">
                    <BsFillPersonFill fill="#ECF2FF" size={22} />
                  </span>
                  <input
                    className="focus:border-[#13005a] border-l-0 border-2 bg-[#00425A] h-[56px] py-3 px-4 rounded-lg rounded-tl-none rounded-bl-none outline-none border-transparent text-[#eee] caret-inherit"
                    type="text"
                    required
                    value={formData.name}
                    placeholder="Name"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </>
            )}
            <div className="flex items-center">
              <span className="flex items-center justify-center h-[56px] w-[56px] rounded-tl-lg rounded-bl-lg bg-[#13005A]">
                <MdEmail fill="#ECF2FF" size={22} />
              </span>
              <input
                className="focus:border-[#13005a] border-l-0 border-2 bg-[#00425A] h-[56px] py-3 px-4 rounded-lg rounded-tl-none rounded-bl-none outline-none border-transparent text-[#eee] caret-inherit"
                type="email"
                required
                value={formData.email}
                placeholder="Email Address"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="flex items-center">
              <span className="flex items-center justify-center h-[56px] w-[56px] rounded-tl-lg rounded-bl-lg bg-[#13005A]">
                <IoMdLock fill="#ECF2FF" size={22} />
              </span>
              <input
                className="focus:border-[#13005a] border-l-0 border-2 bg-[#00425A] h-[56px] py-3 px-4 rounded-lg rounded-tl-none rounded-bl-none outline-none border-transparent text-[#eee] caret-inherit"
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className=" gap-2 w-full h-14 mb-5 bg-[#13005A] text-[#ECF2FF] rounded-lg hover:opacity-90 transition-opacity mt-5"
            >
              {isSignUp ? (
                loading ? (
                  <p className="flex items-center justify-center gap-2">
                    <span className="block items-center justify-center animate-spin w-6 h-6 bg-transparent border-4 rounded-full border-l-[#00425A]"></span>
                    <span>Loading...</span>
                  </p>
                ) : (
                  "Sign Up"
                )
              ) : loading ? (
                <p className="flex items-center justify-center gap-2">
                  <span className="block items-center justify-center animate-spin w-6 h-6 bg-transparent border-4 rounded-full border-l-[#00425A]"></span>
                  <span>Loading...</span>
                </p>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
          <p
            className="cursor-pointer text-sm transition-opacity hover:opacity-90"
            onClick={() => setIsSignUp((perv) => !perv)}
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
