import { ListProducts } from "@/app/components/listProducts"



// app/posts/page.ts
type Props = {
    searchParams: { [key: string]: string | undefined },
}

import type { Metadata, ResolvingMetadata } from 'next'


export async function generateMetadata(
    { searchParams }: { searchParams: { [key: string]: string | undefined } },
    parent: ResolvingMetadata
): Promise<Metadata> {

    const search = searchParams?.["search"]



    return {
        title: "Bazar Universal | " + (search || 'Search'),
        metadataBase: new URL(`${process.env.HOST_API}/items?q=${search}`),
        description: `Search products for ${search}`,
    }
}

export default async function ItemsPage({ searchParams }: Props) {
    const search = searchParams?.["search"]
    const res = await fetch(`${process.env.HOST_API}/api/items?q=${search}`, { method: 'GET' })
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