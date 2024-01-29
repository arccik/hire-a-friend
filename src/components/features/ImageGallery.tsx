import React, { useState } from "react";
import FsLightbox from "fslightbox-react";
import { Badge } from "@nextui-org/react";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";

export default function ImageGallery({
  imagesUrl,
  handleDeleteImage,
}: {
  imagesUrl: string[] | null;
  handleDeleteImage?: (url: string) => void;
}) {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  if (!imagesUrl) return null;

  function openLightboxOnSlide(slideNumber: number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: slideNumber,
    });
  }

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {imagesUrl.map((img, index) => (
          <div className="overflow-hidden" key={`${img} --- ${index} --`}>
            <Badge
              isInvisible={!handleDeleteImage}
              content={<MdDeleteForever size={20} />}
              size="lg"
              variant="faded"
              className="cursor-pointer hover:border-red-200 hover:bg-red-400 hover:text-white"
              onClick={() => handleDeleteImage && handleDeleteImage(img)}
            >
              {/* <Image
                isZoomed
                width={240}
                height="auto"
                alt={`gallery image ${index}`}
                src={img}
                onClick={() => openLightboxOnSlide(index + 1)}
              /> */}
              <Image
                src={img}
                height={240}
                width={380}
                alt={`gallery image ${index}`}
                onClick={() => openLightboxOnSlide(index + 1)}
                className="h-auto max-w-96 rounded-xl border-4 border-slate-50 object-fill filter transition-all duration-300 hover:brightness-150"
              />
            </Badge>
          </div>
        ))}
      </div>

      <FsLightbox
        toggler={lightboxController.toggler}
        sources={imagesUrl}
        slide={lightboxController.slide}
        type={"image"}
      />
    </>
  );
}
