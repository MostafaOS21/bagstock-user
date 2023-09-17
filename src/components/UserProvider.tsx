"use client";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import UserContext from "@/context/UserContext";
import LoadingPage from "./LoadingPage";
//Toast Container
import { ToastContainer } from "react-toastify";
// import "react-toastify/ReactToastify.css";
import "react-toastify/ReactToastify.min.css";

export default function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<{
    authed: boolean | "loading" | undefined;
    userData?: any;
  }>({ authed: undefined });

  const verifyAuth = async () => {
    try {
      setUserData({ authed: "loading" });
      const URL = process.env.NEXT_PUBLIC_BACK_END as string;
      console.log(process.env);
      const res = await fetch(`${URL}/auth/verify-auth`, {
        method: "POST",
        credentials: "include",
        next: { revalidate: 3600 },
      });

      if (res.status === 401) {
        setUserData({ authed: false });
        throw new Error("Unauthorized!");
      }

      if (res.status === 200) {
        const data = await res.json();

        setUserData({ ...data, authed: true });
      }
    } catch (error) {}
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Navbar />
      {userData.authed === "loading" || userData.authed === undefined ? (
        <LoadingPage />
      ) : (
        children
      )}
      <ToastContainer position="bottom-right" />
    </UserContext.Provider>
  );
}
