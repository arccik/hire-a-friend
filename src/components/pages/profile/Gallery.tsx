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
      {imagesUrl.map((img, index) => (
        <div
          key={`${img} -- ${index}`}
          className="relative overflow-hidden rounded-xl"
        >
          <img
            // isZoomed
            className="transform cursor-pointer transition-transform hover:scale-110"
            width={240}
            height={200}
            alt="Gallery Images"
            src={img}
            onClick={() => openLightboxOnSlide(index + 1)}
          />
        </div>
      ))}
      <FsLightbox
        type={"image"}
        toggler={lightboxController.toggler}
        sources={imagesUrl}
        slide={lightboxController.slide}
      />
    </>
  );
}
