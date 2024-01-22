import compressImage from "./compressImage";

export default async function uploadFileToAWS({
  file,
  url,
}: {
  file: File;
  url: string;
}): Promise<string | void> {
  try {
    const compressedImage = await compressImage(file);

    if (!("Blob" in window && compressedImage instanceof Blob)) {
      throw new Error("Faild to compress image");
    }
    // const formData = new FormData();
    // formData.append("file", compressedImage);
    // Object.entries({ file: compressedImage }).forEach(
    //   ([key, value]) => {
    //     formData.append(key, value);
    //   },
    // );
    // const upload = await fetch(url, {
    //   method: "POST",
    //   body: formData,
    // });

    const uploadedFile = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: compressedImage,
    });
    if (uploadedFile.ok) {
      return url.split("?")[0]; // return like to uploaded file
    }
  } catch (error) {
    console.error("Was not able to upload file", error);
    return;
  }
}
