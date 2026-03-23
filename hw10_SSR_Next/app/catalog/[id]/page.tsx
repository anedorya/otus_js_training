import { getProductById } from "@/src/lib/api";
import Link from "next/link";
import Image from "next/image";

interface ProductPageProps {
    params: Promise<{ id: string; }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProductById(Number(id));

    return (
        <div>
            <nav className="flex gap-2 mb-3">
                <Link className="text-sky-800" href="/">Главная</Link> /
                <Link className="text-sky-800" href="/catalog">Каталог</Link> / 
                <Link className="text-sky-800" href={`/catalog/${id}`}>{product.title}</Link>
            </nav>
            <h1 className="text-3xl font-bold mb-3">{ product.title }</h1>
            <div>
                <Image src={product.image} alt={product.title} width={400} height={400}/>
                <div>
                    <p>{product.description}</p>
                    <p>Цена: {product.price}</p>
                </div>

            </div>
        </div>
    )
} 
