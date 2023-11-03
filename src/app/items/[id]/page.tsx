import './styles.css'

import { Slider } from "@/app/components/slider"
import { Product } from '@/types'
import type { Metadata, ResolvingMetadata } from 'next'


export async function generateMetadata(
    { params: { id } }: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {

    const res = await fetch(`${process.env.HOST_API}/api/items/${id}`, { method: 'GET' })

    const product: Product | undefined = (await res.json())

    const previousimages = (await parent).openGraph?.images || []

    return {
        title: "Bazar Universal | " + (product?.title || 'Product not found'),
        metadataBase: new URL(`${process.env.HOST_API}/items/${id}`),
        description: `product page for ${product?.title}`,
        openGraph: {
            type: 'website',
            url: `${process.env.HOST_API}/items/${id}`,
            title: "Bazar Universal | " + product?.title || 'Product not found',
            description: product?.description || '',
            images: [...previousimages, ...product?.images?.map(image => image) || []]
        },
        twitter: {

            card: 'summary_large_image',
            title: "Bazar Universal | " + product?.title || 'Product not found',
            description: product?.description || '',
            images: [...previousimages, ...product?.images?.map(image => image) || []]
        },
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