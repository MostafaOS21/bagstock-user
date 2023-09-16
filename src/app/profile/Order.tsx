import Image from "next/image";

export default function Order({ order }: { order: Order }) {
  return (
    <div className="product__profile">
      <Image
        width={250}
        height={250}
        src={order.productId.imgUrl}
        alt={order.productId.title}
      />
      <h3>{order.productId.title}</h3>
      <p>{order.productId.price}$</p>
    </div>
  );
}
