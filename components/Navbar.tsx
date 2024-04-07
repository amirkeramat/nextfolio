import Link from "next/link";
import React from "react";
import { LoginButton } from "./auth/login-button";

const Navbar = () => {
  return (
    <div className="w-full flex justify-start h-14 px-8 py-2">
      <LoginButton>
        <div className="rounded-xl text-white bg-violet-400 p-2">ورود</div>
      </LoginButton>
    </div>
  );
};

export default Navbar;
