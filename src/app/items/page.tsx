import { ListProducts } from "@/app/components/listProducts"

import type { Metadata } from 'next'

// app/posts/page.ts
type Props = {
    searchParams: { [key: string]: string | undefined },
}


export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {

    const search = searchParams?.["search"]
    const baseurl = process.env.HOST_API

    return {
        title: `Bazar Universal | ${search || "Search"}`,
        description: `Product page for ${search || "Search"}`,
        metadataBase: new URL(`${baseurl}/items?q=${searchParams?.["search"]}`),
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