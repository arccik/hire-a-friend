import compressImage from "./compressImage";

export default async function uploadFileToAWS({
  fields,
  file,
  url,
}: {
  fields: Record<string, string>;
  file: File;
  url: string;
}): Promise<string | void> {
  try {
    const compressedImage = await compressImage(file);

    if (!("Blob" in window && compressedImage instanceof Blob)) {
      throw new Error("Faild to compress image");
    }
    const formData = new FormData();
    Object.entries({ ...fields, file: compressedImage }).forEach(
      ([key, value]) => {
        formData.append(key, value);
      },
    );
    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (upload.ok && fields.key) {
      return url + fields.key; // return like to uploaded file
    }
  } catch (error) {
    console.error("Was not able to upload file", error);
    return;
  }
}
