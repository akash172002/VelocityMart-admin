import { useState } from "react";
import Nav from "../components/Nav";
import { signIn, useSession } from "next-auth/react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  if (!session || !session.user) {
    return (
      <div>
        <div className={"bg-bgGray w-screen h-screen flex items-center"}>
          <div className="text-center w-full btn-full-back">
            <div className="btn-back">
              <p>Admin should login with Google!</p>
              <button
                onClick={() => signIn("google")}
                className="bg-primary text-white shadow-lg btn-login p-2 px-4 rounded-lg"
              >
                Login with google
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!session.user.email) {
    return (
      <div>
        <div className={"bg-bgGray w-screen h-screen flex items-center"}>
          <div className="text-center w-full btn-full-back">
            <div className="btn-back">
              <p>Email not found in session</p>
              <button
                onClick={() => signIn("google")}
                className="bg-primary text-white shadow-lg btn-login p-2 px-4 rounded-lg"
              >
                Login with google
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session.isAdmin) {
    return (
      <div>
        <div className={"bg-bgGray w-screen h-screen flex items-center"}>
          <div className="text-center w-full btn-full-back">
            <div className="btn-back">
              <p>You are not admin</p>
              <button
                onClick={() => signIn("google")}
                className="bg-primary text-white shadow-lg btn-login p-2 px-4 rounded-lg"
              >
                Login with google
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>

      <div className=" flex">
        <Nav show={showNav} />
        <div className=" flex-grow p-3">{children}</div>
      </div>
    </div>
  );
}
