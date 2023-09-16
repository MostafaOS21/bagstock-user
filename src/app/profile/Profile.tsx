"use client";

import UserStatus from "@/components/UserStatus";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import CartList from "./CartList";

export default function Profile() {
  const { userData } = useContext(UserContext) as any;
  const router = useRouter();

  useEffect(() => {
    if (!userData.authed) {
      router.push("/signin");
    }
  }, [userData.authed]);

  return (
    <div className="pt-24">
      <UserStatus />
      <CartList userId={userData.user?.id} />
    </div>
  );
}
