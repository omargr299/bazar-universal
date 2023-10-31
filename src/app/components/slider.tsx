'use client'

import { useState } from "react"
import Image from "next/image"

export function Slider({ images, title }: { images: string[], title: string }) {
    if (!images) return null

    const [mainImg, setMainImg] = useState("")

    if (images.length > 0 && !mainImg) setMainImg(images[0])

    const changeMainImg = (image: string) => {
        setMainImg(image)
    }


    return (
        <section className="flex flex-col justify-center items-center gap-3">
            <figure className="col-span-2">
                <Image src={mainImg || ""} width={300} height={300} alt={title} className="aspect-square" />
            </figure>
            <div className="flex gap-2" >
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
            </div>
        </section>
    )
}