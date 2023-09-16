"use client";

import Link from "next/link";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function Navbar() {
  const { userData, setUserData } = useContext(UserContext) as any;

  const handleLogOut = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUserData({
          authed: false,
        });
      }

      const data = await res.json();

      console.log(data);
    } catch (error) {}
  };

  const content = userData.authed ? (
    <>
      <Link
        href={"/profile"}
        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
      >
        <AccountBoxIcon />
        Profile
      </Link>

      <button
        className="transition-colors cursor-pointer
    bg-red-600 hover:bg-red-700 text-white"
        onClick={handleLogOut}
      >
        <LogoutIcon />
        Logout
      </button>
    </>
  ) : (
    <>
      <Link href={"/signup"} className="bg-pink-600 text-white">
        Sign up
      </Link>
      <Link href={"/signin"} className="bg-slate-200">
        Sign in
      </Link>
    </>
  );

  return (
    <nav className="bg-white shadow-lg border-b border-slate-300 flex items-center justify-between p-3 px-8 fixed w-full">
      <Link href={"/"} className="text-pink-700 font-bold text-2xl">
        BagStock
      </Link>

      <div className="nav__account flex gap-3">{content}</div>
    </nav>
  );
}
