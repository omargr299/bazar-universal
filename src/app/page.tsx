import { SearchForm } from "@/app/components/form"


export default function Home() {


  return (
    <main className="h-screen flex justify-center items-center">
      <section className="w-[50%] flex flex-col items-center gap-5">
        <h1 className="text-6xl">Bazar universal</h1>
        <SearchForm />
      </section>

    </main>
  )
}
