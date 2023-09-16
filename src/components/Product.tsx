"use client";
import Image from "next/image";
import { toast } from "react-toastify";

type Params = {
  product: Product;
};

export default function Product({ product }: Params) {
  const handleRequestProduct = async (id: string) => {
    try {
      const res = await fetch(
        "http://localhost:8080/users/request-product/" + id,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg);
      }

      const data = await res.json();
    } catch (error: any) {
      toast.error(`${error.message ?? "Error while requesting."}`);
    }
  };

  return (
    <div
      className="bg-slate-100 p-5 w-fit flex flex-col items-center justify-between gap-4
    rounded-sm shadow-md text-center"
    >
      <div
        className="image__container w-[180px] h-[180px] object-contain overflow-hidden
        "
      >
        <Image
          width={180}
          height={180}
          src={product.imgUrl}
          alt={product.title}
          className="h-full"
        />
      </div>
      <h2 className="text-xl">
        {product.title.length > 15
          ? `${product.title.slice(0, 13)}...`
          : product.title}
      </h2>
      <p className="text-xl font-semibold flex-1">{product.price}$</p>
      <p className="w-[250px] flex-1 py-1">
        {product.description.length > 50
          ? `${product.description.slice(0, 48)}...`
          : product.description}
      </p>

      <button
        className="transition-colors bg-pink-600 hover:bg-pink-700 rounded-sm
      text-base text-white w-full py-2"
        onClick={(e) => handleRequestProduct(product._id)}
      >
        Request product
      </button>
    </div>
  );
}
