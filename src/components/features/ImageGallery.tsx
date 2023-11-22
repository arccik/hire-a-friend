import React, { Fragment, useState } from "react";
import FsLightbox from "fslightbox-react";
import { Badge, Image } from "@nextui-org/react";
import { RiDeleteBin2Fill } from "react-icons/ri";

export default function ImageGallery({
  imagesUrl,
  handleDeleteImage,
}: {
  imagesUrl: string[] | null;
  handleDeleteImage: (url: string) => void;
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
          <Fragment key={`${img} --- ${index} --`}>
            <Badge
              content={<RiDeleteBin2Fill size="1rem" />}
              color="danger"
              className="cursor-pointe m-2 cursor-pointer hover:text-red-100"
              onClick={() => handleDeleteImage(img)}
            >
              <Image
                isZoomed
                width={240}
                alt={`gallery image ${index}`}
                src={img}
                onClick={() => openLightboxOnSlide(index + 1)}
              />
            </Badge>
          </Fragment>
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
