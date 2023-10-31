import { SearchForm } from "@/app/components/form";
import Link from "next/link";

interface ItemsLayoutProps {
    children: React.ReactNode;
}

export default function ItemsLayout({
    children,
}: ItemsLayoutProps) {


    return (
        <>
            <header className="flex gap-5 py-5">
                <Link href="/">Bazar Universal</Link>
                <SearchForm main={false} />
            </header>
            <main>{children}</main>
        </>
    )
}