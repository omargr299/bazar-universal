import './styles.css'

import { Slider } from "@/app/components/slider"

import { Product } from '@/types/products'
import type { Metadata, ResolvingMetadata } from 'next'

export async function getStaticPaths(parent: ResolvingMetadata, { params: { id }, }: { params: { id: string } }): Promise<Metadata> {
    const res = await fetch(`${process.env.HOST_API}/api/items/${id}`, { method: 'GET' })
    const product: Product = await res.json()


    return {
        title: `Bazar Universal | ${product?.title || "Product"}`,
        description: `Product page for ${product?.title}`,

        openGraph: {
            url: `${process.env.HOST_API}/items/${id}`,
            type: "website",
            title: `Bazar Universal | ${product?.title}`,
            description: `Product ${product?.title}`,
            images: [
                {
                    url: product?.images[0] || "",
                    width: 800,
                    height: 600,
                    alt: product?.title || "",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `Bazar Universal | ${product?.title}`,
            description: `Product ${product?.title}`,
            images: [
                {
                    url: product?.images[0] || "",
                    width: 800,
                    height: 600,
                    alt: product?.title || "",
                }
            ],

        }
    }
}

export default async function ItemPage({ params: { id } }: { params: { id: string } }) {

    const res = await fetch(`${process.env.HOST_API}/api/items/${id}`, { method: 'GET' })

    const product: Product | undefined = (await res.json())


    return (
        <>
            {
                product?.id ?
                    <main className="[&>*]:my-3">

                        <Slider images={product.images} title={product.title} />

                        <h2>{product.title}</h2>
                        <h3>{product.brand}</h3>
                        <p>{product.description}</p>
                        <span>Category: {product.category}</span>
                        <span>${product.price}</span>
                        <aside>
                            <div>
                                <i>Rating:</i> {product.rating} <span>{'⭐'.repeat(product.rating)}</span> <span className='opacity-30'>{'⭐'.repeat(5 - Math.floor(product.rating))}</span>
                            </div>
                            <span><i>Avaible:</i> {product.stock} units</span>
                        </aside>
                        <button className="px-5 py-2">Buy</button>
                    </main>
                    : <h1 className='text-2xl font-bold'>Product not found</h1>
            }
        </>
    )
}