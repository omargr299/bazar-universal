'use client'

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useState,useEffect } from "react"


export function SearchForm({ main = true }: { main?: Boolean }) {
    const [categories, setCategories] = useState([]) 
    

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const search = form.search.value
        if (!search) return
        window.location.href = `/items?search=${search}`
    }

    useEffect(() => {
        const getCategories = async () => {
            const url = window.location.origin + '/api/categories'
            const res = await fetch(url, { method: 'GET' })
            const categories = await res.json()
            setCategories(categories)
        }

        getCategories()
    }, [])

    const searchParams = useSearchParams()
    const [search, setSearch] = useState(searchParams.get("search") || "")

    return (
        <>

            <form onSubmit={onSubmit} className="w-full flex flex-col gap-3 items-center ">
                <datalist id="searches">
                    {categories.map((category,index: any) => (
                        <option key={index}>{category} </option>
                    ))}
                </datalist>
                <input
                    type="text"
                    name="search"
                    id="search"
                    list="searches"
                    required
                    placeholder="Laptops, smartphones, etc"
                    className="w-full max-w-[600px] min-w-[200px]"
                    value={search || ""}
                    onChange={e => setSearch(e.target.value)} />
                {
                    main &&
                    <button role="submit" className="py-2 m-auto w-full max-w-[300px] min-w-[80px]" >Search</button>
                }
            </form>
        </>
    )
}