"use client";
import UserContext from "@/context/UserContext";
import React, { useContext } from "react";

export default function UserStatus() {
  const { userData } = useContext(UserContext) as any;

  let content;
  let status;

  console.log(userData.user);

  if (userData.user) {
    if (userData.user?.status === "pending") {
      status = "Please wait for admins verification";
    } else if (userData.user?.status === "expired") {
      status = "Account is expired, Please revalidate.";
    } else {
      if (userData.user?.numberOfDelivers === 0) {
        status = "You are out of orders!";
      } else {
        status = "You are allowed to request, Happy shopping!";
      }
    }

    content = (
      <>
        <h1 className="text-4xl">
          Hello,{" "}
          {userData.user?.username?.length > 18
            ? userData.user?.username?.slice(0, 15) + "..."
            : userData.user?.username}{" "}
          !
        </h1>
        <p className="bg-slate-200 p-2 px-4 rounded-md shadow-lg w-fit mx-auto my-3">
          Code: {userData.user?.code}
        </p>
        <p>Status: {status}</p>
      </>
    );
  } else {
    content = (
      <>
        <h1 className="text-4xl">Hello and welcome!</h1>
        <p>plase sign up to request.</p>
      </>
    );
  }

  return <div className="py-10 text-center font-bold">{content}</div>;
}
