import React from "react";
import Product from "./Product";

export default async function ProductsList() {
  const URL = process.env.BACK_END as string;
  const res = await fetch(`${URL}/products/get-all`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  const products: Product[] = data?.products;

  return (
    <div
      className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4
    justify-center"
    >
      {products.map((product) => (
        <Product product={product} key={product._id} />
      ))}
    </div>
  );
}
