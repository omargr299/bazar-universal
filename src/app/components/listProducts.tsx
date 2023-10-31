'use client'
import { type Product } from '@/types'
import Image from 'next/image'


export function ProductItem({ product }: { product: Product }) {
    const onClick = () => {
        window.location.href = `/items/${product.id}`
    }


    return (
        <li key={product.id} onClick={onClick} className='cursor-pointer border-y-2 p-4 md:border-x-2  box-content'>
            <article className='h-full grid grid-cols-2 md:grid-cols-1  '>
                <figcaption className='mx-3'>
                    <Image
                        src={product.thumbnail}
                        width={150}
                        height={150}
                        alt={product.title}
                        className='m-auto rounded-full aspect-square '
                    />
                </figcaption>
                <main className='w-full flex flex-col justify-around gap-2'>
                    <h3><strong>{product.title}</strong></h3>
                    <p className='overflow-hidden  whitespace-nowrap  overflow-ellipsis'>{product.description}</p>
                    <aside className='flex flex-col gap-1 my-1'>
                        <span><i>Price:</i> ${product.price}</span>
                        <span><i>Category:</i> {product.category}</span>
                        <div>

                            <i>Rating:</i> {product.rating} <span>{'⭐'.repeat(product.rating)}</span> <span className='opacity-30'>{'⭐'.repeat(5 - Math.floor(product.rating))}</span>
                        </div>
                    </aside>
                    <button className='px-4 py-2 md:justify-self-center'>Buy</button>
                </main>
            </article>
        </li>
    )
}

export function ListProducts({ products }: { products: Product[] }) {

    if (!products || products.length === 0) {
        return (
            <h2>No products</h2>
        )
    }

    return (
        <ul className='grid grid-cols-1 md:grid-cols-3'>
            {
                products.map((product) => (
                    <ProductItem product={product} />
                ))
            }
        </ul>
    )
}