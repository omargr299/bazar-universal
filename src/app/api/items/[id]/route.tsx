import { getProduct } from "@/services/products"


export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
    const product = await getProduct(id)
    return Response.json(product)
}