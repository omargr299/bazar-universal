import './styles.css'
import { Slider } from "@/app/components/slider"



export default async function Item({ params: { id } }: { params: { id: string } }) {
    console.log(id)
    const res = await fetch(`http://${process.env.HOST_API}/api/items/${id}`, { method: 'GET' })
    const product = (await res.json())["product"]

    return (
        <>
            {
                product ?
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
                    : <h1>Product not found</h1>
            }
        </>
    )
}