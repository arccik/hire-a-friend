import { useState } from "react";
import FsLightbox from "fslightbox-react";
import { Image } from "@nextui-org/react";

export default function Gallery({
  imagesUrl,
}: {
  imagesUrl: string[] | null | undefined;
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
      <div className="flex gap-2">
        {imagesUrl.map((img, index) => (
          <Image
            isZoomed
            key={`${img} -- ${index}`}
            width={240}
            alt="NextUI Fruit Image with Zoom"
            src={img}
            onClick={() => openLightboxOnSlide(index + 1)}
          />
        ))}
      </div>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={imagesUrl}
        slide={lightboxController.slide}
      />
    </>
  );
}
