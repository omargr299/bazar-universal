import { getProducts } from "@/services/products"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const params = url.searchParams
    const query = params.get('search') || ''
    const products = await getProducts(query)
    return Response.json(products)
}