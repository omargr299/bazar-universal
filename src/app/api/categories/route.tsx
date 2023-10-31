import { getCategories } from "@/services/products"

export async function GET(request: Request) {

    const categories = await getCategories()
    const setCategories = new Set(categories)
    console.log(setCategories)

    return Response.json({ categories: Array.from(setCategories) })
}