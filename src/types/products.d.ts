type Extension = "jpg" | "png"

type ImageURL = `https://i.dummyjson.com/data/products/${number}/${number}.${Extension}` | `https://i.dummyjson.com/data/products/${number}/thumbnail.${Extension}`

export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: ImageURL;
    images: ImageURL[];
}