import { getProducts } from "@/services/products"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const params = url.searchParams
    const query = params.get('search') || ''
    console.log("API", query)
    const products = await getProducts(query)
    console.log(products.length)
    return Response.json(products)
}