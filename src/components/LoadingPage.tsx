"use client";

import UserContext from "@/context/UserContext";
import { useContext } from "react";

export default function LoadingPage() {
  const { userData } = useContext(UserContext) as any;

  let isLoading = typeof userData.authed === "boolean";

  return (
    <div className={`loading__page ${isLoading && " fade__out"}`}>
      <span className="loading__circle"></span>
    </div>
  );
}
