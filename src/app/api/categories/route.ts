import { getCategories } from "@/services/products"

export async function GET(request: Request) {

    const categories = await getCategories()
    const setCategories = new Set(categories)

    return Response.json(Array.from(setCategories))
}