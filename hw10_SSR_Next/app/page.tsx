import ProductCard from "@/src/components/ProductCard";
import { getProducts } from "@/src/lib/api";

import Image from "next/image";
import Link from "next/link";
import { Product } from  "@/src/types/product";


export default async function Home() {

  const products = await getProducts(6);

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-3">Главная страница</h1>
      <div className="flex justify-end">
        <Link className="text-sky-600 mt-2 mb-2 block" href="/catalog">Смотреть все </Link>
        </div>
      <div className="flex gap-5 flex-wrap justify-center">
        {
        products.map((product: Product) => (
          <ProductCard product={product} key={product.id}/>
        ))}

      </div>
    </div>

  );
}
