import { Product } from "../types/product";

const API_BASE = 'https://fakestoreapi.com';

export async function getProducts(limit?: number) {
    const url = limit
        ? `${API_BASE}/products?limit=${limit}`
        : `${API_BASE}/products?`;

    const response = await fetch(url, { cache: 'no-store'});

    if (!response.ok) {
        throw new Error(
            `Failed to fetch products: ${response.status} ${response.statusText}`
        );
    }
    return response.json();

}


export async function getProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE}/products/${id}`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(
            `Failed to fetch product: ${response.status} ${response.statusText}`
        );
    }
    return response.json()
}