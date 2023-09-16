import ProductsList from "@/components/ProductsList";
import UserStatus from "@/components/UserStatus";

export const revalidate = 0;

export default function Home() {
  return (
    <main className="py-28 px-12">
      <UserStatus />
      <ProductsList />
    </main>
  );
}
