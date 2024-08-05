import React, { useState } from "react"
import { ImageOff } from "lucide-react"

const PosterImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imgError, setImgError] = useState(false)

  if (imgError)
    return (
      <div className="flex aspect-[22/30] min-w-32 items-center justify-center">
        <ImageOff size={32} color="gray" />
      </div>
    )

  return <img src={src} alt={alt} className="aspect-[22/30] min-w-32" onError={() => setImgError(true)} />
}

export default PosterImage
