import { ListProducts } from "@/app/components/listProducts"



// app/posts/page.ts
type Props = {
    searchParams: { [key: string]: string | undefined },
}


export default async function Items({ searchParams }: Props) {
    const search = searchParams?.["search"]
    const res = await fetch(`http://${process.env.HOST_API}/api/items?q=${search}`, { method: 'GET' })
    const products = await res.json()

    return (
        <main>
            {
                search
                    ?
                    <section>
                        <h2>Results of &apos;{search}&apos;</h2>
                        <ListProducts products={products} />
                    </section>
                    :
                    <p>No search</p>
            }
        </main>
    )
}