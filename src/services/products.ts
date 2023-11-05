import productsList from '@/data/products.json'


export async function getProducts(category: string) {
    const regex = new RegExp(category, 'g')

    const filteredProducts = productsList["products"]
        .filter(product => {

            return product.category.match(regex)
        })

    return filteredProducts
}

export async function getProduct(id: string) {

    const product = productsList["products"]
        .find(product => product.id === Number(id))

    return product
}

export async function getCategories() {
    const categories = productsList["products"].map(product => product.category)

    return categories
}
