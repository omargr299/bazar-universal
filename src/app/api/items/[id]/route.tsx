import { getProduct } from "@/services/products"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
    console.log(id)

    const product = await getProduct(id)

    return Response.json(product || {})
}