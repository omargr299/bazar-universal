import './styles.css'

import { Slider } from "@/app/components/slider"
import { Product } from '@/types'
import type { Metadata, ResolvingMetadata } from 'next'


export async function generateMetadata(
    { params: { id } }: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {

    const res = await fetch(`http://${process.env.HOST_API}/api/items/${id}`, { method: 'GET' })

    const product: Product | undefined = (await res.json())

    return {
        title: "Bazar Universal | " + product?.title || 'Product not found',
        openGraph: {
            type: 'website',
            url: `http://${process.env.HOST}/items/${id}`,
            title: "Bazar Universal | " + product?.title || 'Product not found',
            description: product?.description || '',
            images: product?.images.map(image => ({
                url: image,
                width: 800,
                height: 600,
                alt: product?.title || 'Product not found'
            }))
        },
        twitter: {

            card: 'summary_large_image',
            title: "Bazar Universal | " + product?.title || 'Product not found',
            description: product?.description || '',
            images: product?.images.map(image => ({
                url: image,
                width: 800,
                height: 600,
                alt: product?.title || 'Product not found'
            }))
        },
    }
}

export default async function Item({ params: { id } }: { params: { id: string } }) {

    const res = await fetch(`http://${process.env.HOST_API}/api/items/${id}`, { method: 'GET' })

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