'use client'

import { useEffect, useState } from "react"
import Image from "next/image"

export function Slider({ images, title }: { images: string[], title: string }) {

    const [mainImg, setMainImg] = useState("")

    useEffect(() => {
        if (images.length === 0) return

        changeMainImg(images[0])
    }, [images])

    const changeMainImg = (image: string) => {
        setMainImg(image)
    }



    return (
        <section className="flex flex-col justify-center items-center gap-3">
            <figure className="col-span-2">
                <Image src={mainImg} width={300} height={300} alt={title} className="aspect-square" />

            </figure>

            {
                images.length > 1 &&
                <aside className="flex gap-2" >
                    {
                        images.map((image) => {
                            return (
                                <Image
                                    key={image}
                                    src={image}
                                    width={50}
                                    height={50}
                                    alt={title}
                                    onClick={() => changeMainImg(image)}
                                    className={"rounded-md aspect-square cursor-pointer hover:scale-110 " + (mainImg === image ? "main" : "")}
                                />
                            )
                        }
                        )
                    }
                </aside>
            }

        </section>
    )
}