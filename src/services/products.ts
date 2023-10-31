import productsList from '@/data/products.json'


export async function getProducts(category: string) {
    const regex = new RegExp(category, 'g')

    productsList["products"]
        .forEach(product => console.log(product.category))

    const filteredProducts = productsList["products"]
        .filter(product => regex.test(product.category))

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
