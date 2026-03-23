import Image from "next/image"
import { Product } from "../types/product"
import Link from "next/link";

interface ProductCardProps {
    product: Product;

}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="card w-72 bg-base-100 shadow-xl p-4 rounded-2xl">
            <Link href={`/catalog/${product.id}`}>
                <figure>
                    <Image src={product.image} alt={product.title} width={200} height={200}/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-bold mt-2 mb-2">{product.title}</h2>
                    <p>{product.description}</p>
                </div>
            </Link>

        </div>
    
    )
 }