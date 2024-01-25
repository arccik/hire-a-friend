import React, { Fragment, useState } from "react";
import FsLightbox from "fslightbox-react";
import { Badge, Image } from "@nextui-org/react";
import { MdDeleteForever } from "react-icons/md";

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
      <div className="flex flex-row flex-wrap justify-center gap-2 ">
        {imagesUrl.map((img, index) => (
          <Fragment key={`${img} --- ${index} --`}>
            <Badge
              isInvisible={!handleDeleteImage}
              content={<MdDeleteForever size={20} />}
              size="lg"
              variant="faded"
              className=" cursor-pointer hover:border-red-200 hover:bg-red-400 hover:text-white"
              onClick={() => handleDeleteImage && handleDeleteImage(img)}
            >
              <Image
                isZoomed
                width={240}
                height="auto"
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
        type={"image"}
      />
    </>
  );
}
