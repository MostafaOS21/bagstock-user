type Product = {
  _id: string;
  title: string;
  imgUrl: string;
  description: string;
  price: string;
  quantity: number;
  type: string;
  createdAt: string;
  updatedAt: string;
};

type Order = {
  productId: Product;
  userId: string;
  createdAt: string;
  id: string;
};
