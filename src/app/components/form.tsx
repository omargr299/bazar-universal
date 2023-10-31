'use client'

import { useSearchParams } from "next/navigation"
import { useState } from "react"

export function SearchForm({ main = true }: { main?: Boolean }) {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const search = form.search.value
        if (!search) return
        window.location.href = `/items?search=${search}`
    }


    const searchParams = useSearchParams()
    const [search, setSearch] = useState(searchParams.get("search") || "")

    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-3 items-center ">
            <input
                type="text"
                name="search"
                id="search"
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
    )
}