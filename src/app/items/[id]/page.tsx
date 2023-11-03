import './styles.css'
import Head from 'next/head'
import { Slider } from "@/app/components/slider"
import { Product } from '@/types'



export default async function Item({ params: { id } }: { params: { id: string } }) {

    const res = await fetch(`https://${process.env.HOST_API}/api/items/${id}`, { method: 'GET' })

    const product: Product | undefined = (await res.json())

    return (
        <>
            {
                product?.id ?
                    <main className="[&>*]:my-3">
                        <Head>
                            <meta property="og:type" content="article" />
                            <meta property="og:title" content={product.title} />
                            <meta property="og:description" content={product.description} />
                            <meta property="og:image" content={product.thumbnail} />
                        </Head>
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