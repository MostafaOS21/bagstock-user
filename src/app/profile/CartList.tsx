"use client";
import { useEffect, useState, useContext, ReactNode } from "react";
import Order from "./Order";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function CartList({ userId }: { userId: string }) {
  const { userData } = useContext(UserContext) as any;
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getCart = async () => {
      const URL = process.env.NEXT_PUBLIC_BACK_END as string;
      try {
        const res = await fetch(`${URL}/users/cart/${userId}`, {
          method: "GET",
          credentials: "include",
        });

        const cart: { orders: Order[] } = await res.json();

        if (res.ok) {
          const currDate = new Date();
          setOrders(cart.orders);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!userData.authed) {
      return router.push("/signin");
    } else {
      getCart();
    }
  }, [userData.authed, router, userId]);

  return (
    <div className="px-6 py-14">
      <h1 className="text-4xl mb-14 text-center">Prevoius Orders:</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-10">
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
